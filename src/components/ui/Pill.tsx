"use client";

import React from "react";
import { cn } from "@/src/lib/utils";
import { ACCENT } from "@/src/constants/surface";

export type PillTone =
  | "neutral"
  | "primary"
  | "secondary"
  | "accent"
  | "streak"
  | "violet"
  | "success"
  | "danger";

type PillSize = "xs" | "sm" | "md";

interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: PillTone;
  size?: PillSize;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  isCounter?: boolean;
  children: React.ReactNode;
}

const TONE_CLASSES: Record<PillTone, string> = {
  neutral: "bg-white/[0.07] border-[var(--ng-edge-strong)] text-[var(--ng-text-2)]",
  primary: ACCENT.green.chip,
  secondary: ACCENT.gold.chip,
  accent: ACCENT.sky.chip,
  streak: ACCENT.flame.chip,
  violet: ACCENT.violet.chip,
  success: ACCENT.green.chip,
  danger: ACCENT.rose.chip,
};

const SIZE_CLASSES: Record<PillSize, string> = {
  xs: "px-2 py-0.5 text-[10px] tracking-[0.10em]",
  sm: "px-2.5 py-1 text-[11px] tracking-[0.10em]",
  md: "px-3 py-1.5 text-[12px] tracking-[0.10em]",
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
          "inline-flex items-center gap-1.5 rounded-full font-black uppercase whitespace-nowrap",
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
