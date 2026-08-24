"use client";
import { useEffect, useState } from "react";
import Icon from "./Icon";
import Button from "./Button";
import Typography from "./Typography";

// Parse "DD" string → int
const p = (v) => parseInt(v || "0", 10);

// Convert all fields to total seconds for countdown
const toTotalSecs = ({ days, hours, mins, secs }) =>
  p(days) * 86400 + p(hours) * 3600 + p(mins) * 60 + p(secs);

const pad = (n) => String(n).padStart(2, "0");

const CountdownUnit = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <span className="text-lg font-bold text-primary leading-none">
      {pad(value)}
    </span>
    <span className="text-[9px] uppercase tracking-widest text-muted-text mt-0.5">
      {label}
    </span>
  </div>
);

const Divider = () => (
  <span className="text-primary font-bold text-base self-start mt-0.5">:</span>
);

const CompetitionCard = ({ competition }) => {
  const {
    image,
    prizeSmall,
    prizeLarge,
    prizeItalic,
    description,
    organizer,
    participants,
    days,
    hours,
    mins,
    secs,
    isLive,
  } = competition;

  const [remaining, setRemaining] = useState(
    toTotalSecs({ days, hours, mins, secs }),
  );

  useEffect(() => {
    const id = setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  const d = Math.floor(remaining / 86400);
  const h = Math.floor((remaining % 86400) / 3600);
  const m = Math.floor((remaining % 3600) / 60);
  const s = remaining % 60;

  return (
    <div className="flex flex-col bg-sidebar-bg border border-primary-border rounded-2xl overflow-hidden group">
      {/* ── Image area ── */}
      <div className="relative w-full h-48 overflow-hidden flex-shrink-0">
        <img
          src={image}
          alt={description}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* dark gradient bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* LIVE badge */}
        {isLive && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full bg-primary text-primary-text tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-text animate-pulse" />
              LIVE
            </span>
          </div>
        )}

        {/* Prize shield icon top-right */}
        <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center">
          <Icon name="Trophy" width={16} height={16} className="text-primary" />
        </div>

        {/* Prize text — bottom of image */}
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-white/80 leading-none mb-0.5">
            {prizeSmall}
          </p>
          <Typography
            variant="heading2"
            className="!text-2xl uppercase tracking-tight drop-shadow-lg !text-primary-text"
          >
            {prizeLarge}
          </Typography>
          <p className="text-sm italic text-primary font-semibold mt-0.5 leading-none">
            {prizeItalic}
          </p>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col gap-3 p-4 flex-1">
        {/* Description */}
        <Typography variant="body" className="!text-sm font-medium">
          {description}
        </Typography>

        {/* Organizer + Participants */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
              <Icon
                name="User"
                width={10}
                height={10}
                className="text-primary"
              />
            </div>
            <Typography variant="body2" className="truncate">
              {organizer}
            </Typography>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
              <Icon
                name="Users"
                width={10}
                height={10}
                className="text-primary"
              />
            </div>
            <Typography variant="body2">
              {participants} Participants
            </Typography>
          </div>
        </div>

        {/* Countdown + Enter Now */}
        <div className="flex items-center justify-between gap-3 mt-auto">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-text mb-1.5 font-medium">
              Draw In
            </p>
            <div className="flex items-center gap-1.5">
              <CountdownUnit value={d} label="Days" />
              <Divider />
              <CountdownUnit value={h} label="Hrs" />
              <Divider />
              <CountdownUnit value={m} label="Mins" />
              <Divider />
              <CountdownUnit value={s} label="Secs" />
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="rounded-xl text-primary border-primary/40 hover:bg-primary/10 flex-shrink-0 px-5"
          >
            Enter Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompetitionCard;
