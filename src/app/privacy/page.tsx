import { createMetadata } from "@/src/lib/metadata";
import PrivacyContent from "./PrivacyContent";

export const metadata = createMetadata({
  title: "Aydınlatma Metni",
  description:
    "NamazGo'nun KVKK m.10 kapsamındaki aydınlatma metni: işlenen kişisel veriler, işleme amaçları ve hukuki sebepleri, aktarım, saklama süreleri, çerezler ve ilgili kişi hakları.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return <PrivacyContent />;
}
