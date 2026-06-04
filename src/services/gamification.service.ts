import { axiosInstance } from "../lib/axios";
import type { ApiResponse } from "@/src/types/api.types";
import type {
  AnswerPrayerQuestionRequest,
  AnswerPrayerQuestionResponse,
  DailyPrayersQuery,
  DailyPrayersResponse,
  GamificationActionRequest,
  GamificationActionResponse,
  PrayerQuestionsQuery,
  PrayerQuestionsResponse,
  StartPrayerQuestionResponse,
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

  startPrayerQuestion: (params: { quizId: string; questionId: string }) =>
    axiosInstance.post<ApiResponse<StartPrayerQuestionResponse>>(
      `/gamification/prayer-questions/${encodeURIComponent(
        params.quizId
      )}/questions/${encodeURIComponent(params.questionId)}/start`
    ),

  answerPrayerQuestion: (params: {
    quizId: string;
    questionId: string;
    payload: AnswerPrayerQuestionRequest;
  }) =>
    axiosInstance.post<ApiResponse<AnswerPrayerQuestionResponse>>(
      `/gamification/prayer-questions/${encodeURIComponent(
        params.quizId
      )}/questions/${encodeURIComponent(params.questionId)}/answer`,
      params.payload
    ),

  postAction: (payload: GamificationActionRequest) =>
    axiosInstance.post<ApiResponse<GamificationActionResponse>>(
      "/gamification/action",
      payload
    ),
};
