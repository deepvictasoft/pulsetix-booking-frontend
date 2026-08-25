import { buyerApiFetch } from "@/api/buyerClient";

/**
 * Backend mount: /api/v1/buyers/orders
 * Auth: Authorization: Bearer <buyerAccessToken>
 * Response envelope: { status, code, data }
 */

// POST /api/v1/buyers/orders
export const createOrderAPI = (accessToken, payload) =>
  buyerApiFetch("/buyers/orders", accessToken, {
    method: "POST",
    body: JSON.stringify(payload),
  });

// GET /api/v1/buyers/orders
export const listOrdersAPI = (accessToken, params = {}) => {
  const search = new URLSearchParams(params).toString();
  const query = search ? `?${search}` : "";
  return buyerApiFetch(`/buyers/orders${query}`, accessToken);
};

// GET /api/v1/buyers/orders/:orderId
export const getOrderAPI = (accessToken, orderId) =>
  buyerApiFetch(`/buyers/orders/${orderId}`, accessToken);

// POST /api/v1/buyers/orders/:orderId/cancel
export const cancelOrderAPI = (accessToken, orderId) =>
  buyerApiFetch(`/buyers/orders/${orderId}/cancel`, accessToken, {
    method: "POST",
  });
