"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/src/lib/utils";
import { MOTION_REDUCED, MOTION_SPRING } from "@/src/constants/motion";

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
    "bg-gradient-to-r from-[var(--ng-green)] to-[var(--ng-green)]",
  secondary:
    "bg-gradient-to-r from-[var(--ng-gold)] to-[var(--ng-gold)]",
  streak:
    "bg-gradient-to-r from-[var(--ng-flame)] to-[var(--ng-gold)]",
  violet: "bg-gradient-to-r from-[#6D5DFA] to-[var(--ng-violet)]",
  accent: "bg-gradient-to-r from-[#0EA5E9] to-[#7DD3FC]",
};

const FILL_GLOW: Record<ProgressTone, string> = {
  primary: "shadow-[0_0_10px_rgba(23,217,160,0.5)]",
  secondary: "shadow-[0_0_10px_rgba(255,199,44,0.5)]",
  streak: "shadow-[0_0_10px_rgba(255,122,41,0.5)]",
  violet: "shadow-[0_0_12px_rgba(169,139,255,0.6)]",
  accent: "shadow-[0_0_10px_rgba(44,200,255,0.5)]",
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
  const prefersReduced = useReducedMotion();
  return (
    <div
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={safeValue}
      className={cn(
        "relative w-full overflow-hidden rounded-full border border-[var(--ng-edge)] bg-white/[0.06]",
        TRACK_HEIGHT[size],
        className
      )}
    >
      <motion.div
        className={cn(
          "relative h-full w-full origin-left rounded-full will-change-transform",
          FILL_BG[tone],
          FILL_GLOW[tone],
          shiny &&
            "after:absolute after:inset-x-0 after:top-0 after:h-1/2 after:rounded-full after:bg-gradient-to-b after:from-white/30 after:to-transparent after:content-['']",
          fillClassName
        )}
        initial={false}
        animate={{ scaleX: safeValue / 100 }}
        transition={prefersReduced ? MOTION_REDUCED : MOTION_SPRING.ui}
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
