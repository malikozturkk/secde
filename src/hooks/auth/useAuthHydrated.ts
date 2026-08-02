"use client";

import { useSyncExternalStore } from "react";
import { useAuthStore } from "@/src/store/auth.store";

const subscribeHydration = (cb: () => void) =>
  useAuthStore.persist.onFinishHydration(cb);
const getHydrationSnapshot = () => useAuthStore.persist.hasHydrated();
const getServerHydrationSnapshot = () => false;

export const useAuthHydrated = (): boolean =>
  useSyncExternalStore(
    subscribeHydration,
    getHydrationSnapshot,
    getServerHydrationSnapshot
  );
