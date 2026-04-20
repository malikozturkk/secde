export type ConsentType = "TERMS_OF_SERVICE" | "PRIVACY_POLICY";

export interface ConsentStatusItem {
  type: ConsentType;
  acceptedVersion: string | null;
  currentVersion: string;
  requiresReaccept: boolean;
}

export interface ConsentStatusResponse {
  items: ConsentStatusItem[];
  blocked: boolean;
}

export interface AcceptConsentPayload {
  type: ConsentType;
  version: string;
}
