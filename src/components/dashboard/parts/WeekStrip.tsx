"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import { WeekDayState, type WeekDay } from "@/src/types/dashboard.types";
import { CheckIcon, FireIcon, SnowflakeIcon } from "../icons";
import { cn } from "@/src/lib/utils";

interface WeekStripProps {
  days: readonly WeekDay[];
  celebrateIndex?: number | null;
  onOpen?: () => void;
}

const DISC_STATE_CLASS: Record<WeekDayState, string> = {
  [WeekDayState.Done]: "bg-[#FF6B35] text-white shadow-[0_3px_0_0_#7A2A0D]",
  [WeekDayState.TodayDone]:
    "bg-[#FF6B35] text-white shadow-[0_3px_0_0_#7A2A0D]",
  [WeekDayState.Frozen]:
    "bg-[rgba(79,195,247,0.20)] border-2 border-[#4FC3F7] text-[#4FC3F7]",
  [WeekDayState.Miss]:
    "border-2 border-dashed border-white/15 text-white/25 bg-transparent",
  [WeekDayState.TodayPending]: cn(
    "bg-[rgba(255,107,53,0.18)] border-2 border-[#FF6B35] text-[#FF6B35]",
    "animate-[pulse-ring_2s_ease-in-out_infinite]"
  ),
  [WeekDayState.Future]:
    "border-2 border-white/[0.08] bg-white/[0.05] text-white/20",
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
        "grid grid-cols-7 gap-1.5 rounded-3xl border border-white/[0.06] bg-[#1C2E35] p-3 transition-transform duration-100",
        onOpen && "cursor-pointer hover:-translate-y-px"
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
        return (
          <div
            key={day.date}
            role={onOpen ? undefined : "listitem"}
            className={cn(
              "relative flex flex-col items-center gap-1.5 rounded-2xl px-0.5 py-1.5",
              day.isToday &&
                "border-[1.5px] border-[rgba(255,107,53,0.35)] bg-[rgba(255,107,53,0.10)]"
            )}
          >
            <span
              className={cn(
                "text-[10px] font-black uppercase tracking-[0.12em]",
                day.isToday ? "text-[#FF6B35]" : "text-white/35"
              )}
            >
              {day.label}
            </span>
            <motion.div
              className={cn(
                "relative grid h-[30px] w-[30px] place-items-center rounded-full sm:h-[36px] sm:w-[36px]",
                DISC_STATE_CLASS[day.state]
              )}
              animate={celebrating ? { scale: [1, 1.2, 1] } : undefined}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            >
              {showCheck && <CheckIcon className="h-[14px] w-[14px]" />}
              {showFire && <FireIcon className="h-[14px] w-[14px]" />}
              {showFrozen && <SnowflakeIcon className="h-[13px] w-[13px]" />}
              {showMiss && (
                <span className="text-[11px] font-black" aria-hidden="true">
                  —
                </span>
              )}
            </motion.div>
            <span
              className={cn(
                "text-[11px] font-black tabular-nums",
                day.isToday ? "text-white" : "text-white/35"
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
