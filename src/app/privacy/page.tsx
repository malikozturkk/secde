import { createMetadata } from "@/src/lib/metadata";
import PrivacyContent from "./PrivacyContent";

export const metadata = createMetadata({
  title: "Gizlilik Politikası",
  description:
    "NamazGo uygulamasının gizlilik politikası, kişisel verilerin korunması, çerez kullanımı ve kullanıcı hakları hakkında detaylı bilgi.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return <PrivacyContent />;
}
