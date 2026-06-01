"use client";

import { useQuery } from "@tanstack/react-query";
import { worshipService } from "@/src/services/worship.service";
import type {
  WorshipData,
  WorshipQueryParams,
} from "@/src/types/worship.types";
import {
  WORSHIP_QUERY_KEYS,
  WORSHIP_REFRESH_INTERVAL,
  WORSHIP_STALE_TIME,
} from "@/src/constants/worship";

export const useWorshipTimes = (params: WorshipQueryParams | null) => {
  return useQuery<WorshipData>({
    queryKey: params
      ? WORSHIP_QUERY_KEYS.times(params)
      : ["worship", "times", "disabled"],
    queryFn: async () => {
      if (!params) {
        throw new Error("Worship query params are required");
      }
      const response = await worshipService.getTimes(params);
      const data = response.data.data;
      if (!data) {
        throw new Error("Worship response missing data");
      }
      return data;
    },
    enabled: params !== null,
    staleTime: WORSHIP_STALE_TIME,
    refetchInterval: WORSHIP_REFRESH_INTERVAL,
    refetchOnWindowFocus: true,
  });
};
