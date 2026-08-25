import { notFound } from "next/navigation";
import TicketBookingHero from "@/components/ticket-booking-sections/TicketBookingHero";
import TicketBookingContent from "@/components/ticket-booking-sections/TicketBookingContent";
import { fetchEventDetail } from "@/lib/events/fetchEvents";

export default async function EventTicketsPage({ params }) {
  const { id } = await params;
  const event = await fetchEventDetail(id);

  if (!event) return notFound();

  return (
    <>
      <TicketBookingHero event={event} />
      <TicketBookingContent event={event} />
    </>
  );
}
