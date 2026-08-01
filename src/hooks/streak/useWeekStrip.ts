"use client";

import { useMemo } from "react";
import { buildWeekStrip } from "@/src/lib/dashboard-utils";
import type { WeekDay } from "@/src/types/dashboard.types";
import type { PrayerHistoryDay } from "@/src/types/streak.types";

interface UseWeekStripInput {
  history: readonly PrayerHistoryDay[];
  completedToday: number;
  totalToday: number;
  today?: Date;
}

export const useWeekStrip = ({
  history,
  completedToday,
  totalToday,
  today,
}: UseWeekStripInput): readonly WeekDay[] => {
  return useMemo(
    () =>
      buildWeekStrip({
        history,
        completedToday,
        totalToday,
        today,
      }),
    [history, completedToday, totalToday, today]
  );
};
