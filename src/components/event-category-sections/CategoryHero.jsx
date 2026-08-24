"use client";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import Typography from "@/components/ui/Typography";

const CategoryHero = ({ cat }) => {
    return (
        <section className="relative w-full overflow-hidden">
            {/* Hero image */}
            <div className="relative w-full h-[240px] sm:h-[300px] lg:h-[380px]">
                <img
                    src={cat.image}
                    alt={cat.label}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />
                {/* Color glow at bottom */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        background: `radial-gradient(ellipse at bottom center, ${cat.color}99 0%, transparent 65%)`,
                    }}
                />

                {/* Content */}
                <div className="relative h-full max-w-9xl mx-auto px-6 lg:px-10 xl:px-14 2xl:px-20 flex flex-col justify-end pb-8">
                    {/* Back button */}
                    <Link
                        href="/events"
                        className="mb-5 w-9 h-9 rounded-full border border-white/30 bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:border-white/60 transition-colors self-start"
                        aria-label="Back to events"
                    >
                        <Icon name="ArrowLeft" width={16} height={16} className="text-primary"/>
                    </Link>

                    {/* Icon + label row */}
                    <div className="flex items-center gap-3 mb-2">
                        <div
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ background: "rgba(0,0,0,0.5)", border: `1.5px solid ${cat.color}` }}
                        >
                            <Icon name={cat.icon} width={18} height={18} style={{ color: cat.color }} />
                        </div>
                        <Typography
                            variant="body2"
                            className="uppercase tracking-widest !text-white/60"
                        >
                            {cat.count} Events
                        </Typography>
                    </div>

                    {/* Title */}
                    <Typography variant="sectionTitle" className="!text-white !text-3xl lg:!text-4xl">
                        {cat.label}{" "}
                        <span style={{ color: cat.color }}>in Ireland</span>
                    </Typography>

                    {/* Sub */}
                    <Typography variant="body2" className="!text-white/60 mt-1 max-w-xs">
                        {cat.sub.replace("\\n", " ")}
                    </Typography>
                </div>

                {/* Bottom accent line */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-[2px]"
                    style={{ background: `linear-gradient(to right, ${cat.color}, transparent)` }}
                />
            </div>
        </section>
    );
};

export default CategoryHero;
