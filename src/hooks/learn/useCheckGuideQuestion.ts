import { useMutation } from "@tanstack/react-query";
import { learnService } from "@/src/services/learn.service";
import { GuideCheckQuestionPayload } from "@/src/types";

export const useCheckGuideQuestion = () => {
  return useMutation({
    mutationFn: (body: GuideCheckQuestionPayload) =>
      learnService.checkGuideQuestion(body).then((res) => res.data.data),
  });
};
