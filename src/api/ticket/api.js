import { apiFetch } from "@/api/client";

/**
 * Backend mount: /api/v1/events/:eventId/tickets
 * Response envelope: { status, code, data }
 */

// GET /api/v1/events/:eventId/tickets
export const listTicketTiersAPI = (eventId) => apiFetch(`/events/${eventId}/tickets`);
