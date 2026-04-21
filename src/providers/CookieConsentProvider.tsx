"use client";

import React, { createContext, useContext } from "react";
import {
  useCookieConsent,
  type CookieConsentState,
} from "@/src/hooks/useCookieConsent";

const CookieConsentContext = createContext<CookieConsentState | null>(null);

export function CookieConsentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const consent = useCookieConsent();

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
