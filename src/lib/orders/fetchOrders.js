import {
  cancelOrderAPI,
  createOrderAPI,
  getOrderAPI,
  listOrdersAPI,
} from "@/api/order/api";
import { mapOrderFromApi } from "@/lib/orders/orderMapper";

export async function createOrder(accessToken, payload) {
  const res = await createOrderAPI(accessToken, payload);
  return mapOrderFromApi(res?.data);
}

export async function fetchOrderById(accessToken, orderId) {
  const res = await getOrderAPI(accessToken, orderId);
  return mapOrderFromApi(res?.data);
}

export async function fetchOrders(accessToken, params = {}) {
  const res = await listOrdersAPI(accessToken, params);
  const orders = res?.data?.orders ?? [];
  return orders.map(mapOrderFromApi);
}

export async function cancelOrder(accessToken, orderId) {
  const res = await cancelOrderAPI(accessToken, orderId);
  return mapOrderFromApi(res?.data);
}
