import { createMetadata } from "@/src/lib/metadata";
import { fetchLegalDocument } from "@/src/services/legal.service";
import ExplicitConsentContent from "./ExplicitConsentContent";

export const metadata = createMetadata({
  title: "Açık Rıza Metni",
  description:
    "NamazGo'da özel nitelikli kişisel verilerin (mezhep tercihi ve ibadet kayıtları) işlenmesine ilişkin KVKK m.6 kapsamındaki açık rıza metni.",
  path: "/explicit-consent",
});

export default async function ExplicitConsentPage() {
  const document = await fetchLegalDocument("SPECIAL_CATEGORY_DATA");

  return (
    <ExplicitConsentContent
      version={document?.version ?? null}
      effectiveDate={document?.effectiveDate ?? null}
    />
  );
}
