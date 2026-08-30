import type { ConsentType } from "./consent.types";

export type LegalDocumentKey = ConsentType | "COOKIE_POLICY";

export interface LegalDocument {
  key: LegalDocumentKey;
  version: string;
  effectiveDate: string;
  requiresConsentRecord: boolean;
}

export interface LegalDocumentsResponse {
  documents: LegalDocument[];
}

export type LegalDocumentsMap = Partial<Record<LegalDocumentKey, LegalDocument>>;

export interface LegalDocumentMeta {
  version: string | null;
  effectiveDate: string | null;
}
