"use client";
import Dropdown from "../ui/Dropdown";
import { cn } from "@/lib/utils";
import { COMPETITION_TABS, COMPETITION_CATEGORIES, COMPETITION_SORT } from "@/constants/competitionsData";

const CompetitionFilters = ({ activeTab, onTabChange, category, onCategoryChange, sort, onSortChange }) => {
    return (
        <section className="mx-auto px-6 lg:px-10 xl:px-14 2xl:px-20 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Tabs */}
                <div className="flex gap-1 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    {COMPETITION_TABS.map((tab) => {
                        const isActive = tab === activeTab;
                        return (
                            <button
                                key={tab}
                                type="button"
                                onClick={() => onTabChange(tab)}
                                className={cn(
                                    "flex-shrink-0 px-4 py-2 text-sm font-medium cursor-pointer whitespace-nowrap",
                                    isActive
                                        ? "text-primary border-b-2 border-primary pb-1.5"
                                        : "text-muted-text hover:text-foreground-text"
                                )}
                            >
                                {tab}
                            </button>
                        );
                    })}
                </div>

                {/* Dropdowns */}
                <div className="flex gap-3 flex-shrink-0">
                    <Dropdown
                        label="All Categories"
                        options={COMPETITION_CATEGORIES}
                        value={category}
                        onChange={onCategoryChange}
                        defaultValue="All Categories"
                    />
                    <Dropdown
                        label="Sort by: Ending Soon"
                        options={COMPETITION_SORT.map((s) => `Sort by: ${s}`)}
                        value={sort}
                        onChange={onSortChange}
                        defaultValue={`Sort by: ${COMPETITION_SORT[0]}`}
                    />
                </div>
            </div>
        </section>
    );
};

export default CompetitionFilters;