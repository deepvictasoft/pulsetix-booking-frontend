const CONFIRMED_STATUSES = new Set([
  "confirmed",
  "approved",
  "completed",
  "paid",
]);

export function isOrderCancelled(order) {
  if (!order) return false;
  if (order.cancelledAt) return true;

  const status = String(order.status ?? "").toLowerCase();
  return status.includes("cancel");
}

export function isOrderConfirmed(order) {
  if (!order) return false;
  if (order.confirmedAt) return true;

  const status = String(order.status ?? "").toLowerCase();
  return CONFIRMED_STATUSES.has(status);
}

export function isOrderPending(order) {
  return Boolean(order) && !isOrderCancelled(order) && !isOrderConfirmed(order);
}

export function getOrderBadge(order) {
  if (isOrderCancelled(order)) return "CANCELLED";
  if (isOrderConfirmed(order)) return "CONFIRMED";
  return "PENDING";
}
