"use client";
import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { cn } from "@/lib/utils";
 
/**
 * Reusable dropdown.
 * icon        : lucide icon name
 * label       : placeholder label (shown when value = null/default)
 * options     : string[]
 * value       : currently selected option (string)
 * onChange    : (option) => void
 * defaultValue: the "any / all" sentinel value (first option usually)
 */
const Dropdown = ({ icon, label, options = [], value, onChange, defaultValue }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
 
    const isActive = value && value !== defaultValue;
 
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
 
    return (
        <div ref={ref} className="relative inline-block">
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className={cn(
                    "inline-flex items-center gap-2 h-10 px-4 rounded-2xl border text-sm whitespace-nowrap transition-all cursor-pointer",
                    isActive
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-primary-border bg-sidebar-bg text-foreground-text hover:border-primary/60",
                )}
            >
                {icon && <Icon name={icon} width={15} height={15} className="text-primary" />}
                <span>{isActive ? value : label}</span>
                {isActive && (
                    <span
                        role="button"
                        onClick={(e) => { e.stopPropagation(); onChange?.(defaultValue ?? options[0]); }}
                        className="text-primary hover:text-foreground-text transition-colors"
                    >
                        <Icon name="X" width={13} height={13} />
                    </span>
                )}
                {!isActive && (
                    <Icon name="ChevronDown" width={14} height={14} className={cn("text-primary flex-shrink-0 transition-transform", open && "rotate-180")} />
                )}
            </button>
 
            {open && options.length > 0 && (
                <div className="absolute top-full left-0 mt-2 min-w-[160px] max-w-xs rounded-2xl border border-primary-border bg-sidebar-bg shadow-2xl py-1.5 z-40 max-h-60 overflow-y-auto [scrollbar-width:thin] [scrollbar-color:theme(colors.primary/0.3)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary/30 [&::-webkit-scrollbar-thumb:hover]:bg-primary/60">
                    {options.map((option) => (
                        <button
                            key={option}
                            type="button"
                            onClick={() => { onChange?.(option); setOpen(false); }}
                            className={cn(
                                "w-full text-left px-4 py-2 text-sm transition-colors cursor-pointer flex items-center justify-between gap-2",
                                option === value
                                    ? "text-primary bg-primary/10"
                                    : "text-foreground-text hover:bg-white/5"
                            )}
                        >
                            {option}
                            {option === value && <Icon name="Check" width={13} height={13} className="text-primary flex-shrink-0" />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
 
export default Dropdown;