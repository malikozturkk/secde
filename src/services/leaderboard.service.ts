import { axiosInstance } from "../lib/axios";
import type { ApiResponse } from "@/src/types/api.types";
import type {
  LeaderboardData,
  LeaderboardQuery,
} from "@/src/types/leaderboard.types";

export const leaderboardService = {
  get: (params: LeaderboardQuery) =>
    axiosInstance.get<ApiResponse<LeaderboardData>>("/leaderboard", {
      params: {
        ...(params.metric && { metric: params.metric }),
        ...(params.scope && { scope: params.scope }),
        ...(params.period && { period: params.period }),
        ...(params.limit && { limit: params.limit }),
      },
    }),
};
