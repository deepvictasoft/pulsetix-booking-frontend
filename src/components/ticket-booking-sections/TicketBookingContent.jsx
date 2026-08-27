"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Typography from "@/components/ui/Typography";
import OrderSummary from "@/components/ui/OrderSummary";
import TicketTierCard from "@/components/ticket-booking-sections/TicketTierCard";
import { getBuyerAccessToken } from "@/lib/buyer/authStorage";
import {
  buildOrderPayload,
  calculateOrderTotals,
  getTierMaxQuantity,
} from "@/lib/tickets/bookingHelpers";

const TicketBookingContent = ({ event }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { ticketTiers = [] } = event;
  const [quantities, setQuantities] = useState({});
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);

  const lineItems = useMemo(
    () =>
      ticketTiers
        .filter((tier) => quantities[tier.id] > 0)
        .map((tier) => ({
          id: tier.id,
          label: tier.label,
          priceAmount: tier.priceAmount,
          quantity: quantities[tier.id],
        })),
    [ticketTiers, quantities],
  );

  const { subtotal, bookingFee, total, ticketCount } = useMemo(
    () => calculateOrderTotals(lineItems),
    [lineItems],
  );

  const handleQuantityChange = (tierId, nextQty) => {
    const tier = ticketTiers.find((item) => item.id === tierId);
    const tierMax = getTierMaxQuantity(tier);
    const cappedQty = Math.min(nextQty, tierMax);

    setQuantities((prev) => ({
      ...prev,
      [tierId]: Math.max(0, cappedQty),
    }));
  };

  const maxTicketsPerTier = useMemo(
    () =>
      Math.max(
        ...ticketTiers.map((tier) => Number(tier.maxQuantityPerOrder) || 0),
        0,
      ),
    [ticketTiers],
  );

  const handleCheckout = async () => {
    const accessToken = getBuyerAccessToken();

    if (!accessToken) {
      setCheckoutError("login");
      return;
    }

    setCheckoutLoading(true);
    setCheckoutError(null);

    try {
      const payload = buildOrderPayload(event.eventId, lineItems);
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (!res.ok || !json.status) {
        throw new Error(json.message ?? "Could not create order");
      }

      router.push(`/orders/${json.data.id}`);
    } catch (error) {
      setCheckoutError(error.message ?? "Could not create order");
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (!ticketTiers.length) {
    return (
      <section className="mx-auto px-6 lg:px-10 xl:px-14 2xl:px-20 py-10">
        <div className="rounded-2xl border border-dashed border-secondary-border py-16 text-center">
          <Typography variant="body2">
            No ticket tiers are available for this event right now.
          </Typography>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto px-6 lg:px-10 xl:px-14 2xl:px-20 py-10">
      <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
        <div className="flex flex-col gap-5">
          {ticketTiers.map((tier) => (
            <TicketTierCard
              key={tier.id}
              tier={tier}
              quantity={quantities[tier.id] || 0}
              onQuantityChange={(qty) => handleQuantityChange(tier.id, qty)}
              maxQuantity={getTierMaxQuantity(tier)}
            />
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <OrderSummary
            lineItems={lineItems}
            subtotal={subtotal}
            bookingFee={bookingFee}
            total={total}
            ticketCount={ticketCount}
            maxTickets={maxTicketsPerTier}
            maxTicketsLabel="tier"
            onCheckout={handleCheckout}
            checkoutDisabled={checkoutLoading}
          />

          {checkoutError === "login" ? (
            <Typography variant="body2" className="!text-sm text-red-500 text-center">
              Please{" "}
              <Link
                href={`/login?redirect=${encodeURIComponent(pathname)}`}
                className="text-primary font-medium hover:underline"
              >
                log in
              </Link>{" "}
              to complete your booking.
            </Typography>
          ) : checkoutError ? (
            <Typography variant="body2" className="!text-sm text-red-500 text-center">
              {checkoutError}
            </Typography>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default TicketBookingContent;
