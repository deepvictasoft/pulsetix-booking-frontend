import Icon from "../ui/Icon";
import Typography from "../ui/Typography";
import { HOW_IT_WORKS } from "@/constants/sectionsData";

const HowItWorks = () => {
  return (
    <section className="mx-auto px-6 lg:px-10 xl:px-14 2xl:px-20 mt-12 lg:mt-16">
      <Typography variant="sectionTitle" className="mb-10">
        How it <span className="text-gradient">works</span>
      </Typography>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-6 sm:gap-0">
        {HOW_IT_WORKS.map((step, i) => (
          <div
            key={step.title}
            className="flex items-center sm:items-start flex-1 last:flex-none"
          >
            {/* Number — solid primary circle */}
            <div className="flex items-center h-14 sm:h-16 flex-shrink-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#ED714D]/10 flex items-center justify-center text-xs sm:text-sm font-bold text-[#ED714D]">
                {i + 1}
              </div>
            </div>

            {/* short connector: number -> icon */}
            <div className="flex items-center h-14 sm:h-16 w-5 sm:w-8 flex-shrink-0">
              <div className="w-full border-t border-dashed border-primary-border" />
            </div>

            {/* icon + label */}
            <div className="flex flex-col items-center gap-3 flex-shrink-0">
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-gradient"
                // style={{ background: "color-mix(in srgb, var(--color-primary) 12%, transparent)" }}
              >
                <Icon name={step.icon} width={24} height={24} className="text-primary-text" />
              </div>
              <div className="w-24 sm:w-32 text-center">
                <Typography variant="body" className="font-semibold">{step.title}</Typography>
                <Typography variant="body2" className="mt-1 leading-snug text-muted-text">{step.desc}</Typography>
              </div>
            </div>

            {/* long connector: icon -> next number */}
            {i < HOW_IT_WORKS.length - 1 && (
              <div className="hidden sm:flex items-center h-14 sm:h-16 flex-1 px-1 sm:px-2">
                <div className="w-full border-t border-dashed border-primary-border" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;