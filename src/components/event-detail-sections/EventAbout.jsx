import Icon from "../ui/Icon";
import Typography from "../ui/Typography";

const EventAbout = ({ event }) => {
  const { about, schedule, venueName, venueAddress } = event;

  return (
    <div className="flex flex-col divide-y divide-secondary-border">
      <div className="pb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1 h-5 rounded-full bg-primary" />
          <Typography variant="sectionTitle">About This Event</Typography>
        </div>
        <Typography variant="body" className="text-secondary-text mb-4">
          {about}
        </Typography>
        {/* <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium px-3 py-1.5 rounded-2xl border border-primary-border text-foreground-text"
            >
              {tag}
            </span>
          ))}
        </div> */}
      </div>

      <div className="py-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1 h-5 rounded-full bg-primary" />
          <Typography variant="sectionTitle">Schedule</Typography>
        </div>

        <div className="flex flex-col">
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                <Icon name="Calendar" width={15} height={15} className="text-primary" />
              </div>
              <span className="w-px flex-1 bg-secondary-border my-1" />
            </div>
            <div className="flex-1 flex items-center justify-between pb-6 pt-1.5">
              <Typography variant="body" className="!text-sm font-medium">
                     Event Starts
              </Typography>
              <Typography variant="body2">
                {schedule.startLabel}
              </Typography>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <div className="flex-1 flex items-center justify-between pt-1.5">
              <Typography variant="body" className="!text-sm font-medium">Event Ends</Typography>
              <Typography variant="body2">
                {schedule.endLabel}
              </Typography>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1 h-5 rounded-full bg-primary" />
          <Typography variant="sectionTitle">Venue</Typography>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative w-full sm:w-40 h-28 rounded-xl overflow-hidden border border-primary-border bg-sidebar-bg flex-shrink-0 flex items-center justify-center">
            <Icon name="MapPin" width={24} height={24} className="text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5 mb-1">
              <Icon name="MapPin" width={14} height={14} className="text-primary" />
              <Typography variant="body" className="!text-sm font-semibold">
                {venueName}
              </Typography>
            </div>
            <p className="text-sm text-muted-text mb-2">{venueAddress}</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueAddress)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
            >
              Get Directions
              <Icon name="ArrowRight" width={14} height={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventAbout;
