import type { ConsentType } from "../types/consent.types";

export const CONSENT_VERSIONS: Record<ConsentType, string> = {
  TERMS_OF_SERVICE: "1.0",
  PRIVACY_POLICY: "1.0",
};

export const CONSENT_PATHS: Record<ConsentType, string> = {
  TERMS_OF_SERVICE: "/terms",
  PRIVACY_POLICY: "/privacy",
};

export const CONSENT_LABELS: Record<ConsentType, string> = {
  TERMS_OF_SERVICE: "Kullanım Koşulları",
  PRIVACY_POLICY: "Gizlilik Politikası",
};

export const CONSENT_QUERY_KEYS = {
  status: ["consent", "status"] as const,
};
