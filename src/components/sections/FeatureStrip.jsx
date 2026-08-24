import { FEATURES } from "@/constants/sectionsData";
import Icon from "../ui/Icon";
import Typography from "../ui/Typography";

const FeatureStrip = () => {
  return (
    <section className="mx-auto px-6 lg:px-10 xl:px-14 2xl:px-20 mt-12 lg:mt-16 relative">
      <div className="rounded-2xl border border-primary-border bg-sidebar-bg/60 backdrop-blur px-6 py-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient flex items-center justify-center rounded-xl flex-shrink-0">
              <Icon name={feature.icon} size={25} className="text-white" />
            </div>
            <div>
              <Typography variant="sectionTitle" className="!text-sm">
                  {feature.title}
              </Typography>
              <Typography variant="body2">
                      {feature.desc}
              </Typography>
            
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureStrip;
