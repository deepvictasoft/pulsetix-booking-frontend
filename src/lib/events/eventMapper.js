import { getMediaServeURL } from "@/api/media/api";

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const isUuid = (value) => UUID_RE.test(String(value ?? ""));

function formatEventDate(date) {
  return `${DAY_NAMES[date.getDay()]} ${date.getDate()} ${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
}

function formatEventTime(date) {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const suffix = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

function toPrice(value) {
  if (value == null || value === "") return null;
  const amount = Number(value);
  if (Number.isNaN(amount)) return null;
  if (amount === 0) return "Free";
  return `€${amount.toFixed(2)}`;
}

function normalizeListResponse(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.rows)) return data.rows;
  return [];
}

export const flattenEventResponse = (data) => {
  if (!data) return {};
  if (!data.steps) return data;

  const { status, steps } = data;
  const eventStep = steps.event ?? {};
  const venueStep = steps.venue ?? {};
  const recurrenceStep = steps.recurrence ?? {};
  const tiersStep = steps.ticket_tiers ?? {};

  return {
    id: eventStep.id,
    ...eventStep,
    status: status ?? eventStep.status,
    venue: venueStep,
    recurrence: recurrenceStep,
    ticket_tiers: tiersStep.ticket_tiers ?? [],
    steps,
  };
};

export const extractTicketTiersFromResponse = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (data.steps?.ticket_tiers?.ticket_tiers) {
    return data.steps.ticket_tiers.ticket_tiers;
  }
  if (Array.isArray(data.ticket_tiers)) return data.ticket_tiers;
  return [];
};

export function formatScheduleFromApi(startAt, endAt) {
  const start = startAt ? new Date(startAt) : null;
  const end = endAt ? new Date(endAt) : null;
  const validStart = start && !Number.isNaN(start.getTime());
  const validEnd = end && !Number.isNaN(end.getTime());

  if (!validStart) {
    return {
      startDate: null,
      endDate: null,
      startLabel: "Date TBA",
      endLabel: "Date TBA",
      startTime: "",
      endTime: "",
    };
  }

  return {
    startDate: start,
    endDate: validEnd ? end : null,
    startLabel: `${formatEventDate(start)} at ${formatEventTime(start)}`,
    endLabel: validEnd
      ? `${formatEventDate(end)} at ${formatEventTime(end)}`
      : `${formatEventDate(start)} at ${formatEventTime(start)}`,
    startTime: formatEventTime(start),
    endTime: validEnd ? formatEventTime(end) : formatEventTime(start),
  };
}

export function formatListDateFromApi(startAt) {
  if (!startAt) return "Date TBA";
  const start = new Date(startAt);
  if (Number.isNaN(start.getTime())) return "Date TBA";
  return `${formatEventDate(start)} · ${formatEventTime(start)}`;
}

export function formatVenueLabel(venue = {}) {
  if (venue.event_type === "online" && venue.online_link) {
    return "Online Event";
  }

  const parts = [venue.venue_name, venue.city, venue.country].filter(Boolean);
  return parts.length ? parts.join(", ") : "Location TBA";
}

export function formatVenueAddress(venue = {}) {
  const parts = [
    venue.venue_name,
    venue.address,
    venue.city,
    venue.state,
    venue.pincode,
    venue.country,
  ].filter(Boolean);

  return parts.join(", ");
}

function getMinTierPrice(ticketTiers = []) {
  const prices = ticketTiers
    .filter((tier) => tier.ticket_status !== "paused")
    .map((tier) => Number(tier.price))
    .filter((price) => !Number.isNaN(price));

  return prices.length ? Math.min(...prices) : null;
}

function mapTicketTiersForUi(ticketTiers = []) {
  return ticketTiers
    .filter((tier) => tier.ticket_status !== "paused")
    .map((tier) => ({
      id: tier.id,
      label: tier.name,
      price: toPrice(tier.price) ?? "€0.00",
      priceAmount: Number(tier.price) || 0,
      type: tier.type,
      capacity: tier.capacity,
      remaining: tier.remaining ?? tier.available ?? tier.capacity,
      maxQuantityPerOrder: Number(tier.max_quantity_per_order) || null,
      ticket_status: tier.ticket_status,
      description: tier.description || "",
      features: tier.features || tier.inclusions || [],
      badge: tier.badge || null,
    }));
}

function buildGallery(event, coverUrl) {
  const gallery = [];

  if (event.promo_video_url) {
    gallery.push(event.promo_video_url);
  }

  if (coverUrl) {
    gallery.push(coverUrl);
  }

  (event.gallery_image_url ?? []).forEach((path) => {
    const url = getMediaServeURL(path);
    if (url && !gallery.includes(url)) {
      gallery.push(url);
    }
  });

  return gallery;
}

export function mapEventListItemFromApi(data, ticketTiers = []) {
  const event = flattenEventResponse(data);
  const venue = event.venue ?? {};
  const coverUrl = getMediaServeURL(event.cover_img_url);
  const minPrice = getMinTierPrice(ticketTiers);

  return {
    id: event.slug || event.id,
    eventId: event.id,
    image: coverUrl,
    category: event.category || "Event",
    title: event.event_name || "Untitled Event",
    subtitle: venue.event_type === "online" ? "Online Event" : venue.venue_name || event.category || "",
    date: formatListDateFromApi(venue.start_at),
    venue: formatVenueLabel(venue),
    price: toPrice(minPrice),
    start_at: venue.start_at,
    is_public: event.is_public,
    status: event.status,
  };
}

export function mapHostFromOrganization(organization = null) {
  if (!organization) {
    return {
      name: "Organizer",
      website: "#",
      contact: "#",
    };
  }

  const logoPath = organization.logo_path ?? organization.logoPath;

  return {
    name: organization.organization_name || "Organizer",
    tagline: organization.bio || undefined,
    website: "#",
    contact: "#",
    logo: logoPath ? getMediaServeURL(logoPath) : null,
  };
}

export function mapEventDetailFromApi(data, ticketTiers = [], organization = null) {
  const event = flattenEventResponse(data);
  const venue = event.venue ?? {};
  const coverUrl = getMediaServeURL(event.cover_img_url);
  const venueLabel = formatVenueLabel(venue);
  const venueAddress = formatVenueAddress(venue);

  return {
    id: event.slug || event.id,
    eventId: event.id,
    title: event.event_name || "Untitled Event",
    subtitle: venue.event_type === "online" ? "Online Event" : venue.venue_name || "",
    category: event.category || "Event",
    about: event.description || "",
    image: coverUrl,
    venue: venueLabel,
    venueName: venue.venue_name || venueLabel,
    venueAddress,
    schedule: formatScheduleFromApi(venue.start_at, venue.end_at),
    gallery: buildGallery(event, coverUrl),
    host: mapHostFromOrganization(organization),
    ticketTiers: mapTicketTiersForUi(ticketTiers),
    date: formatListDateFromApi(venue.start_at),
    price: toPrice(getMinTierPrice(ticketTiers)),
    start_at: venue.start_at,
    status: event.status,
  };
}

export function normalizeEventsListResponse(response) {
  return normalizeListResponse(response?.data).map((row) =>
    mapEventListItemFromApi(row),
  );
}

export function resolveEventRouteId(event) {
  return event?.slug || event?.eventId || event?.id;
}

export { normalizeListResponse };
