"use client";

import Button from "@/components/ui/Button";
import Typography from "@/components/ui/Typography";
import { BOOKING_FEE_PERCENT, formatCurrency } from "@/lib/tickets/bookingHelpers";

const OrderSummary = ({
  lineItems = [],
  subtotal = 0,
  bookingFee = 0,
  total = 0,
  ticketCount = 0,
  maxTickets = 0,
  maxTicketsLabel = "order",
  onCheckout,
  checkoutDisabled = false,
}) => {
  const hasSelection = ticketCount > 0;

  return (
    <div className="lg:sticky lg:top-24">
      <div className="rounded-2xl border border-primary-border bg-sidebar-bg p-5 flex flex-col gap-4">
        <Typography variant="sectionTitle">Order summary</Typography>

        {!hasSelection ? (
          <Typography variant="body2">
            No tickets selected yet. Pick a tier to see your total.
          </Typography>
        ) : (
          <div className="flex flex-col gap-2">
            {lineItems.map((item) => (
              <div key={item.id} className="flex items-start justify-between gap-3">
                <Typography variant="body2" className="!text-sm">
                  {item.label} × {item.quantity}
                </Typography>
                <Typography variant="body2" className="!text-sm whitespace-nowrap">
                  {formatCurrency(item.priceAmount * item.quantity)}
                </Typography>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-2 pt-2 border-t border-secondary-border">
          <div className="flex items-center justify-between gap-3">
            <Typography variant="body2">Subtotal</Typography>
            <Typography variant="body2">{formatCurrency(subtotal)}</Typography>
          </div>
          <div className="flex items-center justify-between gap-3">
            <Typography variant="body2">
              Booking fee ({BOOKING_FEE_PERCENT}%)
            </Typography>
            <Typography variant="body2">{formatCurrency(bookingFee)}</Typography>
          </div>
          <div className="flex items-center justify-between gap-3 pt-2 border-t border-secondary-border">
            <Typography variant="body" className="!text-sm font-semibold">
              Total
            </Typography>
            <Typography variant="body" className="!text-sm font-semibold">
              {formatCurrency(total)}
            </Typography>
          </div>
        </div>

        <Button
          variant="primary"
          className="w-full uppercase tracking-wide"
          disabled={checkoutDisabled || !hasSelection}
          onClick={onCheckout}
        >
          Checkout
        </Button>

        <Typography variant="body2" className="!text-[11px] text-center">
          {maxTickets > 0
            ? `Max ${maxTickets} tickets per ${maxTicketsLabel} · 18+ with valid photo ID`
            : "18+ with valid photo ID"}
        </Typography>
      </div>
    </div>
  );
};

export default OrderSummary;
