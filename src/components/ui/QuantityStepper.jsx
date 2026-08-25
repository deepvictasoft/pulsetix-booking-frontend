"use client";
import { cn } from "@/lib/utils";

/**
 * Small -/+ quantity control.
 * value: number, onChange: (next) => void
 */
const QuantityStepper = ({ value, onChange, min = 0, max = 20 }) => {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));

  return (
    <div className="flex items-center gap-3 rounded-full border border-primary-border bg-background/60 px-1 h-9">
      <button
        type="button"
        onClick={dec}
        disabled={value <= min}
        aria-label="Decrease"
        className={cn(
          "w-7 h-7 rounded-full flex items-center justify-center text-foreground-text hover:bg-white/10 transition-colors",
          value <= min && "opacity-40 cursor-not-allowed hover:bg-transparent"
        )}
      >
        <span className="text-base leading-none">−</span>
      </button>
      <span className="w-4 text-center text-sm font-semibold text-foreground-text tabular-nums">{value}</span>
      <button
        type="button"
        onClick={inc}
        disabled={value >= max}
        aria-label="Increase"
        className={cn(
          "w-7 h-7 rounded-full flex items-center justify-center text-foreground-text hover:bg-white/10 transition-colors",
          value >= max && "opacity-40 cursor-not-allowed hover:bg-transparent"
        )}
      >
        <span className="text-base leading-none">+</span>
      </button>
    </div>
  );
};

export default QuantityStepper;
