"use client";

import React, { memo } from "react";
import { cn } from "@/src/lib/utils";

type StatTileTone =
  | "default"
  | "streak"
  | "primary"
  | "violet"
  | "ice"
  | "gold";

interface StatTileProps {
  value: React.ReactNode;
  label: string;
  icon?: React.ReactNode;
  tone?: StatTileTone;
  size?: "sm" | "md";
  onClick?: () => void;
  className?: string;
}

const VALUE_TONE: Record<StatTileTone, string> = {
  default: "text-white",
  streak: "text-[var(--color-streak)]",
  primary: "text-[var(--color-primary-light)]",
  violet: "text-[#C7B9FF]",
  ice: "text-[#9AE0FF]",
  gold: "text-[var(--color-secondary-light)]",
};

const StatTileComponent: React.FC<StatTileProps> = ({
  value,
  label,
  icon,
  tone = "default",
  size = "md",
  onClick,
  className,
}) => {
  const interactive = typeof onClick === "function";
  const Element = interactive ? "button" : "div";
  return (
    <Element
      type={interactive ? "button" : undefined}
      onClick={onClick}
      className={cn(
        "flex flex-col items-start gap-0.5 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-3.5 py-3 text-left",
        interactive &&
          "cursor-pointer transition-transform duration-100 hover:bg-white/[0.06] active:translate-y-[2px]",
        className
      )}
    >
      <span className="flex items-center gap-1.5">
        {icon && (
          <span className={cn("inline-flex", VALUE_TONE[tone])}>{icon}</span>
        )}
        <span
          className={cn(
            "font-display tabular-nums leading-none",
            size === "md" ? "text-[26px]" : "text-[20px]",
            VALUE_TONE[tone]
          )}
        >
          {value}
        </span>
      </span>
      <span className="text-[10px] font-black uppercase tracking-[0.10em] text-white/45">
        {label}
      </span>
    </Element>
  );
};

export const StatTile = memo(StatTileComponent);
