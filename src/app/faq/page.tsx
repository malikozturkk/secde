import { createMetadata } from "@/src/lib/metadata";
import FaqContent from "./FaqContent";

export const metadata = createMetadata({
  title: "Sıkça Sorulan Sorular",
  description:
    "Namaz nasıl kılınır, kaç rekattır, vakitler nasıl hesaplanır, abdest nasıl alınır, kıble nasıl bulunur? Namazla ilgili 36 sorunun net cevabı tek sayfada.",
  path: "/faq",
});

export const revalidate = 86400;

export default function FaqPage() {
  return <FaqContent />;
}
