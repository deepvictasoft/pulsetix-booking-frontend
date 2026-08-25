import { buyerApiFetch } from "@/api/buyerClient";

/**
 * Backend mount: /api/v1/buyers
 * Response envelope: { status, code, data }
 */

// POST /api/v1/buyers/register
export const buyerRegisterAPI = (payload) =>
  buyerApiFetch("/buyers/register", null, {
    method: "POST",
    body: JSON.stringify(payload),
  });

// POST /api/v1/buyers/login
export const buyerLoginAPI = (payload) =>
  buyerApiFetch("/buyers/login", null, {
    method: "POST",
    body: JSON.stringify(payload),
  });

// GET /api/v1/buyers/me
export const getBuyerMeAPI = (accessToken) =>
  buyerApiFetch("/buyers/me", accessToken);
