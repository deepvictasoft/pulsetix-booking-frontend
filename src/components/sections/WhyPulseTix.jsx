import { WHY_PULSETIX } from "@/constants/sectionsData";
import Icon from "../ui/Icon";
import Typography from "../ui/Typography";

const WhyPulseTix = () => {
  return (
    <section className="mx-auto px-6 lg:px-10 xl:px-14 2xl:px-20 mt-12 lg:mt-16">
      {/* <Typography variant="heading2" className="mb-8">
        Why <span className="text-gradient">PulseTix?</span>
      </Typography> */}

      <div className="rounded-2xl border border-primary-border bg-primary/10 backdrop-blur px-6 py-4 flex flex-col lg:flex-row gap-0">
        {WHY_PULSETIX.map((item, idx) => (
          <div 
            key={item.title} 
            className={`flex items-center gap-4 flex-1 py-4 px-6 ${
              idx !== WHY_PULSETIX.length - 1 ? 'border-b lg:border-b-0 lg:border-r border-primary-border' : ''
            }`}
          >
            <div
              className="w-12 h-12 flex items-center justify-center rounded-full flex-shrink-0 bg-gradient"
            >
              <Icon name={item.icon} size={22} className="text-white" />
            </div>
            <div className="text-left">
              <Typography variant="sectionTitle" className="!text-sm font-semibold">
                {item.title}
              </Typography>
              <Typography variant="body2" className="text-xs text-muted-text mt-1">
                {item.desc}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyPulseTix;