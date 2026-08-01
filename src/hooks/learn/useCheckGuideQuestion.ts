import { useMutation } from "@tanstack/react-query";
import { learnService } from "@/src/services/learn.service";
import type {
  GuideCheckQuestionPayload,
  GuideCheckQuestionResponse,
} from "@/src/types/learn.types";

export const useCheckGuideQuestion = () => {
  return useMutation<
    GuideCheckQuestionResponse,
    Error,
    GuideCheckQuestionPayload
  >({
    mutationFn: async (body) => {
      const { data } = await learnService.checkGuideQuestion(body);
      const payload = data.data;
      if (!payload) throw new Error("Guide-check response missing data");
      return payload;
    },
  });
};
