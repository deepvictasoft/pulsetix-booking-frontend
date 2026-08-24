'use client';
import { useEffect, useRef } from "react";
import Link from "next/link";
import Icon from "../ui/Icon";
import Avatar from "../ui/Avatar";
import {
    NAV_ITEMS,
    ACCOUNT_NAV_ITEMS,
    HELP_NAV_ITEM,
    LOGOUT_NAV_ITEM,
    GET_APP_ITEM,
    CURRENT_USER,
} from "@/constants/navigation";
import { cn } from "@/lib/utils";

const Sidebar = ({ isOpen, onClose }) => {
    const panelRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (e) => {
            if (panelRef.current && !panelRef.current.contains(e.target)) {
                onClose();
            }
        };
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEsc);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEsc);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-40 bg-black/50" aria-hidden="true">
            <div
                ref={panelRef}
                className={cn(
                    "absolute right-3 top-14 sm:right-6 sm:top-16 lg:right-10",
                    "w-[calc(100%-1.5rem)] max-w-[260px]",
                    "max-h-[calc(100vh-4.5rem)] overflow-y-auto",
                    "bg-sidebar-bg rounded-2xl shadow-2xl border border-primary-border",
                    "p-4 flex flex-col items-center gap-0.5"
                )}
            >
                <Avatar size={48} className="mb-1.5" />

                <p className="text-foreground-text font-medium text-sm">
                    {CURRENT_USER.firstName} {CURRENT_USER.lastName}
                </p>
                <p className="text-muted-text text-xs mb-2.5">{CURRENT_USER.email}</p>

                {/* <Link
                    href="/settings"
                    onClick={onClose}
                    className="w-full text-center rounded-full border border-primary-border py-1.5 text-xs font-semibold text-foreground-text hover:border-primary hover:text-primary transition-colors mb-2.5"
                >
                    View Profile
                </Link> */}

                {/* <hr className="w-full border border-primary-border mb-1" /> */}

                <ul className="w-full flex flex-col py-1">
                    {NAV_ITEMS.map((item) => (
                        <li key={item.label}>
                            <Link
                                href={item.to}
                                onClick={onClose}
                                className="flex items-center gap-3 px-2 py-2 rounded-2xl text-foreground-text hover:bg-primary/10 transition-colors"
                            >
                                <Icon name={item.icon} width={16} height={16} className="text-secondary-text" />
                                <span className="text-sm font-medium">{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* <hr className="w-full border border-primary-border mb-1" /> */}

                <ul className="w-full flex flex-col py-1">
                    {ACCOUNT_NAV_ITEMS.map((item) => (
                        <li key={item.label}>
                            <Link
                                href={item.to}
                                onClick={onClose}
                                className="flex items-center gap-3 px-2 py-2 rounded-2xl text-foreground-text hover:bg-primary/10 transition-colors"
                            >
                                <Icon name={item.icon} width={16} height={16} className="text-secondary-text" />
                                <span className="text-sm font-medium flex-1">{item.label}</span>
                                {item.badge && (
                                    <span className="min-w-[16px] h-[16px] px-1 rounded-full bg-primary text-primary-text text-[9px] font-semibold flex items-center justify-center">
                                        {item.badge}
                                    </span>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* <hr className="w-full border border-primary-border mb-1" /> */}

                <ul className="w-full flex flex-col py-1">
                    <li>
                        <Link
                            href={HELP_NAV_ITEM.to}
                            onClick={onClose}
                            className="flex items-center gap-3 px-2 py-2 rounded-lg text-foreground-text hover:bg-primary/10 transition-colors"
                        >
                            <Icon name={HELP_NAV_ITEM.icon} width={16} height={16} className="text-secondary-text" />
                            <span className="text-sm font-medium">{HELP_NAV_ITEM.label}</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={LOGOUT_NAV_ITEM.to}
                            onClick={onClose}
                            className="flex items-center gap-3 px-2 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                            <Icon name={LOGOUT_NAV_ITEM.icon} width={16} height={16} className="text-red-400" />
                            <span className="text-sm font-medium">{LOGOUT_NAV_ITEM.label}</span>
                        </Link>
                    </li>
                </ul>

                <hr className="w-full border border-primary-border mb-2.5" />

                <Link
                    href={GET_APP_ITEM.to}
                    onClick={onClose}
                    className="w-full text-center rounded-full border border-white py-2 text-sm font-semibold text-foreground-text hover:text-primary-text hover:bg-white transition-colors"
                >
                    {GET_APP_ITEM.label}
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
