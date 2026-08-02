import { createMetadata } from "@/src/lib/metadata";
import { DhikrClient } from "./DhikrClient";

export const metadata = createMetadata({
  title: "Zikirmatik",
  description: "Tesbihatını say, hedefe ulaşınca tur tamamla.",
  path: "/tools/dhikr",
});

export default function DhikrPage() {
  return <DhikrClient />;
}
