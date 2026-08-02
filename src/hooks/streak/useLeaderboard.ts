"use client";

import { useQuery } from "@tanstack/react-query";
import { leaderboardService } from "@/src/services/leaderboard.service";
import {
  LEADERBOARD_QUERY_KEYS,
  LEADERBOARD_STALE_TIME_MS,
} from "@/src/constants/leaderboard";
import type {
  LeaderboardData,
  LeaderboardQuery,
} from "@/src/types/leaderboard.types";

export const useLeaderboard = (params: LeaderboardQuery = {}) =>
  useQuery<LeaderboardData>({
    queryKey: LEADERBOARD_QUERY_KEYS.list(params),
    queryFn: async () => {
      const response = await leaderboardService.get(params);
      const data = response.data.data;
      if (!data) throw new Error("Leaderboard response missing data");
      return data;
    },
    staleTime: LEADERBOARD_STALE_TIME_MS,
  });
