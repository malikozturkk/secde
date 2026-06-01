"use client";

import { useSyncExternalStore } from "react";
import { STREAK_TICK_INTERVAL_MS } from "@/src/constants/streak";

const listeners = new Set<() => void>();
let cachedNow: number = typeof Date !== "undefined" ? Date.now() : 0;
let intervalHandle: ReturnType<typeof setInterval> | null = null;

const startTicker = (): void => {
  if (intervalHandle !== null) return;
  intervalHandle = setInterval(() => {
    cachedNow = Date.now();
    listeners.forEach((fn) => fn());
  }, STREAK_TICK_INTERVAL_MS);
};

const stopTickerIfIdle = (): void => {
  if (intervalHandle === null) return;
  if (listeners.size === 0) {
    clearInterval(intervalHandle);
    intervalHandle = null;
  }
};

const subscribe = (onChange: () => void): (() => void) => {
  listeners.add(onChange);
  startTicker();
  return () => {
    listeners.delete(onChange);
    stopTickerIfIdle();
  };
};

const getSnapshot = (): number => cachedNow;
const getServerSnapshot = (): number => 0;

export const useNowMs = (): number =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
