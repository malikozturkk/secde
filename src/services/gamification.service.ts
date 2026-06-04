import { axiosInstance } from "../lib/axios";
import type { ApiResponse } from "@/src/types/api.types";
import type {
  DailyPrayersQuery,
  DailyPrayersResponse,
  GamificationActionRequest,
  GamificationActionResponse,
  PrayerQuestionsQuery,
  PrayerQuestionsResponse,
} from "@/src/types/streak.types";

export const gamificationService = {
  getDailyPrayers: (params: DailyPrayersQuery) =>
    axiosInstance.get<ApiResponse<DailyPrayersResponse>>(
      "/gamification/daily-prayers",
      {
        params: {
          date: params.date,
        },
      }
    ),

  getPrayerQuestions: (params: PrayerQuestionsQuery) =>
    axiosInstance.get<ApiResponse<PrayerQuestionsResponse>>(
      `/gamification/prayer-questions/${encodeURIComponent(params.prayerType)}`
    ),

  postAction: (payload: GamificationActionRequest) =>
    axiosInstance.post<ApiResponse<GamificationActionResponse>>(
      "/gamification/action",
      payload
    ),
};
