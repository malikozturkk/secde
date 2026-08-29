"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import { GUEST_CITY_STORAGE_KEY } from "@/src/constants/tools";
import { createPersistentStore } from "@/src/lib/persistent-store";
import { matchTrCity } from "@/src/lib/geocode";
import type { TrCity } from "@/src/constants/registration";

const revive = (raw: unknown): string | null =>
  typeof raw === "string" && matchTrCity(raw) ? raw : null;

const store = createPersistentStore<string | null>(
  GUEST_CITY_STORAGE_KEY,
  null,
  revive
);

export interface GuestCity {
  city: TrCity | null;
  setCity: (city: string) => void;
  clear: () => void;
}

export const useGuestCity = (): GuestCity => {
  const stored = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot
  );

  const city = useMemo(() => matchTrCity(stored) ?? null, [stored]);

  const setCity = useCallback((next: string) => {
    store.set(matchTrCity(next)?.city ?? null);
  }, []);

  const clear = useCallback(() => store.reset(), []);

  return { city, setCity, clear };
};
