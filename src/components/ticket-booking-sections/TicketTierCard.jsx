"use client";

import Typography from "@/components/ui/Typography";
import QuantityStepper from "@/components/ui/QuantityStepper";
import {
  getTierBadge,
  getTierDescription,
  getTierFeatures,
} from "@/lib/tickets/bookingHelpers";

const TicketTierCard = ({ tier, quantity, onQuantityChange, maxQuantity }) => {
  const badge = getTierBadge(tier);
  const description = getTierDescription(tier);
  const features = getTierFeatures(tier);
  const remaining = tier.remaining ?? tier.capacity;
  const isSoldOut = remaining === 0 || tier.ticket_status === "sold_out";

  return (
    <article className="rounded-2xl border border-primary-border bg-sidebar-bg p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Typography variant="title">{tier.label}</Typography>
          {badge && (
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
              {badge}
            </span>
          )}
        </div>
        <Typography variant="title" className="text-primary whitespace-nowrap">
          {tier.price}
        </Typography>
      </div>

      <Typography variant="body2">{description}</Typography>

      <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
        {features.map((feature) => (
          <li key={feature} className="text-sm text-muted-text list-disc ml-4">
            {feature}
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between gap-4 pt-4 border-t border-secondary-border">
        <Typography variant="body2" className="!text-[11px] uppercase tracking-wider">
          {isSoldOut ? "Sold out" : `${remaining ?? "—"} left`}
        </Typography>

        {isSoldOut ? (
          <span className="text-sm text-muted-text">Unavailable</span>
        ) : (
          <QuantityStepper
            value={quantity}
            onChange={onQuantityChange}
            min={0}
            max={maxQuantity}
          />
        )}
      </div>
    </article>
  );
};

export default TicketTierCard;
