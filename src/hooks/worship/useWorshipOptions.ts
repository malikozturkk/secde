"use client";

import { useQuery } from "@tanstack/react-query";
import { worshipService } from "@/src/services/worship.service";
import type { WorshipOptionsData } from "@/src/types/worship.types";
import {
  WORSHIP_OPTIONS_STALE_TIME,
  WORSHIP_QUERY_KEYS,
} from "@/src/constants/worship";

interface UseWorshipOptionsParams {
  enabled?: boolean;
}

export const useWorshipOptions = ({
  enabled = true,
}: UseWorshipOptionsParams = {}) => {
  return useQuery<WorshipOptionsData>({
    queryKey: WORSHIP_QUERY_KEYS.options(),
    queryFn: async () => {
      const response = await worshipService.getOptions();
      const data = response.data.data;
      if (!data) {
        throw new Error("Worship options response missing data");
      }
      return data;
    },
    enabled,
    staleTime: WORSHIP_OPTIONS_STALE_TIME,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
