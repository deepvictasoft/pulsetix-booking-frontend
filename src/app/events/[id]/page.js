import { notFound } from "next/navigation";
import EventDetailHero from "@/components/event-detail-sections/EventDetailHero";
import EventAbout from "@/components/event-detail-sections/EventAbout";
import EventMedia from "@/components/event-detail-sections/EventMedia";
import HostedBy from "@/components/event-detail-sections/HostedBy";
import WhyYouLoveIt from "@/components/event-detail-sections/WhyYouLoveIt";
import TicketBookingCard from "@/components/event-detail-sections/TicketBookingCard";
import MoreEvents from "@/components/event-detail-sections/MoreEvents";
import { getEventDetail, getMoreEventsByHost } from "@/constants/eventsData";

export default async function EventDetailPage({ params }) {
  const { id } = await params;
  const event = getEventDetail(id);

  if (!event) return notFound();

  const moreEvents = getMoreEventsByHost(id);

  return (
    <>
      <EventDetailHero event={event} />

      <section className="mx-auto px-6 lg:px-10 xl:px-14 2xl:px-20 py-10 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 flex flex-col gap-10">
          <EventAbout event={event} />
          <EventMedia gallery={event.gallery} />
        </div>

        <div className="lg:col-span-1 flex flex-col gap-8">
          <HostedBy host={event.host} />
          {/* <WhyYouLoveIt />
          <TicketBookingCard /> */}
        </div>
      </section>

      <MoreEvents hostName={event.host.name} events={moreEvents} />
    </>
  );
}
