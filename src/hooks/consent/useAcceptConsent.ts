import { useMutation, useQueryClient } from "@tanstack/react-query";
import { consentService } from "@/src/services/consent.service";
import { CONSENT_QUERY_KEYS } from "@/src/constants/consent";
import type { AcceptConsentPayload } from "@/src/types";

export const useAcceptConsent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AcceptConsentPayload) =>
      consentService.accept(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONSENT_QUERY_KEYS.status });
    },
  });
};
