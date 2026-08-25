"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import Typography from "@/components/ui/Typography";
import Button from "@/components/ui/Button";
import TicketCard from "@/components/ui/TicketCard";
import { MY_EVENTS_TABS } from "@/constants/myEventsData";
import { getBuyerAccessToken } from "@/lib/buyer/authStorage";
import {
  buildMyEventsStats,
  enrichOrdersWithEvents,
  groupBookingsByTab,
} from "@/lib/myEvents/myEventsHelpers";
import { cn } from "@/lib/utils";

const MyEventsContent = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBookings = async () => {
      const accessToken = getBuyerAccessToken();

      if (!accessToken) {
        setError("login");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/orders?limit=100", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const json = await res.json();

        if (!res.ok || !json.status) {
          throw new Error(json.message ?? "Could not load your bookings");
        }

        const enriched = await enrichOrdersWithEvents(json.data ?? []);
        setBookings(enriched);
      } catch (err) {
        setError(err.message ?? "Could not load your bookings");
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  const grouped = useMemo(() => groupBookingsByTab(bookings), [bookings]);
  const stats = useMemo(() => buildMyEventsStats(bookings), [bookings]);
  const activeEvents = grouped[activeTab] || [];
  const activeLabel = MY_EVENTS_TABS.find((tab) => tab.key === activeTab)?.label || "";

  if (loading) {
    return (
      <section className="mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20 py-8 sm:py-10">
        <Typography variant="body2">Loading your events...</Typography>
      </section>
    );
  }

  if (error === "login") {
    return (
      <section className="mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20 py-8 sm:py-10">
        <Typography variant="heading2">My Events</Typography>
        <Typography variant="subtitle" className="mt-1 mb-6">
          Your bookings, wishlist and event history
        </Typography>
        <div className="border border-dashed border-secondary-border rounded-2xl py-16 text-center flex flex-col gap-4 items-center">
          <Typography variant="body2">Please log in to view your booked tickets and events.</Typography>
          <Link href="/login">
            <Button variant="primary">Log in</Button>
          </Link>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20 py-8 sm:py-10">
        <Typography variant="heading2">My Events</Typography>
        <div className="border border-dashed border-secondary-border rounded-2xl py-16 text-center mt-6">
          <Typography variant="body2">{error}</Typography>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20 py-8 sm:py-10">
      <Typography variant="heading2">My Events</Typography>
      <Typography variant="subtitle" className="mt-1 mb-6">
        Your bookings, wishlist and event history
      </Typography>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {stats.map((stat) => {
          const isActive = activeTab === stat.key;

          return (
            <button
              key={stat.key}
              type="button"
              onClick={() => setActiveTab(stat.key)}
              className={cn(
                "text-left w-full relative rounded-2xl p-4 transition-all duration-200 cursor-pointer overflow-hidden bg-sidebar-bg",
                isActive ? "border border-primary/40" : "border border-secondary-border",
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-primary/10">
                    <Icon name={stat.icon} width={16} height={16} className="text-primary" />
                  </div>
                  <Typography variant="heading2" className="!text-2xl">
                    {stat.count}
                  </Typography>
                </div>
                <Icon name="ArrowRight" width={16} height={16} className="text-white" />
              </div>

              <p className="text-sm font-semibold mb-0.5 text-primary">{stat.label}</p>
              <Typography variant="body2" className="!text-[12px]">
                {stat.sub}
              </Typography>

              <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-2xl transition-all duration-200 bg-primary" />
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between border-b border-secondary-border mb-6">
        <div className="flex items-center gap-5 sm:gap-6 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {MY_EVENTS_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "relative py-3 text-sm font-medium whitespace-nowrap transition-colors cursor-pointer",
                activeTab === tab.key
                  ? "text-primary"
                  : "text-secondary-text hover:text-foreground-text",
              )}
            >
              {tab.label}
              {activeTab === tab.key && (
                <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      <Typography variant="title" className="mb-1">
        {activeLabel} Events
      </Typography>
      <Typography variant="body2" className="mb-4">
        {activeEvents.length} events
      </Typography>

      {activeEvents.length === 0 ? (
        <div className="border border-dashed border-secondary-border rounded-2xl py-16 text-center">
          <Typography variant="body2">
            {activeTab === "booked"
              ? "No booked tickets yet. Book an event to see it here."
              : "Nothing here yet."}
          </Typography>
          {activeTab === "booked" && (
            <Link href="/events" className="inline-block mt-4">
              <Button variant="outline">Browse events</Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {activeEvents.map((booking) => (
            <TicketCard
              key={booking.order.id}
              event={booking.card}
              variant="ticket"
              href={booking.card.href}
              showHeart={false}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default MyEventsContent;
