"use client";
import { cn } from "@/lib/utils";

/**
 * Simple controlled toggle switch.
 * checked: boolean
 * onChange: (next: boolean) => void
 */
const Toggle = ({ checked, onChange, disabled, className }) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
        checked ? "bg-primary" : "bg-[#3A3D52]",
        className
      )}
    >
      <span
        className={cn(
          "inline-block h-[18px] w-[18px] transform rounded-full bg-white transition-transform",
          checked ? "translate-x-[22px]" : "translate-x-[3px]"
        )}
      />
    </button>
  );
};

export default Toggle;
