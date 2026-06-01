"use client";

import React from "react";
import { cn } from "@/src/lib/utils";

export type PillTone =
  | "neutral"
  | "primary"
  | "secondary"
  | "accent"
  | "streak"
  | "violet"
  | "success"
  | "danger";

export type PillSize = "xs" | "sm" | "md";

interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: PillTone;
  size?: PillSize;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  isCounter?: boolean;
  children: React.ReactNode;
}

const TONE_CLASSES: Record<PillTone, string> = {
  neutral: "bg-white/[0.06] border-white/10 text-[var(--color-text-muted)]",
  primary:
    "bg-[rgba(37,180,154,0.18)] border-[rgba(37,180,154,0.40)] text-[var(--color-primary-light)]",
  secondary:
    "bg-[rgba(245,166,35,0.18)] border-[rgba(245,166,35,0.40)] text-[var(--color-secondary-light)]",
  accent:
    "bg-[rgba(79,195,247,0.18)] border-[rgba(79,195,247,0.40)] text-[#9AE0FF]",
  streak:
    "bg-[rgba(255,107,53,0.20)] border-[rgba(255,107,53,0.45)] text-[var(--color-streak)]",
  violet:
    "bg-[rgba(124,109,255,0.18)] border-[rgba(124,109,255,0.40)] text-[#C7B9FF]",
  success:
    "bg-[rgba(5,150,105,0.20)] border-[rgba(5,150,105,0.45)] text-[#6EE7B7]",
  danger:
    "bg-[rgba(239,68,68,0.15)] border-[rgba(239,68,68,0.35)] text-[#FCA5A5]",
};

const SIZE_CLASSES: Record<PillSize, string> = {
  xs: "px-2 py-0.5 text-[9px] tracking-[0.10em]",
  sm: "px-2.5 py-1 text-[10px] tracking-[0.10em]",
  md: "px-3 py-1.5 text-[11px] tracking-[0.10em]",
};

export const Pill = React.forwardRef<HTMLSpanElement, PillProps>(
  (
    {
      tone = "neutral",
      size = "sm",
      icon,
      iconPosition = "left",
      isCounter,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border font-black uppercase whitespace-nowrap",
          TONE_CLASSES[tone],
          SIZE_CLASSES[size],
          isCounter && "tabular-nums",
          icon && iconPosition === "right" && "flex-row-reverse",
          className
        )}
        {...rest}
      >
        {icon && <span className="inline-flex shrink-0">{icon}</span>}
        <span>{children}</span>
      </span>
    );
  }
);

Pill.displayName = "Pill";
