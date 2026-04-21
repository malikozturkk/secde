import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";

const COOKIE_CONSENT_KEY = "namazgo-cookie-consent";
const COOKIE_CONSENT_VERSION = "1.0";
const COOKIE_EXPIRY_DAYS = 365;

export interface CookiePreferences {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  personalization: boolean;
}

export interface CookieConsentState {
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
  analytics: false,
  marketing: false,
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

function writeConsent(preferences: CookiePreferences) {
  Cookies.set(
    COOKIE_CONSENT_KEY,
    JSON.stringify({ version: COOKIE_CONSENT_VERSION, preferences }),
    {
      expires: COOKIE_EXPIRY_DAYS,
      sameSite: "lax",
      secure:
        typeof window !== "undefined" && window.location.protocol === "https:",
    }
  );
}

export function useCookieConsent(): CookieConsentState {
  const [hasConsented, setHasConsented] = useState(false);
  const [preferences, setPreferences] =
    useState<CookiePreferences>(DEFAULT_PREFERENCES);
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const stored = readStoredConsent();
    if (stored && stored.version === COOKIE_CONSENT_VERSION) {
      setPreferences({ ...stored.preferences, essential: true });
      setHasConsented(true);
      setShowBanner(false);
    } else {
      setShowBanner(true);
    }
  }, []);

  const acceptAll = useCallback(() => {
    const allAccepted: CookiePreferences = {
      essential: true,
      analytics: true,
      marketing: true,
      personalization: true,
    };
    setPreferences(allAccepted);
    setHasConsented(true);
    setShowBanner(false);
    setShowDetails(false);
    writeConsent(allAccepted);
  }, []);

  const rejectAll = useCallback(() => {
    const onlyEssential: CookiePreferences = { ...DEFAULT_PREFERENCES };
    setPreferences(onlyEssential);
    setHasConsented(true);
    setShowBanner(false);
    setShowDetails(false);
    writeConsent(onlyEssential);
  }, []);

  const savePreferences = useCallback(
    (prefs: Partial<CookiePreferences>) => {
      const merged: CookiePreferences = {
        ...preferences,
        ...prefs,
        essential: true,
      };
      setPreferences(merged);
      setHasConsented(true);
      setShowBanner(false);
      setShowDetails(false);
      writeConsent(merged);
    },
    [preferences]
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
    setShowBanner(true);
    setShowDetails(false);
  }, []);

  return {
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
