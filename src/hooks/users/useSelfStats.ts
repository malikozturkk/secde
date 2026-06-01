"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { userService } from "@/src/services/user.service";
import {
  SELF_STATS_STALE_TIME_MS,
  USER_STATS_QUERY_KEYS,
} from "@/src/constants/user-stats";
import { retryOnServerError } from "@/src/lib/api-error";
import type { SelfStats } from "@/src/types/user-stats.types";

export const useSelfStats = (
  options: { enabled?: boolean } = {}
): UseQueryResult<SelfStats> => {
  return useQuery<SelfStats>({
    queryKey: USER_STATS_QUERY_KEYS.me(),
    queryFn: async () => {
      const { data } = await userService.getSelfStats();
      const payload = data.data;
      if (!payload) throw new Error("me/stats response missing data");
      return payload;
    },
    staleTime: SELF_STATS_STALE_TIME_MS,
    retry: retryOnServerError(),
    refetchOnWindowFocus: true,
    enabled: options.enabled ?? true,
  });
};
