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
  streak: "text-[var(--ng-flame)]",
  primary: "text-[var(--ng-green)]",
  violet: "text-[var(--ng-violet)]",
  ice: "text-[var(--ng-sky)]",
  gold: "text-[var(--ng-gold)]",
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
        "flex flex-col items-start gap-1 rounded-[var(--ng-radius)] px-3.5 py-3 text-left",
        "border-[length:var(--ng-stroke)] border-[var(--ng-edge)] bg-[var(--ng-surface-high)]",
        interactive &&
          "cursor-pointer transition-[transform,background-color] duration-[var(--motion-press)] ease-[var(--ease-out)] hover:bg-white/[0.06] active:translate-y-[2px]",
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
      <span className="text-[10px] font-black uppercase tracking-[0.10em] text-[var(--ng-text-3)]">
        {label}
      </span>
    </Element>
  );
};

export const StatTile = memo(StatTileComponent);
