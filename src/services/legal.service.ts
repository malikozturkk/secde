import type { ApiResponse } from "@/src/types/api.types";
import type {
  LegalDocument,
  LegalDocumentKey,
  LegalDocumentsMap,
  LegalDocumentsResponse,
} from "@/src/types/legal.types";

export const LEGAL_DOCUMENTS_REVALIDATE_SECONDS = 60;
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export async function fetchLegalDocuments(): Promise<LegalDocumentsMap | null> {
  if (!API_URL) return null;

  try {
    const response = await fetch(`${API_URL}/legal/documents`, {
      next: { revalidate: LEGAL_DOCUMENTS_REVALIDATE_SECONDS },
      headers: { Accept: "application/json" },
    });

    if (!response.ok) return null;

    const payload = (await response.json()) as ApiResponse<LegalDocumentsResponse>;
    const documents = payload.data?.documents;
    if (!Array.isArray(documents)) return null;

    return documents.reduce<LegalDocumentsMap>((acc, doc) => {
      acc[doc.key] = doc;
      return acc;
    }, {});
  } catch {
    return null;
  }
}

export async function fetchLegalDocument(
  key: LegalDocumentKey
): Promise<LegalDocument | null> {
  const documents = await fetchLegalDocuments();
  return documents?.[key] ?? null;
}
