import Image from "next/image";
import Typography from "../ui/Typography";
import Icon from "../ui/Icon";
import concertImage from "@/assets/concert.png";
import { COMPETITION_STATS } from "@/constants/competitionsData";

const CompetitionsHero = () => {
  return (
    <section className="relative w-full overflow-hidden bg-background">
      {/* Banner */}
      <div className="relative w-full h-[220px] sm:h-[260px] lg:h-[300px]">
        <Image
          src={concertImage}
          alt="Competitions banner"
          className="absolute inset-0 w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-background/15" />

        <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-10 flex flex-col justify-center">
          <Typography variant="heading" className="mb-2">
            <span className="text-primary">Competitions</span>
          </Typography>
          <Typography variant="subtitle" className="max-w-md text-primary-text">
            Win tickets, meet &amp; greets, exclusive merch and unforgettable
            experiences.
          </Typography>
        </div>
      </div>

      {/* Stats row */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {COMPETITION_STATS.map((stat) => (
            <div
              key={stat.label}
              className="relative flex items-center gap-4 rounded-2xl px-5 py-5 overflow-hidden border border-primary/20"
            >
              {/* Wave / glow background decoration */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at bottom right, rgba(45,212,191,0.12) 0%, transparent 65%)",
                }}
              />
              {/* Subtle wave lines SVG */}
              <svg
                className="absolute bottom-0 right-0 opacity-10 pointer-events-none"
                width="120"
                height="60"
                viewBox="0 0 120 60"
                fill="none"
              >
                <path
                  d="M0 40 Q30 20 60 35 Q90 50 120 30"
                  stroke="#2DD4BF"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path
                  d="M0 50 Q30 30 60 45 Q90 60 120 40"
                  stroke="#2DD4BF"
                  strokeWidth="1"
                  fill="none"
                />
                <path
                  d="M0 58 Q30 42 60 54 Q90 66 120 50"
                  stroke="#2DD4BF"
                  strokeWidth="0.7"
                  fill="none"
                />
              </svg>

              {/* Icon circle */}
              <div className="relative w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-primary/10 border border-primary/40">
                <Icon
                  name={stat.icon}
                  width={22}
                  height={22}
                  className="text-primary"
                />
              </div>

              {/* Text */}
              <div className="relative">
                <Typography variant="heading2" className="!text-2xl mb-1 text-foreground-text">
                  {stat.value}
                </Typography>
                <Typography
                  variant="body2"
                  className="font-semibold text-primary mb-0.5"
                >
                  {" "}
                  {stat.label}
                </Typography>
                <Typography variant="body2" className="!text-[12px]">
                  {stat.sub}
                </Typography>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-2xl transition-all duration-200 bg-primary" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompetitionsHero;
