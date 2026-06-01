import type { PrayerBreakdownKey } from "@/src/types/user-stats.types";

export const USER_STATS_QUERY_KEYS = {
  me: () => ["me", "stats"] as const,
  user: (username: string) => ["user", "stats", username] as const,
} as const;

export const SELF_STATS_STALE_TIME_MS = 60_000;
export const USER_STATS_STALE_TIME_MS = 60_000;

const BADGE_LABELS: Record<string, string> = {
  beginner: "Yeni Başlayan",
  first_step: "İlk Adım",
  novice: "Acemi",
  rookie: "Çaylak",
  explorer: "Kâşif",
  traveler: "Yolcu",
  committed: "Kararlı",
  consistent: "İstikrarlı",
  steadfast: "Sabır Yolcusu",
  early_bird: "Erken Kuş",
  night_owl: "Gece Bekçisi",
  disciplined: "Disiplinli",
  devoted: "Gönülden",
  dedicated: "Adanmış",
  master: "Usta",
  champion: "Şampiyon",
  legend: "Efsane",
};

const humanizeBadgeKey = (key: string): string =>
  key
    .replace(/[-_]+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());

export const resolveBadgeLabel = (
  badgeKey: string | null | undefined
): string => {
  if (!badgeKey) return "Rozet";
  return BADGE_LABELS[badgeKey] ?? humanizeBadgeKey(badgeKey);
};

interface PrayerBreakdownMeta {
  key: PrayerBreakdownKey;
  label: string;
  short: string;
  color: string;
  shadow: string;
}

export const PRAYER_BREAKDOWN_META: readonly PrayerBreakdownMeta[] = [
  {
    key: "fajr",
    label: "Sabah",
    short: "Sabah",
    color: "#F59E0B",
    shadow: "#7C2D12",
  },
  {
    key: "dhuhr",
    label: "Öğle",
    short: "Öğle",
    color: "#FACC15",
    shadow: "#7C5300",
  },
  {
    key: "asr",
    label: "İkindi",
    short: "İkindi",
    color: "#F97316",
    shadow: "#7C2D12",
  },
  {
    key: "maghrib",
    label: "Akşam",
    short: "Akşam",
    color: "#E11D48",
    shadow: "#4C0519",
  },
  {
    key: "isha",
    label: "Yatsı",
    short: "Yatsı",
    color: "#6366F1",
    shadow: "#1E1B4B",
  },
  {
    key: "jumuah",
    label: "Cuma",
    short: "Cuma",
    color: "#059669",
    shadow: "#022C22",
  },
  {
    key: "tarawih",
    label: "Teravih",
    short: "Terav.",
    color: "#7C3AED",
    shadow: "#3B0764",
  },
  {
    key: "eidFitr",
    label: "Ramazan Bayramı",
    short: "R. Bay.",
    color: "#FCD34D",
    shadow: "#713F12",
  },
  {
    key: "eidAdha",
    label: "Kurban Bayramı",
    short: "K. Bay.",
    color: "#FB923C",
    shadow: "#7C2D12",
  },
] as const;
