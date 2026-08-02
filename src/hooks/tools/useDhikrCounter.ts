"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import {
  DHIKR_COMPLETE_VIBRATION,
  DHIKR_PRESETS,
  DHIKR_STORAGE_KEY,
  DHIKR_TAP_VIBRATION,
} from "@/src/constants/tools";
import { createPersistentStore } from "@/src/lib/persistent-store";
import { buildLocalDateString } from "@/src/lib/worship-utils";
import type { DhikrPreset, DhikrState } from "@/src/types/tools.types";

const DEFAULT_STATE: DhikrState = {
  presetId: DHIKR_PRESETS[0]!.id,
  count: 0,
  completedRounds: 0,
  date: "",
};

const revive = (raw: unknown): DhikrState | null => {
  if (!raw || typeof raw !== "object") return null;
  const v = raw as Partial<DhikrState>;
  const presetId =
    typeof v.presetId === "string" && DHIKR_PRESETS.some((p) => p.id === v.presetId)
      ? v.presetId
      : DEFAULT_STATE.presetId;
  return {
    presetId,
    count: typeof v.count === "number" && v.count >= 0 ? Math.floor(v.count) : 0,
    completedRounds:
      typeof v.completedRounds === "number" && v.completedRounds >= 0
        ? Math.floor(v.completedRounds)
        : 0,
    date: typeof v.date === "string" ? v.date : "",
  };
};

const store = createPersistentStore<DhikrState>(DHIKR_STORAGE_KEY, DEFAULT_STATE, revive);

const vibrate = (pattern: number | readonly number[]): void => {
  if (typeof navigator === "undefined" || !("vibrate" in navigator)) return;
  try {
    navigator.vibrate(pattern as number | number[]);
  } catch {
  }
};

export interface DhikrCounter {
  preset: DhikrPreset;
  count: number;
  completedRounds: number;

  progressPercent: number;

  isComplete: boolean;
  increment: () => void;
  undo: () => void;
  resetCount: () => void;
  resetAll: () => void;
  selectPreset: (presetId: string) => void;
}

export const useDhikrCounter = (): DhikrCounter => {
  const state = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );

  const preset = useMemo(
    () => DHIKR_PRESETS.find((p) => p.id === state.presetId) ?? DHIKR_PRESETS[0]!,
    [state.presetId],
  );

  const today = buildLocalDateString(new Date());
  const completedRounds = state.date === today ? state.completedRounds : 0;

  const increment = useCallback(() => {
    store.set((current) => {
      const activePreset =
        DHIKR_PRESETS.find((p) => p.id === current.presetId) ?? DHIKR_PRESETS[0]!;
      const day = buildLocalDateString(new Date());
      const rounds = current.date === day ? current.completedRounds : 0;
      const next = current.count + 1;

      if (next >= activePreset.target) {
        vibrate(DHIKR_COMPLETE_VIBRATION);
        return { presetId: current.presetId, count: 0, completedRounds: rounds + 1, date: day };
      }

      vibrate(DHIKR_TAP_VIBRATION);
      return { presetId: current.presetId, count: next, completedRounds: rounds, date: day };
    });
  }, []);

  const undo = useCallback(() => {
    store.set((current) =>
      current.count === 0 ? current : { ...current, count: current.count - 1 },
    );
  }, []);

  const resetCount = useCallback(() => {
    store.set((current) => (current.count === 0 ? current : { ...current, count: 0 }));
  }, []);

  const resetAll = useCallback(() => {
    store.set((current) => ({
      presetId: current.presetId,
      count: 0,
      completedRounds: 0,
      date: buildLocalDateString(new Date()),
    }));
  }, []);

  const selectPreset = useCallback((presetId: string) => {
    store.set((current) =>
      current.presetId === presetId ? current : { ...current, presetId, count: 0 },
    );
  }, []);

  return {
    preset,
    count: state.count,
    completedRounds,
    progressPercent:
      preset.target > 0 ? Math.min(100, Math.round((state.count / preset.target) * 100)) : 0,
    isComplete: state.count === 0 && completedRounds > 0,
    increment,
    undo,
    resetCount,
    resetAll,
    selectPreset,
  };
};
