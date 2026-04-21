"use client";

import { useCookieConsentContext } from "@/src/providers/CookieConsentProvider";

export function CookiePreferencesLink({
  className = "",
}: {
  className?: string;
}) {
  const { resetConsent } = useCookieConsentContext();

  return (
    <button
      onClick={resetConsent}
      className={`hover:text-white transition-colors cursor-pointer text-[var(--color-text-muted)] ${className}`}
    >
      Çerez Tercihleri
    </button>
  );
}
