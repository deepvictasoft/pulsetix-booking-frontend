"use client";
import { useState } from "react";
import Link from "next/link";
import Icon from "./Icon";
import { cn } from "@/lib/utils";
import Typography from "./Typography";

const MONTH_NAMES = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

/**
 * Compact card for "More events" rows. Pass event = { id, image, title, date, price }
 */
const EventMiniCard = ({ event }) => {
  const [liked, setLiked] = useState(false);
  const { id, image, title, date, price } = event;

  const parsed = new Date(date.split("·")[0].trim());
  const month = !isNaN(parsed.getTime()) ? MONTH_NAMES[parsed.getMonth()] : "";
  const day = !isNaN(parsed.getTime()) ? parsed.getDate() : "";

  return (
    <Link
      href={`/events/${id}`}
      className="flex flex-col rounded-2xl overflow-hidden border border-primary-border bg-sidebar-bg group cursor-pointer hover:border-primary/50 transition-colors"
    >
      <div className="relative aspect-video overflow-hidden flex-shrink-0">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {month && (
          <div className="absolute top-3 left-3 flex flex-col items-center justify-center w-11 h-11 rounded-xl bg-background/90 backdrop-blur">
            <span className="text-[10px] font-semibold text-primary leading-none">{month}</span>
            <Typography variant="sectionTitle" className="!text-sm mt-0.5">{day}</Typography>
          </div>
        )}
      </div>

      <div className="flex items-start justify-between gap-2 p-4">
        <div className="min-w-0">
          <Typography variant="sectionTitle" className="!text-sm truncate">{title}</Typography>
          <Typography variant="body2" className="truncate mt-1">{date}</Typography>
          {price && <p className="text-sm font-bold text-gradient mt-2">From {price}</p>}
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setLiked((prev) => !prev);
          }}
          aria-label="Save event"
          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 hover:bg-white/10 transition-colors"
        >
          <Icon
            name="Heart"
            width={15}
            height={15}
            className={cn("text-muted-text cursor-pointer", liked && "text-primary fill-primary")}
          />
        </button>
      </div>
    </Link>
  );
};

export default EventMiniCard;
