"use client";
import { useState } from "react";
import Link from "next/link";
import Icon from "./Icon";
import Typography from "./Typography";
import { cn } from "@/lib/utils";

/**
 * event = { id, image, badge?, dateMonth, dateDay, title, subtitle, venue, time }
 * variant: "ticket" -> badge top-left, outline heart, "View Ticket" + arrow CTA
 *          "wishlist" -> filled heart top-right (unsave), "View Event" CTA
 */
const TicketCard = ({ event, variant = "ticket", href, showHeart = true }) => {
  const [liked, setLiked] = useState(variant === "wishlist");
  const { id, image, badge, dateMonth, dateDay, title, subtitle, venue, time } = event;
  const isWishlist = variant === "wishlist";
  const linkHref = href ?? `/events/${id}`;

  return (
    <div className="flex flex-col rounded-2xl overflow-hidden border border-primary-border bg-sidebar-bg group hover:border-primary/50 transition-colors">
      <div className="relative aspect-[16/10] overflow-hidden flex-shrink-0">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          {!isWishlist && badge ? (
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary text-primary-text">
              {badge}
            </span>
          ) : (
            <span />
          )}

          {showHeart ? (
            <button
              type="button"
              onClick={() => setLiked((prev) => !prev)}
              aria-label="Toggle wishlist"
              className="w-7 h-7 rounded-full bg-black/40 backdrop-blur flex items-center justify-center flex-shrink-0"
            >
              <Icon
                name="Heart"
                width={14}
                height={14}
                className={cn("text-white cursor-pointer", liked && "text-primary fill-primary")}
              />
            </button>
          ) : (
            <span />
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3 p-4 flex-1">
        <div className="flex items-start gap-3">
          <div className="w-11 flex-shrink-0 rounded-xl border border-secondary-border bg-background py-1.5 flex flex-col items-center">
            <span className="text-[9px] font-semibold uppercase text-primary leading-none">{dateMonth}</span>
            <Typography variant="sectionTitle" className="!text-base mt-0.5">{dateDay}</Typography>
          </div>
          <div className="min-w-0">
            <Typography variant="title" className="truncate">{title}</Typography>
            <p className="text-sm text-primary truncate">{subtitle}</p>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 text-xs text-muted-text">
            <Icon name="MapPin" width={13} height={13} className="text-primary flex-shrink-0" />
            <span className="truncate">{venue}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-text">
            <Icon name="Clock" width={13} height={13} className="text-primary flex-shrink-0" />
            <span className="truncate">{time}</span>
          </div>
        </div>

        <Link
          href={linkHref}
          className={cn(
            "mt-auto flex items-center justify-center gap-2 h-10 rounded-2xl border border-secondary-border text-sm font-medium text-foreground-text hover:border-primary hover:text-primary transition-colors"
          )}
        >
          {isWishlist ? "View Event" : "View Ticket"}
          {!isWishlist && <Icon name="ArrowRight" width={14} height={14} />}
        </Link>
      </div>
    </div>
  );
};

export default TicketCard;
