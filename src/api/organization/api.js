import { apiFetch } from "@/api/client";

/**
 * Backend mount: /api/v1/organizations/me
 * Auth: Authorization: Bearer <accessToken>
 * Response envelope: { status, code, data }
 */

// GET /api/v1/organizations/me
export const getOrganizationMeAPI = () => apiFetch("/organizations/me");
