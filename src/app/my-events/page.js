"use client";
import { useState } from "react";
import Icon from "@/components/ui/Icon";
import Typography from "@/components/ui/Typography";
import TicketCard from "@/components/ui/TicketCard";
import { MY_EVENTS_STATS, MY_EVENTS_TABS, MY_EVENTS_BY_TAB } from "@/constants/myEventsData";
import { cn } from "@/lib/utils";

export default function MyEventsPage() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const events = MY_EVENTS_BY_TAB[activeTab] || [];
  const activeLabel = MY_EVENTS_TABS.find((t) => t.key === activeTab)?.label || "";

  return (
    <section className="mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20 py-8 sm:py-10">
      <Typography variant="heading2">My Events</Typography>
      <Typography variant="subtitle" className="mt-1 mb-6">
        Your bookings, wishlist and event history
      </Typography>

      {/* ── Stat Cards ────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {MY_EVENTS_STATS.map((stat) => {
          const isActive = activeTab === stat.key;
          return (
            <button
              key={stat.key}
              type="button"
              onClick={() => setActiveTab(stat.key)}
              className={cn(
                "text-left w-full relative rounded-2xl p-4 transition-all duration-200 cursor-pointer overflow-hidden bg-sidebar-bg",
                isActive 
                  ? "border border-primary/40" 
                  : "border border-secondary-border"
              )}
            >
              {/* Top row: icon + count + arrow */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {/* Colored icon circle */}
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-primary/10"
                  >
                    <Icon name={stat.icon} width={16} height={16} className="text-primary" />
                  </div>
                  <Typography variant="heading2" className="!text-2xl">{stat.count}</Typography>
                </div>
                <Icon name="ArrowRight" width={16} height={16} className="text-white" />
              </div>

              {/* Label colored */}
              <p className="text-sm font-semibold mb-0.5 text-primary">
                {stat.label}
              </p>
              <Typography variant="body2" className="!text-[12px]">
                {stat.sub}
              </Typography>

              {/* Bottom accent border */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-2xl transition-all duration-200 bg-primary"
              />
            </button>
          );
        })}
      </div>

      {/* ── Tabs + Filter ─────────────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-secondary-border mb-6">
        <div className="flex items-center gap-5 sm:gap-6 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {MY_EVENTS_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "relative py-3 text-sm font-medium whitespace-nowrap transition-colors cursor-pointer",
                activeTab === tab.key ? "text-primary" : "text-secondary-text hover:text-foreground-text"
              )}
            >
              {tab.label}
              {activeTab === tab.key && (
                <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="flex-shrink-0 flex items-center gap-2 h-9 px-4 rounded-2xl border border-secondary-border text-xs sm:text-sm font-medium text-foreground-text hover:border-primary hover:text-primary transition-colors mb-2 cursor-pointer"
        >
          <Icon name="Filter" width={14} height={14} />
          Filter
        </button>
      </div>

      {/* ── Events Grid ───────────────────────────────────────── */}
      <Typography variant="title" className="mb-1">{activeLabel} Events</Typography>
      <Typography variant="body2" className="mb-4">{events.length} events</Typography>

      {events.length === 0 ? (
        <div className="border border-dashed border-secondary-border rounded-2xl py-16 text-center">
          <Typography variant="body2">Nothing here yet.</Typography>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {events.map((event) => (
            <TicketCard key={event.id} event={event} variant="ticket" />
          ))}
        </div>
      )}
    </section>
  );
}