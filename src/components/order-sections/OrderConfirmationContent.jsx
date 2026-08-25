"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Typography from "@/components/ui/Typography";
import Button from "@/components/ui/Button";
import DigitalTicketCard from "@/components/order-sections/DigitalTicketCard";
import { getBuyerAccessToken } from "@/lib/buyer/authStorage";
import { fetchEventById } from "@/lib/myEvents/myEventsHelpers";
import { formatCurrency } from "@/lib/tickets/bookingHelpers";
import { getTicketTierLabel } from "@/lib/orders/orderMapper";
import {
  getOrderBadge,
  isOrderCancelled,
  isOrderConfirmed,
  isOrderPending,
} from "@/lib/orders/orderStatus";

const OrderConfirmationContent = ({ orderId }) => {
  const [order, setOrder] = useState(null);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrder = async () => {
      const accessToken = getBuyerAccessToken();

      if (!accessToken) {
        setError("Please log in to view this order.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const json = await res.json();

        if (!res.ok || !json.status) {
          throw new Error(json.message ?? "Could not load order");
        }

        const orderData = json.data;
        setOrder(orderData);

        if (orderData.eventId) {
          const eventData = await fetchEventById(orderData.eventId);
          setEvent(eventData);
        }
      } catch (err) {
        setError(err.message ?? "Could not load order");
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [orderId]);

  if (loading) {
    return (
      <section className="mx-auto px-6 lg:px-10 xl:px-14 2xl:px-20 py-16">
        <Typography variant="body2">Loading order...</Typography>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto px-6 lg:px-10 xl:px-14 2xl:px-20 py-16">
        <div className="rounded-2xl border border-dashed border-secondary-border py-16 text-center flex flex-col gap-4 items-center">
          <Typography variant="body2">{error}</Typography>
          <Link href="/events">
            <Button variant="outline">Browse events</Button>
          </Link>
        </div>
      </section>
    );
  }

  const confirmed = isOrderConfirmed(order);
  const pending = isOrderPending(order);
  const cancelled = isOrderCancelled(order);
  const tickets = order.tickets ?? [];
  const hasTickets = tickets.length > 0;

  const heading = cancelled
    ? "Order cancelled"
    : confirmed
      ? "Your tickets"
      : "Order details";

  return (
    <section className="mx-auto px-6 lg:px-10 xl:px-14 2xl:px-20 py-10">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        <div className="rounded-2xl border border-primary-border bg-sidebar-bg p-6 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 flex-wrap">
              <Typography variant="sectionTitle">{heading}</Typography>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/15 text-primary">
                {getOrderBadge(order)}
              </span>
            </div>
            {event?.title && (
              <Typography variant="title" className="!text-lg">
                {event.title}
              </Typography>
            )}
            <Typography variant="body2">
              Order <span className="font-semibold">{order.orderNumber}</span>
              {event?.venue ? ` · ${event.venue}` : ""}
            </Typography>
          </div>

          {confirmed && hasTickets && (
            <div className="flex flex-col gap-3">
              <Typography variant="body" className="!text-sm font-semibold">
                Digital tickets
              </Typography>
              {tickets.map((ticket, index) => (
                <DigitalTicketCard
                  key={ticket.id}
                  ticket={ticket}
                  tierLabel={getTicketTierLabel(order, ticket)}
                  index={index}
                  total={tickets.length}
                />
              ))}
            </div>
          )}

          {pending && (
            <div className="rounded-xl border border-dashed border-secondary-border px-4 py-5 text-center">
              <Typography variant="body2">
                Your QR codes will appear here once the order is confirmed.
              </Typography>
            </div>
          )}

          <div className="flex flex-col gap-2">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-start justify-between gap-3">
                <Typography variant="body2" className="!text-sm">
                  {item.label} × {item.quantity}
                </Typography>
                <Typography variant="body2" className="!text-sm whitespace-nowrap">
                  {formatCurrency(item.lineTotal)}
                </Typography>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between gap-3 pt-2 border-t border-secondary-border">
            <Typography variant="body" className="!text-sm font-semibold">
              Total
            </Typography>
            <Typography variant="body" className="!text-sm font-semibold">
              {formatCurrency(order.total)}
            </Typography>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/my-events" className="flex-1">
              <Button variant="primary" className="w-full uppercase tracking-wide">
                My events
              </Button>
            </Link>
            <Link href="/events" className="flex-1">
              <Button variant="outline" className="w-full">
                Browse events
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderConfirmationContent;
