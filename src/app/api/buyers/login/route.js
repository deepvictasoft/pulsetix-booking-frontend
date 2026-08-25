import { NextResponse } from "next/server";
import { buyerLoginAPI, buyerRegisterAPI } from "@/api/buyer/api";

export async function POST(request) {
  try {
    const payload = await request.json();
    const res = await buyerLoginAPI(payload);

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
        message: error.message ?? "Could not log in",
      },
      { status: error.statusCode ?? 500 },
    );
  }
}
