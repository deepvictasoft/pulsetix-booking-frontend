"use client";
import CompetitionCard from "../ui/CompetitionCard";
import { COMPETITIONS_LIST } from "@/constants/competitionsData";
import Typography from "../ui/Typography";

const CompetitionsGrid = ({ activeTab, category = "All Categories", sort = "Sort by: Ending Soon" }) => {
    let filtered = COMPETITIONS_LIST.filter((c) => {
        // Tab filter
        if (activeTab === "Live Now" && !c.isLive) return false;
        if (activeTab === "Ending Soon" && !(c.timeUnit === "mins" || c.timeUnit === "hours")) return false;
        if (activeTab === "New Added" && c.isLive) return false;
        // Category filter
        if (category !== "All Categories" && c.category !== category) return false;
        return true;
    });

    // Sort
    const sortKey = sort.replace("Sort by: ", "");
    if (sortKey === "Newest First") {
        filtered = [...filtered].reverse();
    } else if (sortKey === "Most Popular") {
        filtered = [...filtered].sort((a, b) => {
            const pa = parseFloat((a.participants || "0").replace(/[K,]/g, (m) => m === "K" ? "000" : "")) || 0;
            const pb = parseFloat((b.participants || "0").replace(/[K,]/g, (m) => m === "K" ? "000" : "")) || 0;
            return pb - pa;
        });
    } else if (sortKey === "Least Entries") {
        filtered = [...filtered].sort((a, b) => {
            const pa = parseFloat((a.participants || "0").replace(/[K,]/g, (m) => m === "K" ? "000" : "")) || 0;
            const pb = parseFloat((b.participants || "0").replace(/[K,]/g, (m) => m === "K" ? "000" : "")) || 0;
            return pa - pb;
        });
    }
    // "Ending Soon" = default order

    return (
        <section className="mx-auto px-6 lg:px-10 xl:px-14 2xl:px-20 pb-12">
            {filtered.length === 0 ? (
                <div className="py-20 text-center">
                    <Typography variant="heading2" className="mb-2">No competitions found</Typography>
                    <Typography variant="body2">Try adjusting your filters to see more results.</Typography>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filtered.map((competition) => (
                        <CompetitionCard key={competition.id} competition={competition} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default CompetitionsGrid;    