import Icon from "../ui/Icon";
import Typography from "../ui/Typography";

const DEFAULT_ITEMS = [
  { icon: "Sparkle", text: "Immersive, one-of-a-kind experience" },
  { icon: "Heart", text: "Highly rated by past visitors" },
  { icon: "Users", text: "Fun for all ages" },
  { icon: "Smile", text: "Perfect for families and friends" },
];

const WhyYouLoveIt = ({ items = DEFAULT_ITEMS }) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <span className="w-1 h-5 rounded-full bg-primary" />
        <Typography variant="sectionTitle">Why You&apos;ll Love It</Typography>
      </div>

      <div className="rounded-2xl border border-primary-border bg-sidebar-bg p-5 flex flex-col gap-4">
        {items.map((item) => (
          <div key={item.text} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
              <Icon
                name={item.icon}
                width={16}
                height={16}
                className="text-primary"
              />
            </div>
            <Typography variant="body" className="!text-sm">
              {item.text}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyYouLoveIt;
