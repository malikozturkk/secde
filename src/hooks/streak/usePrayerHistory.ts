"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { gamificationService } from "@/src/services/gamification.service";
import {
  GAMIFICATION_QUERY_KEYS,
  PRAYER_HISTORY_STALE_TIME_MS,
} from "@/src/constants/streak";
import type {
  PrayerHistoryQuery,
  PrayerHistoryResponse,
} from "@/src/types/streak.types";

export const usePrayerHistory = (
  params: PrayerHistoryQuery | null
): UseQueryResult<PrayerHistoryResponse> => {
  return useQuery<PrayerHistoryResponse>({
    queryKey: params
      ? GAMIFICATION_QUERY_KEYS.prayerHistory(params)
      : ["gamification", "prayer-history", "disabled"],
    queryFn: async () => {
      if (!params) throw new Error("Prayer-history query params are required");
      const { data } = await gamificationService.getPrayerHistory(params);
      const payload = data.data;
      if (!payload) throw new Error("Prayer-history response missing data");
      return payload;
    },
    enabled: params !== null,
    staleTime: PRAYER_HISTORY_STALE_TIME_MS,
  });
};
