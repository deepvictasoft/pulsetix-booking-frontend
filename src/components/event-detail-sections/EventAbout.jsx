import Icon from "../ui/Icon";
import Typography from "../ui/Typography";

const EventAbout = ({ event }) => {
  const { about, schedule, venueName, venueAddress } = event;

  const durationHours =
    schedule.startDate && schedule.endDate
      ? Math.round(
          (schedule.endDate.getTime() - schedule.startDate.getTime()) /
            (1000 * 60 * 60),
        )
      : null;

  return (
    <div className="flex flex-col gap-6">
      {/* About */}
      <div className="rounded-2xl border border-primary-border bg-sidebar-bg p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1 h-5 rounded-full bg-primary" />
          <Typography variant="sectionTitle">About This Event</Typography>
        </div>
        <Typography variant="body" className="text-secondary-text mb-4">
          {about}
        </Typography>

        {durationHours ? (
          <div className="rounded-xl border border-primary-border bg-field-bg px-4 py-3 w-fit">
            <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-muted-text mb-1">
              <Icon name="Clock" width={13} height={13} className="text-primary" />
              Duration
            </span>
            <Typography variant="body" className="!text-sm font-semibold">
              {durationHours} hour{durationHours > 1 ? "s" : ""}
            </Typography>
          </div>
        ) : null}
      </div>

      {/* Schedule */}
      <div className="rounded-2xl border border-primary-border bg-sidebar-bg p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1 h-5 rounded-full bg-primary" />
          <Typography variant="sectionTitle">Schedule</Typography>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center self-stretch">
              <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                <Icon name="Zap" width={15} height={15} className="text-primary" />
              </div>
              <span className="w-0 flex-1 border-l-2 border-dashed border-secondary-border my-1" />
            </div>
            <div className="flex-1 flex items-center justify-between pb-6">
              <div>
                <Typography variant="body" className="!text-sm font-semibold">
                  Event Starts
                </Typography>
                <Typography variant="body2" className="!text-xs">
                  Gates open, get settled in
                </Typography>
              </div>
              <Typography variant="body2" className="!text-sm font-medium text-right flex-shrink-0 ml-4">
                {schedule.startLabel}
              </Typography>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
              <Icon name="Flag" width={15} height={15} className="text-primary" />
            </div>
            <div className="flex-1 flex items-center justify-between">
              <div>
                <Typography variant="body" className="!text-sm font-semibold">
                  Event Ends
                </Typography>
                <Typography variant="body2" className="!text-xs">
                  Final act and closing
                </Typography>
              </div>
              <Typography variant="body2" className="!text-sm font-medium text-right flex-shrink-0 ml-4">
                {schedule.endLabel}
              </Typography>
            </div>
          </div>
        </div>
      </div>

      {/* Venue */}
      <div className="rounded-2xl border border-primary-border bg-sidebar-bg p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1 h-5 rounded-full bg-primary" />
          <Typography variant="sectionTitle">Venue</Typography>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative w-full sm:w-40 h-28 rounded-xl overflow-hidden border border-primary-border bg-gradient-to-br from-primary/15 to-primary/5 flex-shrink-0 flex items-center justify-center">
            <Icon name="MapPin" width={26} height={26} className="text-primary" />
          </div>
          <div className="flex-1">
            <Typography variant="body" className="!text-sm font-semibold mb-1">
              {venueName}
            </Typography>
            <p className="text-sm text-muted-text mb-3">{venueAddress}</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueAddress)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary border border-primary/40 bg-primary/10 hover:bg-primary/15 transition-colors rounded-2xl px-3.5 py-1.5"
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