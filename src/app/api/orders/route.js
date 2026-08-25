import { NextResponse } from "next/server";
import { createOrder, fetchOrders } from "@/lib/orders/fetchOrders";

function getAccessTokenFromRequest(request) {
  const auth = request.headers.get("authorization") ?? "";
  if (auth.startsWith("Bearer ")) {
    return auth.slice(7);
  }
  return null;
}

export async function GET(request) {
  try {
    const accessToken = getAccessTokenFromRequest(request);

    if (!accessToken) {
      return NextResponse.json(
        { status: false, message: "Authentication required" },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(request.url);
    const params = {};

    if (searchParams.get("status")) {
      params.status = searchParams.get("status");
    }
    if (searchParams.get("page")) {
      params.page = searchParams.get("page");
    }
    if (searchParams.get("limit")) {
      params.limit = searchParams.get("limit");
    }

    const orders = await fetchOrders(accessToken, params);
    return NextResponse.json({ status: true, data: orders });
  } catch (error) {
    return NextResponse.json(
      {
        status: false,
        message: error.message ?? "Could not load orders",
      },
      { status: error.statusCode ?? 500 },
    );
  }
}

export async function POST(request) {
  try {
    const accessToken = getAccessTokenFromRequest(request);

    if (!accessToken) {
      return NextResponse.json(
        { status: false, message: "Authentication required" },
        { status: 401 },
      );
    }

    const payload = await request.json();
    const order = await createOrder(accessToken, payload);
    return NextResponse.json({ status: true, data: order });
  } catch (error) {
    return NextResponse.json(
      {
        status: false,
        message: error.message ?? "Could not create order",
      },
      { status: error.statusCode ?? 500 },
    );
  }
}
