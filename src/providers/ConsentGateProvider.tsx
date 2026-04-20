"use client";

import { useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/src/store/auth.store";
import { useConsentStatus } from "@/src/hooks/consent/useConsentStatus";
import { ConsentGateModal } from "@/src/components/consent/ConsentGateModal";

const subscribeHydration = (cb: () => void) =>
  useAuthStore.persist.onFinishHydration(cb);
const getHydrationSnapshot = () => useAuthStore.persist.hasHydrated();
const getServerHydrationSnapshot = () => false;

const CONSENT_GATE_EXCLUDED_PATHS = ["/terms", "/privacy"] as const;

const isConsentGateExcludedPath = (pathname: string | null): boolean => {
  if (!pathname) return false;
  return CONSENT_GATE_EXCLUDED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
};
export function ConsentGateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isExcludedPath = isConsentGateExcludedPath(pathname);
  const refreshToken = useAuthStore((s) => s.refreshToken);
  const hydrated = useSyncExternalStore(
    subscribeHydration,
    getHydrationSnapshot,
    getServerHydrationSnapshot
  );

  const isAuthenticated = hydrated && !!refreshToken;

  const { data, isLoading, isError } = useConsentStatus({
    enabled: isAuthenticated,
  });

  if (!isAuthenticated || isLoading || isError || !data) {
    return <>{children}</>;
  }

  const outdated = data.items.filter((item) => item.requiresReaccept);
  const blocking = data.blocked || outdated.length > 0;

  return (
    <>
      {children}
      {blocking && !isExcludedPath && <ConsentGateModal items={outdated} />}
    </>
  );
}
