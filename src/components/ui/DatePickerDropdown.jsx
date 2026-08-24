'use client';
import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { cn } from "@/lib/utils";

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay();
}

/**
 * value: Date | null
 * onChange: (Date | null) => void
 */
const DatePickerDropdown = ({ value, onChange }) => {
    const today = new Date();
    const [open, setOpen] = useState(false);
    const [viewYear, setViewYear] = useState((value || today).getFullYear());
    const [viewMonth, setViewMonth] = useState((value || today).getMonth());
    const ref = useRef(null);

    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

    const prevMonth = () => {
        if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
        else setViewMonth(m => m - 1);
    };
    const nextMonth = () => {
        if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
        else setViewMonth(m => m + 1);
    };

    const selectDay = (day) => {
        const d = new Date(viewYear, viewMonth, day);
        onChange?.(d);
        setOpen(false);
    };

    const isSelected = (day) => {
        if (!value) return false;
        return value.getFullYear() === viewYear && value.getMonth() === viewMonth && value.getDate() === day;
    };
    const isToday = (day) => {
        return today.getFullYear() === viewYear && today.getMonth() === viewMonth && today.getDate() === day;
    };
    const isPast = (day) => {
        const d = new Date(viewYear, viewMonth, day);
        d.setHours(0,0,0,0);
        const t = new Date(); t.setHours(0,0,0,0);
        return d < t;
    };

    const displayLabel = value
        ? `${value.getDate()} ${MONTHS[value.getMonth()]} ${value.getFullYear()}`
        : "Any Date";

    const isActive = !!value;

    return (
        <div ref={ref} className="relative inline-block">
            <button
                type="button"
                onClick={() => setOpen(p => !p)}
                className={cn(
                    "inline-flex items-center gap-2 h-10 px-4 rounded-2xl border text-sm whitespace-nowrap transition-all cursor-pointer",
                    isActive
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-primary-border bg-sidebar-bg text-foreground-text hover:border-primary/60"
                )}
            >
                <Icon name="Calendar" width={15} height={15} className="text-primary" />
                <span>{displayLabel}</span>
                {isActive ? (
                    <span
                        role="button"
                        onClick={(e) => { e.stopPropagation(); onChange?.(null); }}
                        className="text-primary hover:text-foreground-text transition-colors"
                    >
                        <Icon name="X" width={13} height={13} />
                    </span>
                ) : (
                    <Icon name="ChevronDown" width={14} height={14} className={cn("text-muted-text transition-transform", open && "rotate-180")} />
                )}
            </button>

            {open && (
                <div className="absolute top-full left-0 mt-2 rounded-2xl border border-primary-border bg-sidebar-bg shadow-2xl p-4 z-50 w-64">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                        <button type="button" onClick={prevMonth} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 cursor-pointer text-muted-text hover:text-foreground-text transition-colors">
                            <Icon name="ChevronLeft" width={15} height={15} />
                        </button>
                        <span className="text-sm font-semibold text-foreground-text">
                            {MONTHS[viewMonth]} {viewYear}
                        </span>
                        <button type="button" onClick={nextMonth} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 cursor-pointer text-muted-text hover:text-foreground-text transition-colors">
                            <Icon name="ChevronRight" width={15} height={15} />
                        </button>
                    </div>

                    {/* Day headers */}
                    <div className="grid grid-cols-7 mb-1">
                        {DAYS.map(d => (
                            <div key={d} className="text-center text-[10px] font-medium text-muted-text py-1">{d}</div>
                        ))}
                    </div>

                    {/* Day grid */}
                    <div className="grid grid-cols-7 gap-y-0.5">
                        {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                            const day = i + 1;
                            const past = isPast(day);
                            const sel = isSelected(day);
                            const tod = isToday(day);
                            return (
                                <button
                                    key={day}
                                    type="button"
                                    disabled={past}
                                    onClick={() => selectDay(day)}
                                    className={cn(
                                        "h-8 w-full flex items-center justify-center text-xs rounded-lg transition-colors cursor-pointer",
                                        sel && "bg-primary text-primary-text font-semibold",
                                        !sel && tod && "border border-primary text-primary",
                                        !sel && !tod && !past && "text-foreground-text hover:bg-primary/20",
                                        past && "text-muted-text/40 cursor-not-allowed"
                                    )}
                                >
                                    {day}
                                </button>
                            );
                        })}
                    </div>

                    {/* Clear */}
                    {value && (
                        <button
                            type="button"
                            onClick={() => { onChange?.(null); setOpen(false); }}
                            className="mt-3 w-full text-xs text-muted-text hover:text-primary transition-colors text-center cursor-pointer"
                        >
                            Clear date
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default DatePickerDropdown;
