import { NextResponse } from "next/server";
import { fetchOrderById } from "@/lib/orders/fetchOrders";

function getAccessTokenFromRequest(request) {
  const auth = request.headers.get("authorization") ?? "";
  if (auth.startsWith("Bearer ")) {
    return auth.slice(7);
  }
  return null;
}

export async function GET(request, { params }) {
  try {
    const accessToken = getAccessTokenFromRequest(request);

    if (!accessToken) {
      return NextResponse.json(
        { status: false, message: "Authentication required" },
        { status: 401 },
      );
    }

    const { id } = await params;
    const order = await fetchOrderById(accessToken, id);

    if (!order) {
      return NextResponse.json(
        { status: false, message: "Order not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ status: true, data: order });
  } catch (error) {
    return NextResponse.json(
      {
        status: false,
        message: error.message ?? "Could not load order",
      },
      { status: error.statusCode ?? 500 },
    );
  }
}
