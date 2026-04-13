import { createMetadata } from "@/src/lib/metadata";
import TermsContent from "./TermsContent";

export const metadata = createMetadata({
  title: "Kullanım Şartları",
  description:
    "NamazGo uygulamasının kullanım şartları, hizmet koşulları ve kullanıcı sorumlulukları hakkında bilgi edinin.",
  path: "/terms",
});

export default function TermsPage() {
  return <TermsContent />;
}
