'use client';
import Link from "next/link";
import Icon from "../ui/Icon";
import EventCard from "../ui/EventCard";
import Typography from "../ui/Typography";
import { EVENTS } from "@/constants/sectionsData";

const HotRightNow = () => {
    return (
        <section className="mx-auto px-6 lg:px-10 xl:px-14 2xl:px-20 mt-12 lg:mt-16 ">
            <div className="flex items-center justify-between mb-6">
                <Typography variant="sectionTitle" className="flex items-center gap-2">
                    <Icon name="Flame" size={20} className="text-primary" />
                    Hot Right <span className="text-gradient">Now</span>
                </Typography>

                <Link
                    href="/events"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gradient hover:text-primary-hover transition-colors"
                >
                    View all events
                    <span className="w-7 h-7 rounded-full border border-primary-border flex items-center justify-center">
                        <Icon name="ArrowRight" width={13} height={13} className="text-primary"/>
                    </span>
                </Link>
            </div>

            <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_2%,black_98%,transparent)]">
                <div className="flex gap-4 w-max animate-[marquee_35s_linear_infinite] hover:[animation-play-state:paused]">
                    {[...EVENTS, ...EVENTS].map((event, i) => (
                        <EventCard key={`${event.title}-${i}`} event={event} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HotRightNow;