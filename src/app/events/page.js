"use client";
import { useState } from "react";
import EventsHero from "@/components/event-sections/EventsHero";
import EventsCategorySlider from "@/components/event-sections/EventsCategorySlider";
import EventFilters from "@/components/event-sections/EventFilters";
import EventsGrid from "@/components/event-sections/EventsGrid";
import SubscribeCard from "@/components/event-sections/SubscribeCard";

const DEFAULT_FILTERS = {
    location: "All Locations",
    date: null,
    category: "All Categories",
    price: "Any Price",
};

export default function EventsPage() {
    const [filters, setFilters] = useState(DEFAULT_FILTERS);

    const handleCategorySelect = (category) => {
        setFilters((prev) => ({ ...prev, category }));
    };

    return (
        <>
            <EventsHero />
            <EventsCategorySlider
                onSelect={handleCategorySelect}
                selectedCategory={filters.category}
            />
            <EventFilters filters={filters} onChange={setFilters} />
            <EventsGrid filters={filters} />
            <SubscribeCard />
        </>
    );
}