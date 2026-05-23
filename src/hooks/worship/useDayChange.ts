"use client";

import { useEffect, useRef } from "react";
import { DAY_CHANGE_CHECK_MS } from "@/src/constants/worship";
import { buildLocalDateString } from "@/src/lib/worship-utils";

export const useDayChange = (
  selectedDate: string,
  onDayChange: (newDate: string) => void
): void => {
  const handlerRef = useRef(onDayChange);
  const selectedRef = useRef(selectedDate);

  useEffect(() => {
    handlerRef.current = onDayChange;
  }, [onDayChange]);

  useEffect(() => {
    selectedRef.current = selectedDate;
  }, [selectedDate]);

  useEffect(() => {
    const interval = setInterval(() => {
      const today = buildLocalDateString(new Date());
      if (today !== selectedRef.current) {
        handlerRef.current(today);
      }
    }, DAY_CHANGE_CHECK_MS);
    return () => clearInterval(interval);
  }, []);
};
