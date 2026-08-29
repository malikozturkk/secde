import { createMetadata } from "@/src/lib/metadata";
import QiblaContent from "./QiblaContent";

export const metadata = createMetadata({
  title: "Kıble Bulucu — Kıble Yönü Kaç Derece?",
  description:
    "Bulunduğun konuma göre kıble yönünü derece olarak hesaplar, canlı pusulayla gösterir. 81 ilin kıble açısı, Kâbe koordinatları ve kıble nasıl bulunur sorusunun cevabı. Konumun cihazından çıkmaz.",
  path: "/tools/qibla",
});

export const revalidate = 86400;

export default function QiblaPage() {
  return <QiblaContent />;
}
