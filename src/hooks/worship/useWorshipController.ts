"use client";

import { useCallback, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { WORSHIP_QUERY_KEYS } from "@/src/constants/worship";
import { addDays, buildLocalDateString } from "@/src/lib/worship-utils";
import type { WorshipQueryParams } from "@/src/types/worship.types";
import { useWorshipTimes } from "./useWorshipTimes";
import { useDayChange } from "./useDayChange";

interface UseWorshipControllerResult {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  goToPrevDay: () => void;
  goToNextDay: () => void;
  goToToday: () => void;
  queryParams: WorshipQueryParams;
  worship: ReturnType<typeof useWorshipTimes>;
  refresh: () => void;
}

export const useWorshipController = (): UseWorshipControllerResult => {
  const queryClient = useQueryClient();
  const [selectedDate, setSelectedDate] = useState<string>(() =>
    buildLocalDateString(new Date())
  );

  const queryParams = useMemo<WorshipQueryParams>(
    () => ({ date: selectedDate }),
    [selectedDate]
  );

  const worship = useWorshipTimes(queryParams);

  const refresh = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: WORSHIP_QUERY_KEYS.all });
  }, [queryClient]);

  const goToPrevDay = useCallback(() => {
    setSelectedDate((current) => addDays(current, -1));
  }, []);

  const goToNextDay = useCallback(() => {
    setSelectedDate((current) => addDays(current, 1));
  }, []);

  const goToToday = useCallback(() => {
    setSelectedDate(buildLocalDateString(new Date()));
  }, []);

  useDayChange(selectedDate, (today) => {
    if (selectedDate === buildLocalDateString(new Date())) return;
    setSelectedDate(today);
  });

  return {
    selectedDate,
    setSelectedDate,
    goToPrevDay,
    goToNextDay,
    goToToday,
    queryParams,
    worship,
    refresh,
  };
};
