import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatEventDate(date) {
    return `${DAY_NAMES[date.getDay()]} ${date.getDate()} ${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
}

function formatEventTime(date) {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const suffix = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

/**
 * Takes a display date string like "3 Aug 2026 · 7:30 PM" and derives a
 * start/end schedule (defaults the event length to 3 hours).
 */
export function deriveEventSchedule(dateLabel, durationHours = 3) {
    const [datePart, timePart] = dateLabel.split("·").map((s) => s.trim());
    const start = new Date(`${datePart} ${timePart}`);
    const valid = !isNaN(start.getTime());
    const end = valid ? new Date(start.getTime() + durationHours * 60 * 60 * 1000) : null;

    return {
        startDate: valid ? start : null,
        endDate: end,
        startLabel: valid ? `${formatEventDate(start)} at ${formatEventTime(start)}` : dateLabel,
        endLabel: valid ? `${formatEventDate(end)} at ${formatEventTime(end)}` : dateLabel,
        startTime: valid ? formatEventTime(start) : "",
        endTime: valid ? formatEventTime(end) : "",
    };
}

export function slugify(text) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}
