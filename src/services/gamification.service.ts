import { axiosInstance } from "../lib/axios";
import type {
  ApiResponse,
  DailyPrayersQuery,
  DailyPrayersResponse,
  GamificationActionRequest,
  GamificationActionResponse,
  PrayerQuestionsQuery,
  PrayerQuestionsResponse,
} from "../types";

export const gamificationService = {
  getDailyPrayers: (params: DailyPrayersQuery) =>
    axiosInstance.get<ApiResponse<DailyPrayersResponse>>(
      "/gamification/daily-prayers",
      {
        params: {
          lat: params.lat,
          lng: params.lng,
          date: params.date,
          tz: params.tz,
          ...(params.method ? { method: params.method } : {}),
          ...(params.madhab ? { madhab: params.madhab } : {}),
        },
      }
    ),

  getPrayerQuestions: (params: PrayerQuestionsQuery) =>
    axiosInstance.get<ApiResponse<PrayerQuestionsResponse>>(
      `/gamification/prayer-questions/${encodeURIComponent(params.prayerType)}`,
      {
        params: {
          lat: params.lat,
          lng: params.lng,
          tz: params.tz,
          ...(params.method ? { method: params.method } : {}),
          ...(params.madhab ? { madhab: params.madhab } : {}),
        },
      }
    ),

  postAction: (payload: GamificationActionRequest) =>
    axiosInstance.post<ApiResponse<GamificationActionResponse>>(
      "/gamification/action",
      payload
    ),
};
