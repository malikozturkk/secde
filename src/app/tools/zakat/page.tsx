import { createMetadata } from "@/src/lib/metadata";
import { ZakatClient } from "./ZakatClient";

export const metadata = createMetadata({
  title: "Zekât Hesaplayıcı",
  description: "Varlığını gir, nisabı aşıyor musun ve ne kadar zekât düştüğünü hesapla.",
  path: "/tools/zakat",
});

export default function ZakatPage() {
  return <ZakatClient />;
}
