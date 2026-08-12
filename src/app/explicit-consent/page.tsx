import { createMetadata } from "@/src/lib/metadata";
import ExplicitConsentContent from "./ExplicitConsentContent";

export const metadata = createMetadata({
  title: "Açık Rıza Metni",
  description:
    "NamazGo'da özel nitelikli kişisel verilerin (mezhep tercihi ve ibadet kayıtları) işlenmesine ilişkin KVKK m.6 kapsamındaki açık rıza metni.",
  path: "/explicit-consent",
});

export default function ExplicitConsentPage() {
  return <ExplicitConsentContent />;
}
