'use client'
import React from 'react'
import { cn } from "@/lib/utils";

const fullPageOverlayClasses =
  "fixed inset-0 z-1000 flex items-center justify-center bg-black/25 backdrop-blur-sm";

function FullPageSpinnerContent() {
  return (
    <div
      className="relative h-10 w-10"
      style={{ width: 40, height: 40, color: "#ED714D" }}
    >
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-full bg-primary/40 animate-ping"
        style={{
          animationDuration: "2s",
          backgroundColor: "rgba(237, 113, 77, 0.4)",
          borderRadius: "9999px",
        }}
      />
      {/* Ring */}
      <svg
        className="h-10 w-10 animate-spin text-primary"
        width="40"
        height="40"
        viewBox="0 0 48 48"
        style={{ animationDuration: "1s", display: "block", color: "#ED714D" }}
      >
        <circle
          cx="24"
          cy="24"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className="opacity-35"
          opacity="0.35"
        />
        <circle
          cx="24"
          cy="24"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="80 125.6"
        />
      </svg>
    </div>
  );
}

export const PageTransitionLoader = ({
  className = "",
}) => {
  return (
    <div
      className={cn(fullPageOverlayClasses, className)}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.25)",
        backdropFilter: "blur(4px)",
      }}
    >
      <FullPageSpinnerContent />
    </div>
  );
};

export default PageTransitionLoader
