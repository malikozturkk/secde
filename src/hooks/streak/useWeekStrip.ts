"use client";

import { useMemo } from "react";
import { buildWeekStrip } from "@/src/lib/dashboard-utils";
import type { WeekDay } from "@/src/types/dashboard.types";

interface UseWeekStripInput {
  currentStreak: number;
  lastActiveDate: string | null;
  protectedDates: readonly string[];
  completedToday: number;
  totalToday: number;
  today?: Date;
}

export const useWeekStrip = ({
  currentStreak,
  lastActiveDate,
  protectedDates,
  completedToday,
  totalToday,
  today,
}: UseWeekStripInput): readonly WeekDay[] => {
  return useMemo(
    () =>
      buildWeekStrip({
        currentStreak,
        lastActiveDate,
        protectedDates,
        completedToday,
        totalToday,
        today,
      }),
    [
      currentStreak,
      lastActiveDate,
      protectedDates,
      completedToday,
      totalToday,
      today,
    ]
  );
};
