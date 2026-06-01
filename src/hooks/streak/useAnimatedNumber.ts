"use client";

import { useEffect, useRef, useState } from "react";
import { ANIMATED_NUMBER_DURATION_MS } from "@/src/constants/streak";

export const useAnimatedNumber = (
  target: number,
  duration: number = ANIMATED_NUMBER_DURATION_MS
): number => {
  const [value, setValue] = useState<number>(target);
  const fromRef = useRef<number>(target);

  useEffect(() => {
    const from = fromRef.current;
    const to = target;
    if (from === to) return;

    let rafId = 0;
    let started: number | null = null;

    const step = (ts: number): void => {
      if (started === null) started = ts;
      const elapsed = ts - started;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = Math.round(from + (to - from) * eased);
      setValue(next);
      if (t < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        fromRef.current = to;
      }
    };

    rafId = requestAnimationFrame(step);
    return () => {
      if (rafId !== 0) cancelAnimationFrame(rafId);
      fromRef.current = target;
    };
  }, [target, duration]);

  return value;
};
