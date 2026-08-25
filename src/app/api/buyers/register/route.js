import { NextResponse } from "next/server";
import { buyerRegisterAPI } from "@/api/buyer/api";

export async function POST(request) {
  try {
    const payload = await request.json();
    const res = await buyerRegisterAPI(payload);

    return NextResponse.json({
      status: true,
      data: {
        user: res?.data?.user ?? null,
        tokens: res?.data?.tokens ?? null,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: false,
        message: error.message ?? "Could not register",
      },
      { status: error.statusCode ?? 500 },
    );
  }
}
