"use client";

import React, { memo } from "react";
import {
  MonthCellKind,
  type MonthCell as MonthCellModel,
} from "@/src/types/dashboard.types";
import { MONTH_LEVEL_CLASS } from "../styles";
import { cn } from "@/src/lib/utils";

interface MonthCellViewProps {
  cell: MonthCellModel;
}

const MonthCellComponent: React.FC<MonthCellViewProps> = ({ cell }) => {
  if (cell.kind === MonthCellKind.Empty) {
    return <div aria-hidden="true" className="aspect-square bg-transparent" />;
  }
  if (cell.kind === MonthCellKind.Future) {
    return (
      <div
        aria-label="Gelecek"
        className="grid aspect-square place-items-center rounded-[10px] border border-dashed border-white/[0.06] bg-white/[0.03] text-[11px] font-black tabular-nums text-white/20"
      >
        {cell.day}
      </div>
    );
  }
  if (cell.kind === MonthCellKind.Frozen) {
    return (
      <div
        title={`${cell.day} · Seri dondurma kullanıldı`}
        className={cn(
          "relative grid aspect-square place-items-center rounded-[10px]",
          "border border-[var(--color-accent)] bg-[rgba(79,195,247,0.20)]",
          "text-[11px] font-black tabular-nums text-[#BAE6FD]",
          "shadow-[0_3px_0_0_rgba(7,47,75,0.5)]"
        )}
      >
        <span
          aria-hidden="true"
          className="absolute right-1 top-px text-[8px] text-[#BAE6FD]"
        >
          ❄
        </span>
        {cell.day}
      </div>
    );
  }
  const level = Math.min(5, Math.max(0, cell.level)) as 0 | 1 | 2 | 3 | 4 | 5;
  return (
    <div
      title={`${cell.day} · ${cell.level}/5 vakit`}
      className={cn(
        "relative grid aspect-square place-items-center rounded-[10px]",
        "text-[11px] font-black tabular-nums transition-transform duration-150",
        "hover:z-[2] hover:scale-110",
        MONTH_LEVEL_CLASS[level],
        cell.kind === MonthCellKind.Today &&
          "outline outline-2 outline-offset-2 outline-[#FF6B35] z-[1]",
        cell.perfect &&
          "after:absolute after:bottom-0 after:right-1 after:text-[8px] after:text-white/85 after:content-['★']"
      )}
    >
      {cell.day}
    </div>
  );
};

export const MonthCell = memo(MonthCellComponent);
