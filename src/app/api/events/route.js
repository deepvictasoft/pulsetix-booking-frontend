import { NextResponse } from "next/server";
import { fetchPublishedEvents } from "@/lib/events/fetchEvents";

export async function GET() {
  try {
    const events = await fetchPublishedEvents();
    return NextResponse.json({ status: true, data: events });
  } catch (error) {
    return NextResponse.json(
      {
        status: false,
        message: error.message ?? "Could not load events",
      },
      { status: error.statusCode ?? 500 },
    );
  }
}
