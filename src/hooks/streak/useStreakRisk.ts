"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { gamificationService } from "@/src/services/gamification.service";
import {
  GAMIFICATION_QUERY_KEYS,
  STREAK_RISK_STALE_TIME_MS,
} from "@/src/constants/streak";
import type { StreakRiskAssessment } from "@/src/types/streak.types";

export const useStreakRisk = (
  enabled: boolean
): UseQueryResult<StreakRiskAssessment> => {
  return useQuery<StreakRiskAssessment>({
    queryKey: enabled
      ? GAMIFICATION_QUERY_KEYS.streakRisk()
      : ["gamification", "streak-risk", "disabled"],
    queryFn: async () => {
      const { data } = await gamificationService.getStreakRisk();
      const payload = data.data;
      if (!payload) throw new Error("Streak-risk response missing data");
      return payload;
    },
    enabled,
    staleTime: STREAK_RISK_STALE_TIME_MS,
    refetchOnWindowFocus: true,
  });
};
