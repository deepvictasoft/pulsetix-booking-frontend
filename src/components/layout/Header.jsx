'use client';
import { useState } from "react";
import Link from "next/link";
import Icon from "../ui/Icon";
import Avatar from "../ui/Avatar";
import { HOME_NAV_ITEM } from "@/constants/navigation";
import { useBuyerAuth } from "@/hooks/useBuyerAuth";
import dynamic from "next/dynamic";

const Sidebar = dynamic(() => import("./Sidebar"), { ssr: false });

const Header = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { isLoggedIn, initials } = useBuyerAuth();

    return (
        <header className="sticky top-0 w-full z-30 backdrop-blur-md border-b border-secondary-border">
            <div className="flex items-center justify-between gap-3 sm:gap-6 mx-auto h-14 lg:h-18 px-4 lg:px-8 xl:px-14 2xl:px-20">
                <Link href={HOME_NAV_ITEM.to} className="flex-shrink-0 text-gradient">
                    {/* <Icon name="Logo" size="sm" className="lg:hidden" />
                    <Icon name="Logo" size="md" className="hidden lg:flex" /> */}
                    PULSETIX
                </Link>

                <div className="flex-1 max-w-md hidden sm:flex items-center gap-2 border border-secondary-border bg-field-bg rounded-full px-4 h-10 transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/60">
                    <input
                        type="text"
                        placeholder="Search events, artists, venues..."
                        className="bg-transparent outline-none text-sm text-foreground-text placeholder:text-muted-text w-full"
                    />
                    <Icon name="Search" width={16} height={16} className="text-muted-text flex-shrink-0" />
                </div>

                <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
                    <Link
                        href="/become-organiser"
                        className="hidden sm:inline-flex items-center h-9 px-4 rounded-full bg-gradient text-xs sm:text-sm font-medium text-primary-text hover:bg-white/10 transition-all outline-none"
                    >
                        Become an Organiser
                    </Link>

                    <button
                        type="button"
                        className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-background transition-colors"
                        aria-label="Messages"
                    >
                        <Icon name="MessageCircle" width={18} height={18} className="text-foreground-text" />
                    </button>

                    <button
                        type="button"
                        onClick={() => setIsSidebarOpen((prev) => !prev)}
                        className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-background transition-colors"
                        aria-label={isLoggedIn ? "Open profile menu" : "Toggle menu"}
                    >
                        {isLoggedIn ? (
                            <Avatar size={40} initials={initials} className="border border-secondary-border rounded-full cursor-pointer" />
                        ) : (
                            <Icon name="Menu" width={18} height={18} className="text-primary-text cursor-pointer" />
                        )}
                    </button>
                </div>
            </div>

            <div className="sm:hidden px-4 pb-3">
                <div className="flex items-center gap-2 border border-secondary-border bg-field-bg rounded-full px-4 h-10 transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/70">
                    <input
                        type="text"
                        placeholder="Search events, artists, venues..."
                        className="bg-transparent outline-none text-sm text-foreground-text placeholder:text-muted-text w-full"
                    />
                    <Icon name="Search" width={16} height={16} className="text-muted-text flex-shrink-0" />
                </div>
            </div>

            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </header>
    );
};

export default Header;