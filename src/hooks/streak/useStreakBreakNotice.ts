"use client";

import { useCallback, useSyncExternalStore } from "react";
import { createPersistentStore } from "@/src/lib/persistent-store";
import { STREAK_BREAK_NOTICE_STORAGE_KEY } from "@/src/constants/streak";
import type { StreakRiskAssessment } from "@/src/types/streak.types";

const dismissedStore = createPersistentStore<string | null>(
  STREAK_BREAK_NOTICE_STORAGE_KEY,
  null,
  (raw) => (typeof raw === "string" ? raw : null)
);

interface StreakBreakNotice {
  isOpen: boolean;
  dismiss: () => void;
}

export const useStreakBreakNotice = (
  risk: StreakRiskAssessment | undefined
): StreakBreakNotice => {
  const dismissedFor = useSyncExternalStore(
    dismissedStore.subscribe,
    dismissedStore.getSnapshot,
    dismissedStore.getServerSnapshot
  );

  const breakKey = risk?.isBroken ? risk.lastActiveDate : null;

  const dismiss = useCallback(() => {
    if (breakKey) dismissedStore.set(breakKey);
  }, [breakKey]);

  return { isOpen: breakKey !== null && dismissedFor !== breakKey, dismiss };
};
