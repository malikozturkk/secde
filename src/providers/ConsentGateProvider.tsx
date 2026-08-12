"use client";

import { usePathname } from "next/navigation";
import { useAuthStore } from "@/src/store/auth.store";
import { useConsentStatus } from "@/src/hooks/consent/useConsentStatus";
import { useAuthHydrated } from "@/src/hooks/auth/useAuthHydrated";
import { ConsentGateModal } from "@/src/components/consent/ConsentGateModal";

const CONSENT_GATE_EXCLUDED_PATHS = ["/terms", "/privacy", "/explicit-consent"] as const;

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
  const hydrated = useAuthHydrated();

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
