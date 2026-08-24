"use client";
import Icon from "../ui/Icon";
import Typography from "../ui/Typography";

const TRUST_ITEMS = [
  {
    icon: "Check",
    title: "Instant Confirmation",
    subtitle: "Your tickets will be sent instantly",
  },
  {
    icon: "QrCode",
    title: "Secure Booking",
    subtitle: "Your payment is 100% secure",
  },
  {
    icon: "ChevronDown",
    title: "Free Cancellation",
    subtitle: "Cancel up to 24 hours before event",
  },
];

const TicketBookingCard = () => {
  return (
    <div className="lg:sticky lg:top-24">
      <div className="rounded-2xl border border-primary-border bg-sidebar-bg p-5 flex flex-col gap-4">
        {TRUST_ITEMS.map((item) => (
          <div key={item.title} className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
              <Icon
                name={item.icon}
                width={16}
                height={16}
                className="text-primary"
              />
            </div>
            <div>
              <Typography variant="body" className="!text-sm font-medium">
                {item.title}
              </Typography>
              <Typography variant="body2">{item.subtitle}</Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketBookingCard;
