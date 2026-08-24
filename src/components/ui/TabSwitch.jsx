"use client";
import { cn } from "@/lib/utils";

/**
 * TabSwitch — pill-style tab switcher.
 *
 * Props:
 *   tabs:      string[]          — tab labels
 *   active:    string            — currently active tab label
 *   onChange:  (tab: string) => void
 *   className: string?           — extra class on the wrapper
 *   size:      "sm" | "md"       — default "md"
 */
const TabSwitch = ({ tabs = [], active, onChange, className, size = "md" }) => {
  const padClass = size === "sm" ? "px-4 py-1.5 text-xs" : "px-7 py-2.5 text-sm";

  return (
    <div
      className={cn(
        "inline-flex rounded-full p-1 gap-1 bg-sidebar-bg border border-primary/20",
        className
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onChange?.(tab)}
          className={cn(
            "rounded-full font-semibold transition-all cursor-pointer whitespace-nowrap",
            padClass,
            active === tab
              ? "bg-primary text-primary-text"
              : "text-muted-text hover:text-primary"
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabSwitch;
