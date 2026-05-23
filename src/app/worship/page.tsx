import { createMetadata } from "@/src/lib/metadata";
import "@/src/styles/worship.css";
import WorshipView from "@/src/components/worship/WorshipView";

export const metadata = createMetadata({
  title: "Namaz Vakitleri",
  description:
    "Konumuna göre günün altı namaz vaktini, kalan süreyi, hicri tarihi ve oruç bilgisini canlı olarak takip et.",
  path: "/worship",
});

export default function WorshipPage() {
  return <WorshipView />;
}
