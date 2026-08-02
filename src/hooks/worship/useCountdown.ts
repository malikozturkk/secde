"use client";

import { useSyncExternalStore } from "react";
import { COUNTDOWN_TICK_MS } from "@/src/constants/worship";

const listeners = new Set<() => void>();
let cachedNow: number = typeof Date !== "undefined" ? Date.now() : 0;
let intervalHandle: ReturnType<typeof setInterval> | null = null;

const startTicker = (): void => {
  if (intervalHandle !== null) return;
  intervalHandle = setInterval(() => {
    cachedNow = Date.now();
    listeners.forEach((listener) => listener());
  }, COUNTDOWN_TICK_MS);
};

const stopTicker = (): void => {
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
    stopTicker();
  };
};

const getSnapshot = (): number => cachedNow;
const getServerSnapshot = (): number => 0;

const useNowMs = (): number =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

export const useCountdownToIso = (targetIso: string | null): number => {
  const now = useNowMs();
  if (!targetIso) return 0;
  const targetMs = new Date(targetIso).getTime();
  if (!Number.isFinite(targetMs)) return 0;
  const reference = now === 0 ? targetMs : now;
  const remainingSec = Math.floor((targetMs - reference) / 1000);
  return remainingSec > 0 ? remainingSec : 0;
};

export const useElapsedSinceIso = (originIso: string | null): number => {
  const now = useNowMs();
  if (!originIso) return 0;
  const originMs = new Date(originIso).getTime();
  if (!Number.isFinite(originMs)) return 0;
  const reference = now === 0 ? originMs : now;
  const elapsedSec = Math.floor((reference - originMs) / 1000);
  return elapsedSec > 0 ? elapsedSec : 0;
};
