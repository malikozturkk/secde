"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import { WeekDayState, type WeekDay } from "@/src/types/dashboard.types";
import { Check, Fire, Snowflake } from "@/src/icons/tsx/dashboard";
import { cn } from "@/src/lib/utils";

interface WeekStripProps {
  days: readonly WeekDay[];
  celebrateIndex?: number | null;
  onOpen?: () => void;
}

const DISC_STATE_CLASS: Record<WeekDayState, string> = {
  [WeekDayState.Done]:
    "bg-[var(--ng-flame)] text-white border-2 border-white/25 shadow-[0_4px_0_0_var(--ng-flame-deep)]",
  [WeekDayState.TodayDone]:
    "bg-[var(--ng-flame)] text-white border-2 border-white/40 shadow-[0_4px_0_0_var(--ng-flame-deep)]",
  [WeekDayState.Partial]:
    "bg-[rgba(255,122,41,0.34)] border-2 border-[var(--ng-flame)] text-[var(--ng-gold)]",
  [WeekDayState.Frozen]:
    "bg-[rgba(44,200,255,0.26)] border-2 border-[var(--ng-sky)] text-[var(--ng-sky)] shadow-[0_4px_0_0_var(--ng-sky-deep)]",
  [WeekDayState.Miss]:
    "border-2 border-dashed border-white/20 text-[var(--ng-text-3)] bg-transparent",
  [WeekDayState.TodayPending]: cn(
    "bg-[rgba(255,122,41,0.24)] border-[length:var(--ng-stroke-thick)] border-[var(--ng-flame)] text-[var(--ng-flame)]",
    "animate-[pulse-ring_2s_ease-in-out_infinite]"
  ),
  [WeekDayState.Future]:
    "border-2 border-white/[0.12] bg-white/[0.05] text-[var(--ng-text-3)]",
};

const WeekStripComponent: React.FC<WeekStripProps> = ({
  days,
  celebrateIndex,
  onOpen,
}) => {
  return (
    <div
      role={onOpen ? "button" : "list"}
      tabIndex={onOpen ? 0 : -1}
      aria-label="Bu haftaki seri"
      onClick={onOpen}
      onKeyDown={(event) => {
        if (!onOpen) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen();
        }
      }}
      className={cn(
        "grid grid-cols-7 gap-1.5 rounded-[var(--ng-radius-lg)] p-3.5",
        "border-[length:var(--ng-stroke)] border-[var(--ng-edge)] bg-[var(--ng-surface)]",
        "shadow-[0_6px_0_0_var(--ng-surface-deep)]",
        "transition-transform duration-[var(--motion-press)] ease-[var(--ease-out)]",
        onOpen &&
          "cursor-pointer hover:-translate-y-0.5 active:translate-y-[4px] active:shadow-[0_2px_0_0_var(--ng-surface-deep)]"
      )}
    >
      {days.map((day, idx) => {
        const celebrating = celebrateIndex === idx;
        const showCheck =
          day.state === WeekDayState.Done ||
          day.state === WeekDayState.TodayDone ||
          (celebrating && day.state === WeekDayState.TodayPending);
        const showFire =
          !celebrating && day.state === WeekDayState.TodayPending;
        const showFrozen = day.state === WeekDayState.Frozen;
        const showMiss = day.state === WeekDayState.Miss;
        const showPartial = day.state === WeekDayState.Partial;
        return (
          <div
            key={day.date}
            role={onOpen ? undefined : "listitem"}
            title={
              day.totalCount > 0
                ? `${day.completedCount}/${day.totalCount} vakit`
                : undefined
            }
            className={cn(
              "relative flex flex-col items-center gap-2 rounded-[var(--ng-radius)] px-0.5 py-2",
              day.isToday &&
                "border-[length:var(--ng-stroke)] border-[var(--ng-flame)] bg-[rgba(255,122,41,0.16)]"
            )}
          >
            <span
              className={cn(
                "text-[11px] font-black uppercase tracking-[0.14em]",
                day.isToday ? "text-[var(--ng-flame)]" : "text-[var(--ng-text-3)]"
              )}
            >
              {day.label}
            </span>
            <motion.div
              className={cn(
                "relative grid h-[34px] w-[34px] place-items-center rounded-full sm:h-[42px] sm:w-[42px]",
                DISC_STATE_CLASS[day.state]
              )}
              animate={celebrating ? { scale: [1, 1.2, 1] } : undefined}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            >
              {showCheck && <Check className="h-4 w-4" />}
              {showFire && <Fire className="h-4 w-4" />}
              {showFrozen && <Snowflake className="h-4 w-4" />}
              {showPartial && (
                <span className="font-display text-[13px] tabular-nums">
                  {day.completedCount}
                </span>
              )}
              {showMiss && (
                <span className="text-[11px] font-black" aria-hidden="true">
                  —
                </span>
              )}
            </motion.div>
            <span
              className={cn(
                "font-display text-[13px] tabular-nums",
                day.isToday ? "text-white" : "text-[var(--ng-text-3)]"
              )}
            >
              {day.dayOfMonth}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export const WeekStrip = memo(WeekStripComponent);
