import { useMutation } from "@tanstack/react-query";
import { learnService } from "@/src/services/learn.service";
import type { GuideCheckQuestionPayload } from "@/src/types/learn.types";

export const useCheckGuideQuestion = () => {
  return useMutation({
    mutationFn: (body: GuideCheckQuestionPayload) =>
      learnService.checkGuideQuestion(body).then((res) => res.data.data),
  });
};
