"use client";
import { useState } from "react";
import Link from "next/link";
import Icon from "./Icon";
import { cn } from "@/lib/utils";

/**
 * Reusable event card. Pass event = { id, image, category, title, subtitle, date, venue, price }
 * Links through to /events/[id].
 */
const EventCard = ({ event }) => {
  const [liked, setLiked] = useState(false);
  const { id, image, category, title, subtitle, date, venue, price } = event;

  return (
    <Link
      href={`/events/${id}`}
      className="relative flex-shrink-0 w-52 sm:w-64 h-72 sm:h-80 rounded-2xl overflow-hidden border border-primary-border group cursor-pointer block"
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

      <div className="relative h-full flex flex-col justify-between p-3">
        <div className="flex items-start justify-between">
          {category && (
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full border border-primary/60 bg-black/30 text-primary backdrop-blur">
              {category}
            </span>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setLiked((prev) => !prev);
            }}
            aria-label="Save event"
            className="w-7 h-7 rounded-full bg-black/40 backdrop-blur flex items-center justify-center flex-shrink-0"
          >
            <Icon
              name="Heart"
              width={14}
              height={14}
              className={cn("text-white cursor-pointer", liked && "text-primary fill-primary")}
            />
          </button>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground-text truncate">{title}</h3>
          <p className="text-xs text-primary truncate mb-1.5">{subtitle}</p>
          <div className="flex items-end justify-between gap-2">
            <p className="text-[12px] text-white truncate">
              {date} <br /> {venue}
            </p>
            {price && (
              <span className="text-sm font-bold text-primary flex-shrink-0">{price}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;