import { createMetadata } from "@/src/lib/metadata";
import { fetchLegalDocument } from "@/src/services/legal.service";
import TermsContent from "./TermsContent";

export const metadata = createMetadata({
  title: "Kullanım Şartları",
  description:
    "NamazGo uygulamasının kullanım şartları, hizmet koşulları ve kullanıcı sorumlulukları hakkında bilgi edinin.",
  path: "/terms",
});

export default async function TermsPage() {
  const document = await fetchLegalDocument("TERMS_OF_SERVICE");

  return (
    <TermsContent
      version={document?.version ?? null}
      effectiveDate={document?.effectiveDate ?? null}
    />
  );
}
