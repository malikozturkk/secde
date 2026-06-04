"use client";

import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from "@tanstack/react-query";
import { gamificationService } from "@/src/services/gamification.service";
import { USER_STATS_QUERY_KEYS } from "@/src/constants/user-stats";
import { useAuthStore } from "@/src/store/auth.store";
import type {
  GamificationActionRequest,
  GamificationActionResponse,
} from "@/src/types/streak.types";

type ActionMutation = UseMutationResult<
  GamificationActionResponse,
  unknown,
  GamificationActionRequest
>;

export const useGamificationAction = (): ActionMutation => {
  const queryClient = useQueryClient();

  return useMutation<
    GamificationActionResponse,
    unknown,
    GamificationActionRequest
  >({
    mutationFn: async (payload) => {
      const { data } = await gamificationService.postAction(payload);
      const result = data.data;
      if (!result) throw new Error("Gamification action response missing data");
      return result;
    },
    onSuccess: async () => {
      const username = useAuthStore.getState().user?.username;

      const invalidations: Promise<unknown>[] = [
        queryClient.invalidateQueries({ queryKey: USER_STATS_QUERY_KEYS.me() }),
      ];

      if (username) {
        invalidations.push(
          queryClient.invalidateQueries({
            queryKey: USER_STATS_QUERY_KEYS.user(username),
          })
        );
      }

      await Promise.all(invalidations);
    },
  });
};
