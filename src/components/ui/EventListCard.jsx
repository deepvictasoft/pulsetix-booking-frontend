"use client";
import { useState } from "react";
import Link from "next/link";
import Icon from "./Icon";
import Typography from "./Typography";
import { cn } from "@/lib/utils";

/**
 * Grid card for the Events listing page. Pass event = { id, image, category, title, subtitle, date, venue, price }
 * Same behaviour/fields as EventCard, laid out for a grid instead of a horizontal scroller.
 * Links through to /events/[id].
 */
const EventListCard = ({ event }) => {
  const [liked, setLiked] = useState(false);
  const { id, image, category, title, subtitle, date, venue, price } = event;

  return (
    <Link
      href={`/events/${id}`}
      className="flex flex-col rounded-2xl overflow-hidden border border-primary-border bg-sidebar-bg group cursor-pointer hover:border-primary/50 transition-colors"
    >
      <div className="relative aspect-[4/3] overflow-hidden flex-shrink-0">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          {category && (
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gradient text-white">
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
            className="w-7 h-7 rounded-full bg-black/40 backdrop-blur flex items-center justify-center flex-shrink-0 border border-none outline-none"
          >
              <Icon
                name="Heart"
                width={14}
                height={14}
                className={cn("text-white cursor-pointer", liked && "text-primary fill-primary")}
              />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 p-4">
        <div>
          <Typography variant="title" className="truncate">
            {title}
          </Typography>
          <p className="text-sm text-primary truncate">{subtitle}</p>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 text-xs text-muted-text">
            <Icon name="Calendar" width={13} height={13} className="text-primary flex-shrink-0" />
            <span className="truncate">{date}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-text">
            <Icon name="MapPin" width={13} height={13} className="text-primary flex-shrink-0" />
            <span className="truncate">{venue}</span>
          </div>
        </div>

        {price && (
          <p className="text-sm font-bold text-gradient">
            From {price}
          </p>
        )}
      </div>
    </Link>
  );
};

export default EventListCard;