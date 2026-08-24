"use client";
import { useState } from "react";
import CompetitionsHero from "@/components/competition-sections/CompetitionsHero";
import CompetitionFilters from "@/components/competition-sections/CompetitionFilters";
import CompetitionsGrid from "@/components/competition-sections/CompetitionsGrid";
import { COMPETITION_SORT } from "@/constants/competitionsData";

export default function CompetitionsPage() {
    const [activeTab, setActiveTab] = useState("All Competitions");
    const [category, setCategory] = useState("All Categories");
    const [sort, setSort] = useState(`Sort by: ${COMPETITION_SORT[0]}`);

    return (
        <>
            <CompetitionsHero />
            <CompetitionFilters
                activeTab={activeTab}
                onTabChange={setActiveTab}
                category={category}
                onCategoryChange={setCategory}
                sort={sort}
                onSortChange={setSort}
            />
            <CompetitionsGrid activeTab={activeTab} category={category} sort={sort} />
        </>
    );
}
