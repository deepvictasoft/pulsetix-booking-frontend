"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "../ui/Icon";
import Typography from "../ui/Typography";
import Button from "../ui/Button";
import { cn } from "@/lib/utils";

const EventDetailHero = ({ event }) => {
  const [expanded, setExpanded] = useState(false);
  const [saved, setSaved] = useState(false);

  const { title, category, schedule, venue, about, image, host, ticketTiers } =
    event;

  const prices = (ticketTiers || []).map(
    (t) => Number(String(t.price).replace(/[^0-9.]/g, "")) || 0,
  );
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 0;

  return (
    <section className="mx-auto px-6 lg:px-10 xl:px-14 2xl:px-20 pt-10">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start">
        {/* Left: text content */}
        <div className="flex flex-col">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm text-muted-text hover:text-primary transition-colors mb-5 w-fit"
          >
            <Icon name="ArrowLeft" width={16} height={16} className="text-primary"/>
            Back to events
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            {category && (
              <span className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-2xl bg-gradient text-white border border-primary/30">
                {category}
              </span>
            )}
          </div>

          <Typography variant="heading" className="">
            {title}
          </Typography>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-2 text-sm text-muted-text">
            <span className="inline-flex items-center gap-1.5">
              <Icon
                name="Calendar"
                width={15}
                height={15}
                className="text-primary"
              />
              {schedule.startLabel.split(" at ")[0]}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-primary"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              {schedule.startTime} – {schedule.endTime}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <Icon
                name="MapPin"
                width={15}
                height={15}
                className="text-primary"
              />
              {venue}
            </span>
          </div>

          {/* <Typography
            variant="body"
            className={cn(
              "text-secondary-text mb-2",
              !expanded && "line-clamp-2",
            )}
          >
            {about}
          </Typography> */}

          {/* <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-hover transition-colors mb-6 w-fit"
          >
            {expanded ? "Read less" : "Read more"}

            <Icon
              name="ChevronDown"
              width={14}
              height={14}
              className={cn("transition-transform", expanded && "rotate-180")}
            />
          </button> */}

          <div className="flex flex-wrap items-center gap-3 mt-auto">
            <div className="mt-6 rounded-2xl border border-primary-border bg-sidebar-bg p-4 flex flex-col gap-3 w-full">
              <div className="flex items-center justify-between gap-6">
                <div>
                  <Typography variant="body2" className="mb-1">
                    Paid Tickets
                  </Typography>
                  <Typography variant="body" className="font-bold whitespace-nowrap">
                        From €{minPrice.toFixed(2)} – €{maxPrice.toFixed(2)}
                  </Typography>
                </div>
                <Link href={`/events/${event.id}/tickets`} className="shrink-0">
                  <Button
                    variant="primary"
                    icon="ArrowRight"
                    iconPosition="right"
                  >
                    Book Tickets
                  </Button>
                </Link>
              </div>
            </div>

            <Button
              variant="outline"
              icon="Heart"
              iconPosition="right"
              // onClick={() => setSaved((prev) => !prev)}
              className={cn(saved && "border-primary text-primary")}
              iconClassName="text-primary"
            >
              Add to Favourites
            </Button>

            <button
              type="button"
              aria-label="Share event"
              className="w-10 h-10 rounded-2xl border border-primary flex items-center justify-center text-foreground-text hover:bg-white/10 transition-colors"
            >
              <Icon name="Share2" width={16} height={16} className="text-primary"/>
            </button>
          </div>
        </div>

        {/* Right: gallery */}
        <div className="flex flex-col gap-3">
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10] border border-primary-border">
            <img
              src={image}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetailHero;