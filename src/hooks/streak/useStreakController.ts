"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { buildLocalDateString } from "@/src/lib/worship-utils";
import {
  buildDailyPrayersViewModel,
  buildPrayerCompletionRequestId,
} from "@/src/lib/streak-utils";
import {
  GamificationActionType,
  PrayerType,
} from "@/src/types/enums/streak.enums";
import type {
  DailyPrayersQuery,
  GamificationActionResponse,
  PrayerQuestionsQuery,
  QuizAnswer,
} from "@/src/types/streak.types";

import { useDailyPrayers } from "./useDailyPrayers";
import { useSelfStats } from "@/src/hooks/users/useSelfStats";
import { useGamificationAction } from "./useGamificationAction";
import { useNowMs } from "./useNowTicker";

interface CompletePrayerInput {
  prayerType: PrayerType;
  quizId: string;
  answers: QuizAnswer[];
}

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
  const [celebration, setCelebration] = useState<
    GamificationActionResponse["prayerCompletion"] | null
  >(null);

  useEffect(() => {
    if (!celebration) return;
    const handle = window.setTimeout(() => setCelebration(null), 1500);
    return () => window.clearTimeout(handle);
  }, [celebration]);

  const completePrayer = useCallback(
    async (input: CompletePrayerInput) => {
      const requestId = buildPrayerCompletionRequestId(
        input.prayerType,
        todayDate
      );
      const response = await actionMutation.mutateAsync({
        actionType: GamificationActionType.PrayerCompletion,
        prayerType: input.prayerType,
        quizId: input.quizId,
        answers: input.answers,
        clientRequestId: requestId,
      });
      if (response.prayerCompletion) {
        setCelebration(response.prayerCompletion);
      }
      return response;
    },
    [actionMutation, todayDate]
  );

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
    completePrayer,
    buildQuizParams,
    refresh,
    isLoading,
    isFetching,
    error,
  };
};
