"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { gamificationService } from "@/src/services/gamification.service";
import {
  DAILY_PRAYERS_REFRESH_INTERVAL_MS,
  DAILY_PRAYERS_STALE_TIME_MS,
  GAMIFICATION_QUERY_KEYS,
} from "@/src/constants/streak";
import type {
  DailyPrayersQuery,
  DailyPrayersResponse,
} from "@/src/types";

export const useDailyPrayers = (
  params: DailyPrayersQuery | null
): UseQueryResult<DailyPrayersResponse> => {
  return useQuery<DailyPrayersResponse>({
    queryKey: params
      ? GAMIFICATION_QUERY_KEYS.dailyPrayers(params)
      : ["gamification", "daily-prayers", "disabled"],
    queryFn: async () => {
      if (!params) throw new Error("Daily-prayers query params are required");
      const { data } = await gamificationService.getDailyPrayers(params);
      const payload = data.data;
      if (!payload) throw new Error("Daily-prayers response missing data");
      return payload;
    },
    enabled: params !== null,
    staleTime: DAILY_PRAYERS_STALE_TIME_MS,
    refetchInterval: DAILY_PRAYERS_REFRESH_INTERVAL_MS,
    refetchOnWindowFocus: true,
  });
};
