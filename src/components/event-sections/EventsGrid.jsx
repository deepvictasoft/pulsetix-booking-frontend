"use client";
import { useMemo, useState } from "react";
import EventListCard from "../ui/EventListCard";
import Pagination from "./Pagination";
import { EVENTS_LIST, EVENT_FILTER_CATEGORIES } from "@/constants/eventsData";
import Typography from "../ui/Typography";

const PAGE_SIZE = 8;

function parsePrice(priceStr) {
    if (!priceStr || priceStr === "Free") return 0;
    return parseFloat(priceStr.replace(/[€,]/g, "")) || 0;
}

function parseDate(dateStr) {
    if (!dateStr) return null;
    const clean = dateStr.split("·")[0].trim();
    return new Date(clean);
}

// Map category label to category values used in EVENTS_LIST
// 
// We do a loose includes match so "Music" catches "Live Music", "Nightlife" catches "Nightlife" etc.
function matchesCategoryLabel(ev, categoryLabel) {
    if (!categoryLabel) return true;
    const badge = (ev.category || "").toLowerCase();
    const label = categoryLabel.toLowerCase();
    // exact match first
    if (badge === label) return true;
    // badge contains label word (e.g. badge="Live Music", label="Music")
    if (badge.includes(label)) return true;
    // label contains badge (e.g. label="Arts & Culture", badge="Arts")
    if (label.includes(badge)) return true;
    return false;
}

const EventsGrid = ({ filters = {} }) => {
    const [page, setPage] = useState(1);

    const {
        location = "All Locations",
        date = null,
        category = "All Categories",
        price = "Any Price",
        _categoryLabel = null, // set by category page to hard-filter by category slug
    } = filters;

    const filtered = useMemo(() => {
        return EVENTS_LIST.filter((ev) => {
            // Hard category filter from category page
            if (_categoryLabel && !matchesCategoryLabel(ev, _categoryLabel)) return false;
            // Location
            if (location !== "All Locations" && ev.venue !== location) return false;
            // Date
            if (date) {
                const evDate = parseDate(ev.date);
                if (!evDate) return true;
                const sel = new Date(date); sel.setHours(0, 0, 0, 0);
                const evDay = new Date(evDate); evDay.setHours(0, 0, 0, 0);
                if (evDay < sel) return false;
            }
            // Category dropdown (only used on main events page)
            if (!_categoryLabel && category !== "All Categories" && ev.category !== category) return false;
            // Price
            if (price !== "Any Price") {
                const p = parsePrice(ev.price);
                if (price === "Free" && p !== 0) return false;
                if (price === "Under €15" && p >= 15) return false;
                if (price === "Under €30" && p >= 30) return false;
                if (price === "Under €50" && p >= 50) return false;
                if (price === "€50+" && p < 50) return false;
            }
            return true;
        });
    }, [location, date, category, price, _categoryLabel]);

    // Reset page on filter change
    useMemo(() => { setPage(1); }, [location, date, category, price, _categoryLabel]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const visibleEvents = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const handlePageChange = (p) => {
        setPage(p);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <section className="mx-auto px-6 lg:px-10 xl:px-14 2xl:px-20 py-6">
            {visibleEvents.length === 0 ? (
                <div className="py-20 text-center">
                    <Typography variant="heading2" className="mb-2">No events found</Typography>
                    <Typography variant="body2">Try adjusting your filters to see more results.</Typography>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-8">
                        {visibleEvents.map((event, i) => (
                            <EventListCard key={`${event.title}-${i}`} event={event} />
                        ))}
                    </div>
                    <Pagination totalPages={totalPages} page={page} onChange={handlePageChange} />
                </>
            )}
        </section>
    );
};

export default EventsGrid;