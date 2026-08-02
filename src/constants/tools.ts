import { NisabBasis, ToolId } from "@/src/types/enums/tools.enums";
import type { DhikrPreset, ToolMeta } from "@/src/types/tools.types";

export const TOOLS: readonly ToolMeta[] = [
  {
    id: ToolId.Qibla,
    href: "/tools/qibla",
    label: "Kıble Bulucu",
    description: "Bulunduğun yerden Kâbe'nin hangi yönde olduğunu gösterir.",
    eyebrow: "YÖN",
    nodeBg: "bg-gradient-to-b from-[#25B49A] to-[#12796A]",
    nodeShadow: "shadow-[0_6px_0_0_#0F5048]",
    ring: "border-[rgba(37,180,154,0.40)]",
    surface:
      "bg-gradient-to-b from-[rgba(37,180,154,0.12)] to-[#1C2E35] to-60%",
    accent: "var(--color-primary-light)",
  },
  {
    id: ToolId.Dhikr,
    href: "/tools/dhikr",
    label: "Zikirmatik",
    description: "Tesbihatını say, hedefe ulaşınca haber ver.",
    eyebrow: "TESBİHAT",
    nodeBg: "bg-gradient-to-b from-[#8A5A2E] to-[#3E2515]",
    nodeShadow: "shadow-[0_6px_0_0_#241109]",
    ring: "border-[rgba(176,123,74,0.42)]",
    surface:
      "bg-gradient-to-b from-[rgba(176,123,74,0.13)] to-[#1C2E35] to-60%",
    accent: "#E0B487",
  },
  {
    id: ToolId.Zakat,
    href: "/tools/zakat",
    label: "Zekât Hesaplayıcı",
    description:
      "Varlığını gir, nisabı aşıyor musun ve ne kadar zekât düşüyor gör.",
    eyebrow: "HESAP",
    nodeBg: "bg-gradient-to-b from-[#FFCA6B] to-[#D98A0B]",
    nodeShadow: "shadow-[0_6px_0_0_#7A5A0D]",
    ring: "border-[rgba(245,166,35,0.40)]",
    surface:
      "bg-gradient-to-b from-[rgba(245,166,35,0.12)] to-[#1C2E35] to-60%",
    accent: "var(--color-secondary-light)",
  },
] as const;

export const TOOLS_PAGE_TITLE = "Araçlar";
export const TOOLS_PAGE_SUBTITLE =
  "İbadetinde işine yarayacak küçük yardımcılar. Seri ve XP kazandırmazlar.";

export const KAABA_COORDINATES = {
  latitude: 21.4224779,
  longitude: 39.8251832,
} as const;

export const COMPASS_SMOOTHING = 0.15;

export const QIBLA_ALIGNED_TOLERANCE_DEGREES = 5;

export const DHIKR_PRESETS: readonly DhikrPreset[] = [
  {
    id: "subhanallah",
    label: "Sübhânallah",
    meaning: "Allah her türlü eksiklikten uzaktır",
    target: 33,
  },
  {
    id: "elhamdulillah",
    label: "Elhamdülillah",
    meaning: "Hamd Allah'a mahsustur",
    target: 33,
  },
  {
    id: "allahuekber",
    label: "Allâhu ekber",
    meaning: "Allah en büyüktür",
    target: 33,
  },
  {
    id: "tevhid",
    label: "Lâ ilâhe illallah",
    meaning: "Allah'tan başka ilah yoktur",
    target: 100,
  },
  {
    id: "istigfar",
    label: "Estağfirullah",
    meaning: "Allah'tan bağışlanma dilerim",
    target: 100,
  },
  {
    id: "salavat",
    label: "Allâhümme salli alâ Muhammed",
    meaning: "Peygamber'e salât ve selam",
    target: 100,
  },
] as const;

export const DHIKR_STORAGE_KEY = "namazgo.dhikr.v1";

export const DHIKR_COMPLETE_VIBRATION = [40, 60, 40] as const;
export const DHIKR_TAP_VIBRATION = 12;

export const ZAKAT_RATE = 0.025;

export const NISAB_GRAMS: Record<NisabBasis, number> = {
  [NisabBasis.Gold]: 80.18,
  [NisabBasis.Silver]: 561.2,
};

export const NISAB_LABELS: Record<NisabBasis, string> = {
  [NisabBasis.Gold]: "Altın (80,18 gr)",
  [NisabBasis.Silver]: "Gümüş (561,2 gr)",
};

export const ZAKAT_STORAGE_KEY = "namazgo.zakat.v1";

export const ZAKAT_DISCLAIMER =
  "Bu hesap yalnızca bir yardımcıdır. Fiyatları kendin girdiğin için sonuç girdiğin değerler kadar doğrudur. Zekât, üzerinden bir kamerî yıl geçmiş ve nisabı aşan mala düşer; tereddüt ettiğin durumda bir ilim ehline danış.";
