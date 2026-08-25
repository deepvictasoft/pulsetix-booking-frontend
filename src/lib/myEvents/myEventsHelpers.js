import { formatListDateFromApi } from "@/lib/events/eventMapper";
import {
  getOrderBadge,
  isOrderCancelled,
  isOrderConfirmed,
} from "@/lib/orders/orderStatus";

const MONTH_ABBR = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=500&q=80";

function formatCardDate(startAt) {
  if (!startAt) {
    return { dateMonth: "TBA", dateDay: "--" };
  }

  const date = new Date(startAt);
  if (Number.isNaN(date.getTime())) {
    return { dateMonth: "TBA", dateDay: "--" };
  }

  return {
    dateMonth: MONTH_ABBR[date.getMonth()],
    dateDay: String(date.getDate()).padStart(2, "0"),
  };
}

function getTicketCount(order) {
  const fromTickets = order.tickets?.length ?? 0;
  if (fromTickets > 0) return fromTickets;

  return order.items?.reduce((sum, item) => sum + (item.quantity || 0), 0) ?? 0;
}

function getEventStartAt(event) {
  return event?.start_at ?? event?.schedule?.startDate ?? null;
}

function isFutureEvent(startAt) {
  if (!startAt) return true;

  const date = new Date(startAt);
  if (Number.isNaN(date.getTime())) return true;

  return date >= new Date();
}

export function mapBookingToCard(order, event) {
  const startAt = getEventStartAt(event);
  const { dateMonth, dateDay } = formatCardDate(startAt);
  const ticketCount = getTicketCount(order);
  const ticketLabel = ticketCount === 1 ? "1 ticket" : `${ticketCount} tickets`;

  return {
    id: order.id,
    orderId: order.id,
    image: event?.image || FALLBACK_IMAGE,
    badge: getOrderBadge(order),
    dateMonth,
    dateDay,
    title: event?.title || "Event",
    subtitle: `${ticketLabel} · ${order.orderNumber || "Order"}`,
    venue: event?.venue || "Location TBA",
    time: event?.date || formatListDateFromApi(startAt),
    href: `/orders/${order.id}`,
  };
}

export function buildMyEventsStats(bookings) {
  const upcoming = bookings.filter((item) => item.tab === "upcoming");
  const booked = bookings.filter(
    (item) => isOrderConfirmed(item.order) && !isOrderCancelled(item.order),
  );
  const past = bookings.filter((item) => item.tab === "past");
  const cancelled = bookings.filter((item) => item.tab === "cancelled");

  const nextUpcoming = upcoming
    .slice()
    .sort((a, b) => {
      const aTime = new Date(getEventStartAt(a.event) ?? 0).getTime();
      const bTime = new Date(getEventStartAt(b.event) ?? 0).getTime();
      return aTime - bTime;
    })[0];

  const nextLabel = nextUpcoming
    ? `Next: ${nextUpcoming.event?.title || "Event"}`
    : "No upcoming events";

  return [
    {
      key: "upcoming",
      icon: "Calendar",
      count: upcoming.length,
      label: "Upcoming",
      sub: nextLabel,
    },
    {
      key: "booked",
      icon: "Ticket",
      count: booked.length,
      label: "Booked",
      sub: "All confirmed bookings",
    },
    {
      key: "past",
      icon: "Clock",
      count: past.length,
      label: "Past Events",
      sub: "Events you've attended",
    },
    {
      key: "cancelled",
      icon: "XCircle",
      count: cancelled.length,
      label: "Cancelled",
      sub: "Bookings that were cancelled",
    },
  ];
}

export function categorizeBooking(order, event) {
  if (isOrderCancelled(order)) {
    return "cancelled";
  }

  const startAt = getEventStartAt(event);
  const future = isFutureEvent(startAt);

  if (isOrderConfirmed(order)) {
    return future ? "upcoming" : "past";
  }

  return future ? "upcoming" : "booked";
}

export function groupBookingsByTab(bookings) {
  return bookings.reduce(
    (groups, booking) => {
      const { tab, order } = booking;

      if (tab === "cancelled") {
        groups.cancelled.push(booking);
        return groups;
      }

      if (tab === "upcoming") {
        groups.upcoming.push(booking);
      }

      if (tab === "past") {
        groups.past.push(booking);
      }

      if (isOrderConfirmed(order) && !isOrderCancelled(order)) {
        groups.booked.push(booking);
      }

      return groups;
    },
    { upcoming: [], booked: [], past: [], cancelled: [] },
  );
}

export async function fetchEventById(eventId) {
  try {
    const res = await fetch(`/api/events/${eventId}`);
    const json = await res.json();
    return json.status ? json.data : null;
  } catch {
    return null;
  }
}

export async function enrichOrdersWithEvents(orders) {
  const uniqueEventIds = [...new Set(orders.map((order) => order.eventId).filter(Boolean))];
  const eventEntries = await Promise.all(
    uniqueEventIds.map(async (eventId) => [eventId, await fetchEventById(eventId)]),
  );
  const eventsById = Object.fromEntries(eventEntries);

  return orders.map((order) => {
    const event = eventsById[order.eventId] ?? null;
    const tab = categorizeBooking(order, event);

    return {
      order,
      event,
      tab,
      card: mapBookingToCard(order, event),
    };
  });
}
