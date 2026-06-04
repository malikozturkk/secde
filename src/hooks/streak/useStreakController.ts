"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { buildLocalDateString } from "@/src/lib/worship-utils";
import { buildDailyPrayersViewModel } from "@/src/lib/streak-utils";
import { PrayerType } from "@/src/types/enums/streak.enums";
import type {
  DailyPrayersQuery,
  PrayerCompletionResult,
  PrayerQuestionsQuery,
} from "@/src/types/streak.types";

import { useDailyPrayers } from "./useDailyPrayers";
import { useSelfStats } from "@/src/hooks/users/useSelfStats";
import { useGamificationAction } from "./useGamificationAction";
import { useNowMs } from "./useNowTicker";

export const useStreakController = () => {
  const todayDate = useMemo(() => buildLocalDateString(new Date()), []);

  const dailyParams = useMemo<DailyPrayersQuery>(
    () => ({ date: todayDate }),
    [todayDate]
  );

  const dailyPrayersQuery = useDailyPrayers(dailyParams);
  const statsQuery = useSelfStats();

  const nowMs = useNowMs();
  const viewModel = useMemo(() => {
    if (!dailyPrayersQuery.data) return null;
    return buildDailyPrayersViewModel(dailyPrayersQuery.data, nowMs);
  }, [dailyPrayersQuery.data, nowMs]);

  const buildQuizParams = (prayerType: PrayerType): PrayerQuestionsQuery => ({
    prayerType,
  });

  const actionMutation = useGamificationAction();
  const [celebration, setCelebration] = useState<PrayerCompletionResult | null>(
    null
  );

  useEffect(() => {
    if (!celebration) return;
    const handle = window.setTimeout(() => setCelebration(null), 1500);
    return () => window.clearTimeout(handle);
  }, [celebration]);

  const refresh = useCallback((): void => {
    void dailyPrayersQuery.refetch();
    void statsQuery.refetch();
  }, [dailyPrayersQuery, statsQuery]);

  const isLoading = dailyPrayersQuery.isPending || statsQuery.isPending;
  const isFetching = dailyPrayersQuery.isFetching || statsQuery.isFetching;
  const error =
    (dailyPrayersQuery.error as Error | null) ??
    (statsQuery.error as Error | null) ??
    null;

  return {
    settings: { date: todayDate },
    viewModel,
    daily: dailyPrayersQuery,
    stats: statsQuery,
    action: actionMutation,
    nowMs,
    celebration,
    setCelebration,
    buildQuizParams,
    refresh,
    isLoading,
    isFetching,
    error,
  };
};
