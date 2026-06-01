"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { userService } from "@/src/services/user.service";
import {
  USER_STATS_QUERY_KEYS,
  USER_STATS_STALE_TIME_MS,
} from "@/src/constants/user-stats";
import { retryOnServerError } from "@/src/lib/api-error";
import type { PublicStats } from "@/src/types/user-stats.types";

export const useUserStats = (username: string): UseQueryResult<PublicStats> => {
  return useQuery<PublicStats>({
    queryKey: USER_STATS_QUERY_KEYS.user(username),
    queryFn: async () => {
      const { data } = await userService.getUserStats(username);
      const payload = data.data;
      if (!payload) throw new Error("user/stats response missing data");
      return payload;
    },
    enabled: !!username,
    staleTime: USER_STATS_STALE_TIME_MS,
    retry: retryOnServerError(),
  });
};
