import { createMetadata } from "@/src/lib/metadata";
import DuasHubContent from "./DuasHubContent";

export const metadata = createMetadata({
  title: "Namaz Duaları — Okunuşu ve Anlamı",
  description:
    "Sübhâneke, Ettehiyyâtü, Allâhümme Salli, Kunut duaları ve namazda okunan kısa sûreler. Arapçası, Türkçe okunuşu ve anlamıyla, namazın hangi bölümünde okunduğu açıklamalı.",
  path: "/duas",
});

export const revalidate = 86400;

export default function DuasPage() {
  return <DuasHubContent />;
}
