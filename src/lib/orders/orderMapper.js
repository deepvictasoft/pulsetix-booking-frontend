import { formatCurrency } from "@/lib/tickets/bookingHelpers";

function mapOrderItemFromApi(item) {
  return {
    id: item.id,
    ticketTierId: item.ticket_tier_id,
    label: item.tier_name,
    quantity: Number(item.quantity) || 0,
    unitPrice: Number(item.unit_price) || 0,
    lineTotal: Number(item.line_total) || 0,
  };
}

function mapOrderTicketFromApi(ticket) {
  return {
    id: ticket.id,
    ticketCode: ticket.ticket_code,
    status: ticket.status,
    ticketTierId: ticket.ticket_tier_id,
    qrCode: ticket.qr_code ?? null,
    qrPayload: ticket.qr_payload ?? null,
  };
}

export function getTicketTierLabel(order, ticket) {
  const item = order.items?.find((row) => row.ticketTierId === ticket.ticketTierId);
  return item?.label ?? "General Admission";
}

export function mapOrderFromApi(data) {
  const order = data?.order ?? data;
  const items = data?.items ?? order?.items ?? [];
  const tickets = data?.tickets ?? order?.tickets ?? [];

  return {
    id: order.id,
    orderNumber: order.order_number,
    status: order.status,
    subtotal: Number(order.subtotal) || 0,
    total: Number(order.total) || 0,
    currency: order.currency ?? "USD",
    eventId: order.event_id,
    buyerId: order.buyer_id,
    organizationId: order.organization_id,
    cancelledAt: order.cancelled_at,
    confirmedAt: order.confirmed_at,
    createdAt: order.created_at,
    updatedAt: order.updated_at,
    items: items.map(mapOrderItemFromApi),
    tickets: tickets.map(mapOrderTicketFromApi),
    totalLabel: formatCurrency(Number(order.total) || 0),
  };
}
