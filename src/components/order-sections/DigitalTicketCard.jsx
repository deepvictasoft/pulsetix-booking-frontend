import Icon from "@/components/ui/Icon";
import Typography from "@/components/ui/Typography";

const DigitalTicketCard = ({ ticket, tierLabel, index, total }) => {
  const isValid = ticket.status === "valid";
  const hasQr = Boolean(ticket.qrCode);

  return (
    <div className="rounded-2xl border border-secondary-border border-dashed bg-background p-4 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3 border-b border-primary-border border-dashed">
        <div className="min-w-0 pb-3">
          <Typography variant="body" className="!text-sm font-semibold truncate">
            {tierLabel}
          </Typography>
          <Typography variant="body2" className="!text-xs mt-1">
            Ticket {index + 1} of {total}
          </Typography>
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/15 text-primary whitespace-nowrap">
          {ticket.status}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        {hasQr ? (
          <div className="w-36 h-36 rounded-2xl bg-white flex items-center justify-center p-3 flex-shrink-0">
            <img
              src={ticket.qrCode}
              alt={`QR code for ticket ${ticket.ticketCode}`}
              className="w-full h-full object-contain"
            />
          </div>
        ) : (
          <div className="w-36 h-36 rounded-2xl border border-dashed border-secondary-border flex flex-col items-center justify-center gap-2 text-muted-text flex-shrink-0">
            <Icon name="QrCode" width={28} height={28} className="opacity-50" />
            <Typography variant="body2" className="!text-[11px] text-center px-3">
              {isValid ? "QR unavailable" : "QR not available"}
            </Typography>
          </div>
        )}

        <div className="flex flex-col gap-2 min-w-0 flex-1 w-full sm:w-auto">
          <Typography variant="body2" className="!text-xs uppercase tracking-wide text-muted-text">
            Ticket Number
          </Typography>
          <Typography variant="sectionTitle" className="!text-lg break-all">
            {ticket.ticketCode}
          </Typography>
          {hasQr && (
            <Typography variant="body2" className="!text-xs">
              Show this QR code at the venue entrance for check-in.
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};

export default DigitalTicketCard;
