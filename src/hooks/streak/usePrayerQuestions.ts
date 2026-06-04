"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { gamificationService } from "@/src/services/gamification.service";
import { GAMIFICATION_QUERY_KEYS } from "@/src/constants/streak";
import type {
  PrayerQuestionsQuery,
  PrayerQuestionsResponse,
} from "@/src/types/streak.types";

export const isPrayerQuestionsExpired = (
  payload: PrayerQuestionsResponse | undefined,
  now: number = Date.now()
): boolean => {
  if (!payload?.expiresAt) return false;
  const expiresMs = Date.parse(payload.expiresAt);
  return Number.isFinite(expiresMs) && expiresMs <= now;
};

export const usePrayerQuestions = (
  params: PrayerQuestionsQuery | null
): UseQueryResult<PrayerQuestionsResponse> => {
  return useQuery<PrayerQuestionsResponse>({
    queryKey: params
      ? GAMIFICATION_QUERY_KEYS.prayerQuestions({
          prayerType: params.prayerType,
        })
      : ["gamification", "prayer-questions", "disabled"],
    queryFn: async () => {
      if (!params) throw new Error("Prayer-questions query params required");
      const { data } = await gamificationService.getPrayerQuestions(params);
      const payload = data.data;
      if (!payload) throw new Error("Prayer-questions response missing data");
      return payload;
    },
    enabled: params !== null,
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: false,
    retry: false,
  });
};
