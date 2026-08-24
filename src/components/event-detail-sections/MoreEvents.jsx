import Link from "next/link";
import Icon from "../ui/Icon";
import Typography from "../ui/Typography";
import EventMiniCard from "../ui/EventMiniCard";

const MoreEvents = ({ hostName, events }) => {
  if (!events.length) return null;

  return (
    <section className="mx-auto px-6 lg:px-10 xl:px-14 2xl:px-20  pb-14">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="w-1 h-5 rounded-full bg-primary" />
          <Typography variant="sectionTitle">
            More Events by <span className="text-gradient">{hostName}</span>
          </Typography>
        </div>
        <Link href="/events" className="inline-flex items-center gap-1 text-sm font-medium text-gradient hover:text-primary-hover transition-colors">
          View all events
          <Icon name="ArrowRight" width={14} height={14} className="text-primary"/>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {events.map((event) => (
          <EventMiniCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
};

export default MoreEvents;
