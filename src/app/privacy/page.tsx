import { createMetadata } from "@/src/lib/metadata";
import { fetchLegalDocument } from "@/src/services/legal.service";
import PrivacyContent from "./PrivacyContent";

export const metadata = createMetadata({
  title: "Aydınlatma Metni",
  description:
    "NamazGo'nun KVKK m.10 kapsamındaki aydınlatma metni: işlenen kişisel veriler, işleme amaçları ve hukuki sebepleri, aktarım, saklama süreleri, çerezler ve ilgili kişi hakları.",
  path: "/privacy",
});

export default async function PrivacyPage() {
  const document = await fetchLegalDocument("PRIVACY_POLICY");

  return (
    <PrivacyContent
      version={document?.version ?? null}
      effectiveDate={document?.effectiveDate ?? null}
    />
  );
}
