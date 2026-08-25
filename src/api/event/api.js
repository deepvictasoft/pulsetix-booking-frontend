import { apiFetch } from "@/api/client";

/**
 * Backend mount: /api/v1/events
 * Auth: Authorization: Bearer <accessToken>
 * Response envelope: { status, code, data }
 */

// GET /api/v1/events?status=
export const listEventsAPI = (params = {}) => {
  const search = new URLSearchParams(params).toString();
  const query = search ? `?${search}` : "";
  return apiFetch(`/events${query}`);
};

// GET /api/v1/events/:id
export const getEventAPI = (id) => apiFetch(`/events/${id}`);
