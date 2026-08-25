import { NextResponse } from "next/server";
import { cancelOrder } from "@/lib/orders/fetchOrders";

function getAccessTokenFromRequest(request) {
  const auth = request.headers.get("authorization") ?? "";
  if (auth.startsWith("Bearer ")) {
    return auth.slice(7);
  }
  return null;
}

export async function POST(request, { params }) {
  try {
    const accessToken = getAccessTokenFromRequest(request);

    if (!accessToken) {
      return NextResponse.json(
        { status: false, message: "Authentication required" },
        { status: 401 },
      );
    }

    const { id } = await params;
    const order = await cancelOrder(accessToken, id);
    return NextResponse.json({ status: true, data: order });
  } catch (error) {
    return NextResponse.json(
      {
        status: false,
        message: error.message ?? "Could not cancel order",
      },
      { status: error.statusCode ?? 500 },
    );
  }
}
