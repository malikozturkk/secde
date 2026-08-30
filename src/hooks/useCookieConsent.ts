import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";

const COOKIE_CONSENT_KEY = "namazgo-cookie-consent";
const COOKIE_EXPIRY_DAYS = 365;

export interface CookiePreferences {
  essential: true;
  personalization: boolean;
}

export interface CookieConsentState {
  policyVersion: string | null;
  hasConsented: boolean;
  preferences: CookiePreferences;
  showBanner: boolean;
  showDetails: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (prefs: Partial<CookiePreferences>) => void;
  openDetails: () => void;
  closeDetails: () => void;
  resetConsent: () => void;
}

const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true,
  personalization: false,
};

function readStoredConsent(): {
  preferences: CookiePreferences;
  version: string;
} | null {
  try {
    const raw = Cookies.get(COOKIE_CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.version && parsed.preferences) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

function writeConsent(preferences: CookiePreferences, version: string) {
  Cookies.set(
    COOKIE_CONSENT_KEY,
    JSON.stringify({ version, preferences, acceptedAt: new Date().toISOString() }),
    {
      expires: COOKIE_EXPIRY_DAYS,
      sameSite: "lax",
      secure:
        typeof window !== "undefined" && window.location.protocol === "https:",
    }
  );
}

export function useCookieConsent(
  policyVersion: string | null
): CookieConsentState {
  const [hasConsented, setHasConsented] = useState(false);
  const [preferences, setPreferences] =
    useState<CookiePreferences>(DEFAULT_PREFERENCES);
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (!policyVersion) {
      setHasConsented(false);
      setShowBanner(false);
      setShowDetails(false);
      return;
    }

    const stored = readStoredConsent();
    if (stored && stored.version === policyVersion) {
      setPreferences({ ...stored.preferences, essential: true });
      setHasConsented(true);
      setShowBanner(false);
    } else {
      setHasConsented(false);
      setShowBanner(true);
    }
  }, [policyVersion]);

  const acceptAll = useCallback(() => {
    if (!policyVersion) return;
    const allAccepted: CookiePreferences = {
      essential: true,
      personalization: true,
    };
    setPreferences(allAccepted);
    setHasConsented(true);
    setShowBanner(false);
    setShowDetails(false);
    writeConsent(allAccepted, policyVersion);
  }, [policyVersion]);

  const rejectAll = useCallback(() => {
    if (!policyVersion) return;
    const onlyEssential: CookiePreferences = { ...DEFAULT_PREFERENCES };
    setPreferences(onlyEssential);
    setHasConsented(true);
    setShowBanner(false);
    setShowDetails(false);
    writeConsent(onlyEssential, policyVersion);
  }, [policyVersion]);

  const savePreferences = useCallback(
    (prefs: Partial<CookiePreferences>) => {
      if (!policyVersion) return;
      const merged: CookiePreferences = {
        ...preferences,
        ...prefs,
        essential: true,
      };
      setPreferences(merged);
      setHasConsented(true);
      setShowBanner(false);
      setShowDetails(false);
      writeConsent(merged, policyVersion);
    },
    [preferences, policyVersion]
  );

  const openDetails = useCallback(() => {
    setShowDetails(true);
  }, []);

  const closeDetails = useCallback(() => {
    setShowDetails(false);
  }, []);

  const resetConsent = useCallback(() => {
    Cookies.remove(COOKIE_CONSENT_KEY);
    setHasConsented(false);
    setPreferences(DEFAULT_PREFERENCES);
    setShowBanner(Boolean(policyVersion));
    setShowDetails(false);
  }, [policyVersion]);

  return {
    policyVersion,
    hasConsented,
    preferences,
    showBanner,
    showDetails,
    acceptAll,
    rejectAll,
    savePreferences,
    openDetails,
    closeDetails,
    resetConsent,
  };
}
