"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "../ui/Icon";
import Typography from "../ui/Typography";
import { buttonVariants } from "../ui/Button";
import { cn } from "@/lib/utils";

const getTimeLeft = (target) => {
  const diff = Math.max(0, target - Date.now());
  const hrs = Math.floor(diff / 3_600_000);
  const mins = Math.floor((diff % 3_600_000) / 60_000);
  const secs = Math.floor((diff % 60_000) / 1000);
  return { hrs, mins, secs };
};

const CompetitionsBanner = () => {
  // next draw target: 6h 23m 48s from first render
  const [target] = useState(
    () => Date.now() + (6 * 3600 + 23 * 60 + 48) * 1000,
  );
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target));

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <section className="mx-auto px-6 lg:px-10 xl:px-14 2xl:px-20 mt-12 lg:mt-16">
      <div className="relative overflow-hidden rounded-2xl border border-primary-border bg-gradient-to-br from-[#2A1F4D] via-[#241B45] to-[#1A1330] px-6 sm:px-10 py-8 sm:py-10">
        <div className="absolute -top-10 -left-10 w-56 h-56 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute -bottom-16 right-0 w-64 h-64 rounded-full bg-primary/20 blur-3xl" />

        <div className="relative grid lg:grid-cols-2 gap-8 items-center">
          <div className="flex items-center gap-5">
            <div className="hidden sm:flex w-20 h-20 rounded-full bg-amber-400/15 items-center justify-center flex-shrink-0">
              <Icon
                name="Trophy"
                width={34}
                height={34}
                className="text-amber-400"
              />
            </div>
            <div>
              <Typography variant="heading2" className="text-primary-text">
                Enter. Win. <span className="text-gradient">Experience.</span>
              </Typography>
              <Typography variant="subtitle" className="mt-2 mb-5 max-w-sm text-primary-text">
                {" "}
                Join daily competitions and giveaways. Amazing prizes. Every
                single day.
              </Typography>
              <Link
                href="/competitions"
                className={cn(
                  buttonVariants({ variant: "primary", size: "lg" }),
                )}
              >
                View Competitions
                <Icon name="ArrowRight" width={16} height={16} />
              </Link>
            </div>
          </div>

          <div className="bg-black/25 rounded-2xl border border-white/10 px-6 py-5">
            <p className="text-center text-xs text-primary-text uppercase tracking-wide mb-4">
              Next Draw In
            </p>
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              <TimeBlock value={pad(timeLeft.hrs)} label="Hrs" />
              <span className="text-white/30 text-2xl font-bold pb-5">:</span>
              <TimeBlock value={pad(timeLeft.mins)} label="Mins" />
              <span className="text-white/30 text-2xl font-bold pb-5">:</span>
              <TimeBlock value={pad(timeLeft.secs)} label="Secs" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompetitionsBanner;

const TimeBlock = ({ value, label }) => (
  <div className="flex flex-col items-center gap-1.5">
    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
      <span className="text-xl sm:text-2xl font-bold text-white tabular-nums">
        {value}
      </span>
    </div>
    <Typography variant="subtitle" className="uppercase text-[12px] text-primary-text">{label}</Typography>
  </div>
);
