import { listEventsAPI, getEventAPI } from "@/api/event/api";
import { getOrganizationMeAPI } from "@/api/organization/api";
import { listTicketTiersAPI } from "@/api/ticket/api";
import {
  extractTicketTiersFromResponse,
  flattenEventResponse,
  isUuid,
  mapEventDetailFromApi,
  mapEventListItemFromApi,
  normalizeListResponse,
} from "@/lib/events/eventMapper";

function isPublicEvent(value) {
  return value === true || value === "true" || value === 1 || value === "1" || value == null;
}

async function loadTicketTiers(eventId) {
  try {
    const res = await listTicketTiersAPI(eventId);
    return extractTicketTiersFromResponse(res?.data);
  } catch {
    return [];
  }
}

export async function fetchPublishedEvents() {
  const res = await listEventsAPI({ status: "published" });
  const rows = normalizeListResponse(res?.data);

  const events = await Promise.all(
    rows.map(async (row) => {
      const event = flattenEventResponse(row);
      const ticketTiers = await loadTicketTiers(event.id);
      return mapEventListItemFromApi(row, ticketTiers);
    }),
  );

  return events.filter((event) => isPublicEvent(event.is_public));
}

async function loadOrganization() {
  try {
    const res = await getOrganizationMeAPI();
    return res?.data?.organization ?? null;
  } catch {
    return null;
  }
}

export async function fetchEventDetail(idOrSlug) {
  let eventRow = null;

  if (isUuid(idOrSlug)) {
    const res = await getEventAPI(idOrSlug);
    eventRow = res?.data;
  } else {
    const listRes = await listEventsAPI({ status: "published" });
    const match = normalizeListResponse(listRes?.data)
      .map(flattenEventResponse)
      .find((event) => event.slug === idOrSlug);

    if (!match?.id) return null;

    const res = await getEventAPI(match.id);
    eventRow = res?.data;
  }

  if (!eventRow) return null;

  const event = flattenEventResponse(eventRow);
  if (event.status !== "published" || !isPublicEvent(event.is_public)) {
    return null;
  }

  const [ticketTiers, organization] = await Promise.all([
    loadTicketTiers(event.id),
    loadOrganization(),
  ]);

  return mapEventDetailFromApi(eventRow, ticketTiers, organization);
}

export async function fetchMoreEvents(currentEventId, limit = 4) {
  const events = await fetchPublishedEvents();
  return events.filter((event) => event.eventId !== currentEventId).slice(0, limit);
}
