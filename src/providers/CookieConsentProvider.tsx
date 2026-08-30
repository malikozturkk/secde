"use client";

import React, { createContext, useContext } from "react";
import {
  useCookieConsent,
  type CookieConsentState,
} from "@/src/hooks/useCookieConsent";

const CookieConsentContext = createContext<CookieConsentState | null>(null);

export function CookieConsentProvider({
  children,
  policyVersion,
}: {
  children: React.ReactNode;
  policyVersion: string | null;
}) {
  const consent = useCookieConsent(policyVersion);

  return (
    <CookieConsentContext.Provider value={consent}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsentContext(): CookieConsentState {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error(
      "useCookieConsentContext must be used within a CookieConsentProvider"
    );
  }
  return ctx;
}
