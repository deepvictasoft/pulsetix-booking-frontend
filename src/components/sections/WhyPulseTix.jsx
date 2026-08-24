import { WHY_PULSETIX } from "@/constants/sectionsData";
import Icon from "../ui/Icon";
import Typography from "../ui/Typography";

const WhyPulseTix = () => {
  return (
    <section className="mx-auto px-6 lg:px-10 xl:px-14 2xl:px-20 mt-12 lg:mt-16">
      <Typography variant="heading2" className="mb-6">
        Why <span className="text-gradient">PulseTix?</span>
      </Typography>

      <div className="rounded-2xl border border-primary-border bg-sidebar-bg/60 backdrop-blur px-6 py-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {WHY_PULSETIX.map((item) => (
          <div key={item.title} className="flex items-center gap-3">
            <div
              className="w-11 h-11 flex items-center justify-center rounded-xl flex-shrink-0 bg-gradient"
            >
              <Icon name={item.icon} size={22} className="text-white" />
            </div>
            <div>
              <Typography variant="sectionTitle" className="!text-sm">
                {item.title}
              </Typography>
              <Typography variant="body2">{item.desc}</Typography>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyPulseTix;
