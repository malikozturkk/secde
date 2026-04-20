import { useQuery } from "@tanstack/react-query";
import { consentService } from "@/src/services/consent.service";
import { CONSENT_QUERY_KEYS } from "@/src/constants/consent";
import type { ConsentStatusResponse } from "@/src/types";

interface UseConsentStatusOptions {
  enabled?: boolean;
}

export const useConsentStatus = ({
  enabled = true,
}: UseConsentStatusOptions = {}) => {
  return useQuery<ConsentStatusResponse>({
    queryKey: CONSENT_QUERY_KEYS.status,
    queryFn: async () => {
      const { data } = await consentService.getStatus();
      if (!data.data) {
        throw new Error("Consent status response missing data");
      }
      return data.data;
    },
    enabled,
    refetchOnWindowFocus: true,
    staleTime: 0,
    retry: 1,
  });
};
