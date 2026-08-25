import Link from "next/link";
import Icon from "@/components/ui/Icon";
import Typography from "@/components/ui/Typography";

const TicketBookingHero = ({ event }) => {
  const { id, title, date, venue } = event;

  return (
    <section className="mx-auto px-6 lg:px-10 xl:px-14 2xl:px-20 pt-10 pb-6 border-b border-secondary-border">
      <Link
        href={`/events/${id}`}
        className="inline-flex items-center gap-2 text-sm text-muted-text hover:text-primary transition-colors mb-5 w-fit"
      >
        <Icon name="ArrowLeft" width={16} height={16} className="text-primary" />
        Back to event details
      </Link>

      <Typography variant="heading">Tickets</Typography>
      <Typography variant="subtitle" className="mt-2">
        {title} · {date} · {venue}
      </Typography>
    </section>
  );
};

export default TicketBookingHero;
