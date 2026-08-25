export const BOOKING_FEE_PERCENT = 6;

export function formatCurrency(amount) {
  const value = Number(amount) || 0;
  return `€${value.toFixed(2)}`;
}

export function parsePriceAmount(price) {
  return Number(String(price ?? "").replace(/[^0-9.]/g, "")) || 0;
}

export function getTierBadge(tier) {
  if (tier.badge) return tier.badge;

  const label = String(tier.label ?? "").toLowerCase();
  if (label.includes("general")) return "Most Popular";
  return null;
}

export function getTierDescription(tier) {
  if (tier.description) return tier.description;

  const label = String(tier.label ?? "").toLowerCase();

  if (label.includes("early")) {
    return "Limited release general admission at the lowest price.";
  }
  if (label.includes("vip")) {
    return "Elevated views, shorter queues and a private bar.";
  }
  if (label.includes("general")) {
    return "Standard festival access with full stage entry.";
  }

  return "Includes event entry for this ticket category.";
}

export function getTierFeatures(tier) {
  if (tier.features?.length) return tier.features;

  const label = String(tier.label ?? "").toLowerCase();

  if (label.includes("vip")) {
    return [
      "Priority fast-track entry",
      "Private bar & lounge",
      "Collectible laminate",
      "Elevated VIP viewing deck",
      "Dedicated restrooms",
    ];
  }

  if (label.includes("early") || label.includes("general")) {
    return [
      "General admission entry",
      "Re-entry until 23:00",
      "Access to all 3 stages",
      "Festival wristband",
    ];
  }

  return ["General admission entry", "Digital ticket delivery"];
}

export function getTierMaxQuantity(tier) {
  const perOrder = Number(tier?.maxQuantityPerOrder);
  const remaining = Number(tier?.remaining ?? tier?.capacity);

  const limits = [];
  if (perOrder > 0) limits.push(perOrder);
  if (remaining > 0) limits.push(remaining);

  return limits.length ? Math.min(...limits) : 0;
}

export function calculateOrderTotals(lineItems, feePercent = BOOKING_FEE_PERCENT) {
  const subtotal = lineItems.reduce(
    (sum, item) => sum + item.priceAmount * item.quantity,
    0,
  );
  const bookingFee = subtotal * (feePercent / 100);
  const total = subtotal + bookingFee;
  const ticketCount = lineItems.reduce((sum, item) => sum + item.quantity, 0);

  return { subtotal, bookingFee, total, ticketCount };
}

export function buildOrderPayload(eventId, lineItems) {
  return {
    event_id: eventId,
    items: lineItems.map((item) => ({
      ticket_tier_id: item.id,
      quantity: item.quantity,
    })),
  };
}
