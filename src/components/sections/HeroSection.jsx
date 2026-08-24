"use client";
import Link from "next/link";
import Icon from "../ui/Icon";
import { buttonVariants } from "../ui/Button";
import { cn } from "@/lib/utils";
import Typography from "../ui/Typography";

const HeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-background">
      {/* Full-bleed image */}
      <div className="relative w-full h-[420px] sm:h-[500px] lg:h-[600px]">
        <img
          src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1600&q=80"
          alt="Concert crowd enjoying a live event"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Left gradient so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent" />

        {/* Text overlay — same layout as before */}
        <div className="relative h-full mx-auto px-6 lg:px-10 xl:px-20 2xl:px-30 flex items-center">
          <div className="flex flex-col max-w-lg">
            <Typography variant="heading" className="text-4xl sm:text-5xl lg:text-6xl mb-5">
              Your city.
              <br />
              Your <span className="text-gradient">events.</span>
              <br />
              Your people.
            </Typography>

            <Typography variant="subtitle" className="mb-8 max-w-md">
              Discover amazing events, book tickets, and connect with people who
              love the same things you do.
            </Typography>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/events"
                className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
              >
                Explore Events
                <Icon name="ArrowRight" width={16} height={16} />
              </Link>
              <Link
                href="/become-organiser"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                Create an Event
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;