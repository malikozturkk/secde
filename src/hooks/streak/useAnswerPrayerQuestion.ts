"use client";

import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from "@tanstack/react-query";
import { gamificationService } from "@/src/services/gamification.service";
import {
  GAMIFICATION_QUERY_KEYS,
} from "@/src/constants/streak";
import { useAuthStore } from "@/src/store/auth.store";
import { USER_STATS_QUERY_KEYS } from "@/src/constants/user-stats";
import type {
  AnswerPrayerQuestionResponse,
  PrayerQuestionsResponse,
} from "@/src/types/streak.types";
import type { PrayerType } from "@/src/types/enums/streak.enums";

interface AnswerPrayerQuestionVariables {
  prayerType: PrayerType;
  quizId: string;
  questionId: string;
  optionId: string;
}

type AnswerMutation = UseMutationResult<
  AnswerPrayerQuestionResponse,
  unknown,
  AnswerPrayerQuestionVariables
>;

export const useAnswerPrayerQuestion = (): AnswerMutation => {
  const queryClient = useQueryClient();

  return useMutation<
    AnswerPrayerQuestionResponse,
    unknown,
    AnswerPrayerQuestionVariables
  >({
    mutationFn: async ({ quizId, questionId, optionId }) => {
      const { data } = await gamificationService.answerPrayerQuestion({
        quizId,
        questionId,
        payload: { optionId },
      });
      const result = data.data;
      if (!result) throw new Error("Answer question response missing data");
      return result;
    },
    onSuccess: async (result, variables) => {
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
            isLocked: result.isLocked,
            questions: prev.questions.map((q) =>
              q.id === result.question.id ? result.question : q
            ),
          };
        }
      );

      if (result.prayerCompletion) {
        const invalidations: Promise<unknown>[] = [
          queryClient.invalidateQueries({
            queryKey: ["gamification", "daily-prayers"],
          }),
          queryClient.invalidateQueries({
            queryKey: USER_STATS_QUERY_KEYS.me(),
          }),
        ];
        const username = useAuthStore.getState().user?.username;
        if (username) {
          invalidations.push(
            queryClient.invalidateQueries({
              queryKey: USER_STATS_QUERY_KEYS.user(username),
            })
          );
        }
        await Promise.all(invalidations);
      } else if (result.isLocked) {
        await queryClient.invalidateQueries({
          queryKey: ["gamification", "daily-prayers"],
        });
      }
    },
  });
};
