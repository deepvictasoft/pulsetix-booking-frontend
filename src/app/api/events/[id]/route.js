import { NextResponse } from "next/server";
import { fetchEventDetail } from "@/lib/events/fetchEvents";

export async function GET(_request, { params }) {
  try {
    const { id } = await params;
    const event = await fetchEventDetail(id);

    if (!event) {
      return NextResponse.json(
        { status: false, message: "Event not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ status: true, data: event });
  } catch (error) {
    return NextResponse.json(
      {
        status: false,
        message: error.message ?? "Could not load event",
      },
      { status: error.statusCode ?? 500 },
    );
  }
}
