"use client";

import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from "@tanstack/react-query";
import { gamificationService } from "@/src/services/gamification.service";
import { GAMIFICATION_QUERY_KEYS } from "@/src/constants/streak";
import type {
  PrayerQuestionsResponse,
  StartPrayerQuestionResponse,
} from "@/src/types/streak.types";
import type { PrayerType } from "@/src/types/enums/streak.enums";

interface StartPrayerQuestionVariables {
  prayerType: PrayerType;
  quizId: string;
  questionId: string;
}

type StartMutation = UseMutationResult<
  StartPrayerQuestionResponse,
  unknown,
  StartPrayerQuestionVariables
>;

export const useStartPrayerQuestion = (): StartMutation => {
  const queryClient = useQueryClient();

  return useMutation<
    StartPrayerQuestionResponse,
    unknown,
    StartPrayerQuestionVariables
  >({
    mutationFn: async ({ quizId, questionId }) => {
      const { data } = await gamificationService.startPrayerQuestion({
        quizId,
        questionId,
      });
      const result = data.data;
      if (!result) throw new Error("Start question response missing data");
      return result;
    },
    onSuccess: (result, variables) => {
      const key = GAMIFICATION_QUERY_KEYS.prayerQuestions({
        prayerType: variables.prayerType,
      });
      queryClient.setQueryData<PrayerQuestionsResponse | undefined>(
        key,
        (prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            quizStatus: result.quizStatus,
            questions: prev.questions.map((q) =>
              q.id === result.question.id ? result.question : q
            ),
          };
        }
      );
    },
  });
};
