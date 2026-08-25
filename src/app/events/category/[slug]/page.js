"use client";
import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { EVENT_FILTER_CATEGORIES } from "@/constants/eventsData";
import EventFilters from "@/components/event-sections/EventFilters";
import EventsGrid from "@/components/event-sections/EventsGrid";
import CategoryHero from "@/components/event-category-sections/CategoryHero";
import SubscribeCard from "@/components/event-sections/SubscribeCard";

const DEFAULT_FILTERS = {
    location: "All Locations",
    date: null,
    price: "Any Price",
};

export default function CategoryPage() {
    const { slug } = useParams();
    const [filters, setFilters] = useState(DEFAULT_FILTERS);

    // Find matching category by slugified label
    const cat = EVENT_FILTER_CATEGORIES.find(
        (c) => c.label.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug
    );

    if (!cat) {
        return (
            <div className="min-h-screen flex items-center justify-center text-foreground-text">
                Category not found.
            </div>
        );
    }

    // Merge category filter into grid filters
    // We match by badge using the category label — pass as a special prop
    const gridFilters = { ...filters, _categoryLabel: cat.label };

    return (
        <>
            <CategoryHero cat={cat} />
            <EventFilters filters={filters} onChange={setFilters} />
            <EventsGrid filters={gridFilters} />
            <SubscribeCard />
        </>
    );
}
