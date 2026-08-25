import Icon from "../ui/Icon";
import Typography from "../ui/Typography";
import Button from "../ui/Button";

const HostedBy = ({ host }) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <span className="w-1 h-5 rounded-full bg-primary" />
        <Typography variant="sectionTitle">Hosted By</Typography>
      </div>

      <div className="rounded-2xl border border-primary-border bg-sidebar-bg p-5">
        <div className="w-14 h-14 rounded-full bg-background border border-primary-border flex items-center justify-center mb-3 overflow-hidden">
          {host.logo ? (
            <img src={host.logo} alt={host.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-lg font-bold text-primary">{host.name?.charAt(0) || "O"}</span>
          )}
        </div>

        <div className="flex items-center gap-1.5 mb-1">
          <Typography variant="body" className="font-semibold">
            {host.name}
          </Typography>
          <Icon name="Check" width={13} height={13} className="text-primary-text bg-primary rounded-full p-0.5 box-content shrink-0" />
        </div>
        <Typography variant="body2" className="mb-4">
          {host.tagline || `Discover more events from ${host.name}.`}
        </Typography>

        <a href={host.website}>
          <Button variant="outline" icon="ArrowRight" iconPosition="right" className="w-full">
            View Organizer Profile
          </Button>
        </a>
      </div>
    </div>
  );
};

export default HostedBy;
