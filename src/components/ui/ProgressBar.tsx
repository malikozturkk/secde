"use client";

import React from "react";
import { cn } from "@/src/lib/utils";

type ProgressTone = "primary" | "secondary" | "streak" | "violet" | "accent";

interface ProgressBarProps {
  value: number;
  tone?: ProgressTone;
  ticks?: readonly number[];
  size?: "xs" | "sm" | "md";
  shiny?: boolean;
  className?: string;
  fillClassName?: string;
  "aria-label"?: string;
}

const TRACK_HEIGHT: Record<NonNullable<ProgressBarProps["size"]>, string> = {
  xs: "h-1.5",
  sm: "h-2.5",
  md: "h-3.5",
};

const FILL_BG: Record<ProgressTone, string> = {
  primary:
    "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)]",
  secondary:
    "bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-secondary-light)]",
  streak:
    "bg-gradient-to-r from-[var(--color-streak)] to-[var(--color-secondary)]",
  violet: "bg-gradient-to-r from-[#6D5DFA] to-[#C7B9FF]",
  accent: "bg-gradient-to-r from-[#0EA5E9] to-[#7DD3FC]",
};

const FILL_GLOW: Record<ProgressTone, string> = {
  primary: "shadow-[0_0_10px_rgba(37,180,154,0.5)]",
  secondary: "shadow-[0_0_10px_rgba(245,166,35,0.5)]",
  streak: "shadow-[0_0_10px_rgba(255,107,53,0.5)]",
  violet: "shadow-[0_0_12px_rgba(124,109,255,0.6)]",
  accent: "shadow-[0_0_10px_rgba(79,195,247,0.5)]",
};

const clamp = (n: number): number => Math.max(0, Math.min(100, n));

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  tone = "primary",
  ticks,
  size = "sm",
  shiny = true,
  className,
  fillClassName,
  "aria-label": ariaLabel,
}) => {
  const safeValue = clamp(value);
  return (
    <div
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={safeValue}
      className={cn(
        "relative w-full overflow-hidden rounded-full border border-white/[0.04] bg-white/[0.06]",
        TRACK_HEIGHT[size],
        className
      )}
    >
      <div
        className={cn(
          "relative h-full rounded-full transition-[width] duration-[700ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          FILL_BG[tone],
          FILL_GLOW[tone],
          shiny &&
            "after:absolute after:inset-x-0 after:top-0 after:h-1/2 after:rounded-full after:bg-gradient-to-b after:from-white/30 after:to-transparent after:content-['']",
          fillClassName
        )}
        style={{ width: `${safeValue}%` }}
      />
      {ticks?.map((position) => (
        <span
          key={position}
          aria-hidden="true"
          className="pointer-events-none absolute top-[-2px] h-[calc(100%+4px)] w-0.5 -translate-x-1/2 bg-white/[0.10]"
          style={{ left: `${clamp(position)}%` }}
        />
      ))}
    </div>
  );
};
