import { PrayerType } from "@/src/types/enums/streak.enums";

export type StreakCharacterName =
  | "ataman"
  | "zeyd"
  | "nura"
  | "nura_sitting"
  | "ay";

export interface PrayerMeta {
  type: PrayerType;
  label: string;
  eyebrow: string;
  color: string;
  shadow: string;
  tint: string;
  character: StreakCharacterName;
  hint: string;
}

export const PRAYER_META: Record<PrayerType, PrayerMeta> = {
  [PrayerType.Fajr]: {
    type: PrayerType.Fajr,
    label: "Sabah",
    eyebrow: "SABAH",
    color: "#F59E0B",
    shadow: "#7C2D12",
    tint: "#FFD27A",
    character: "ataman",
    hint: "Şafakla başla",
  },
  [PrayerType.Dhuhr]: {
    type: PrayerType.Dhuhr,
    label: "Öğle",
    eyebrow: "ÖĞLE",
    color: "#FACC15",
    shadow: "#7C5300",
    tint: "#FDE68A",
    character: "zeyd",
    hint: "Günü ortadan tut",
  },
  [PrayerType.Asr]: {
    type: PrayerType.Asr,
    label: "İkindi",
    eyebrow: "İKİNDİ",
    color: "#F97316",
    shadow: "#7C2D12",
    tint: "#FDBA74",
    character: "nura",
    hint: "İkindiyi de geçirme",
  },
  [PrayerType.Maghrib]: {
    type: PrayerType.Maghrib,
    label: "Akşam",
    eyebrow: "AKŞAM",
    color: "#E11D48",
    shadow: "#4C0519",
    tint: "#FDA4AF",
    character: "ataman",
    hint: "Günü kapatırken",
  },
  [PrayerType.Isha]: {
    type: PrayerType.Isha,
    label: "Yatsı",
    eyebrow: "YATSI",
    color: "#4338CA",
    shadow: "#1E1B4B",
    tint: "#C7B9FF",
    character: "ay",
    hint: "Günün son durağı",
  },
  [PrayerType.Jumuah]: {
    type: PrayerType.Jumuah,
    label: "Cuma",
    eyebrow: "CUMA",
    color: "#059669",
    shadow: "#022C22",
    tint: "#6EE7B7",
    character: "zeyd",
    hint: "Toplanma vakti",
  },
  [PrayerType.Tarawih]: {
    type: PrayerType.Tarawih,
    label: "Teravih",
    eyebrow: "TERAVİH",
    color: "#7C3AED",
    shadow: "#3B0764",
    tint: "#C4B5FD",
    character: "nura_sitting",
    hint: "Ramazan gecesi",
  },
  [PrayerType.EidFitr]: {
    type: PrayerType.EidFitr,
    label: "Ramazan Bayramı",
    eyebrow: "BAYRAM",
    color: "#EAB308",
    shadow: "#713F12",
    tint: "#FDE047",
    character: "ataman",
    hint: "Bayram namazı",
  },
  [PrayerType.EidAdha]: {
    type: PrayerType.EidAdha,
    label: "Kurban Bayramı",
    eyebrow: "BAYRAM",
    color: "#EAB308",
    shadow: "#713F12",
    tint: "#FDE047",
    character: "ataman",
    hint: "Bayram namazı",
  },
};

interface StreakMessageRange {
  min: number;
  text: string;
}

export const STREAK_MESSAGES: readonly StreakMessageRange[] = [
  {
    min: 100,
    text: "Üç haneye geçtin. Bu sıradan bir alışkanlık değil artık.",
  },
  {
    min: 30,
    text: "Bir ayı geride bıraktın. İçten gelen disiplin böyle görünür.",
  },
  { min: 7, text: "Bir haftayı tamamladın. Şimdi tempo seninle." },
  { min: 1, text: "Bugünü de kapatırsak seri büyür. Adım adım gidiyoruz." },
  { min: 0, text: "Yeni bir sayfa açma vakti. Bugün gün bir." },
] as const;

export const STREAK_FRESH_DAY_MESSAGE =
  "Hadi başlayalım — bugün ilk vakit seni bekliyor.";

export const STREAK_DAY_COMPLETED_MESSAGE =
  "Maşallah! Bugünü tamamladın, seri devam ediyor.";

export const STREAK_HERO_BUBBLES: readonly string[] = [
  "Devam et!",
  "Bir tane daha!",
  "Aferin sana!",
  "Sen yaparsın!",
  "Bugün de seninle!",
] as const;

export const STREAK_HERO_CHARACTER_POOL: readonly StreakCharacterName[] = [
  "zeyd",
  "nura",
  "ataman",
  "ay",
  "nura_sitting",
] as const;

export const GAMIFICATION_QUERY_KEYS = {
  all: ["gamification"] as const,
  dailyPrayersAll: ["gamification", "daily-prayers"] as const,
  prayerHistoryAll: ["gamification", "prayer-history"] as const,
  dailyPrayers: (params: { date: string }) =>
    ["gamification", "daily-prayers", params] as const,
  prayerHistory: (params: { from: string; to: string }) =>
    ["gamification", "prayer-history", params] as const,
  prayerQuestions: (params: { prayerType: string }) =>
    ["gamification", "prayer-questions", params] as const,
  streakRisk: () => ["gamification", "streak-risk"] as const,
} as const;

export const DAILY_PRAYERS_STALE_TIME_MS = 60 * 1000;
export const STREAK_RISK_STALE_TIME_MS = 60 * 1000;
export const STREAK_BREAK_NOTICE_STORAGE_KEY = "namazgo:streak-break-notice";
export const PRAYER_HISTORY_STALE_TIME_MS = 5 * 60 * 1000;
export const PRAYER_HISTORY_MAX_RANGE_DAYS = 62;

export const DAILY_PRAYERS_REFRESH_INTERVAL_MS = 5 * 60 * 1000;
export const STREAK_TICK_INTERVAL_MS = 1000;

export const STREAK_LOCALE = "tr-TR";
export const STREAK_TIME_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  hour: "2-digit",
  minute: "2-digit",
};

export const PRAYER_QUIZ_QUESTION_COUNT = 3;
export const STREAK_FREEZE_MAX_SLOTS = 3;
export const ANIMATED_NUMBER_DURATION_MS = 700;
export const STREAK_HERO_LEVEL_LABEL_FALLBACK = "Sabır Yolcusu";
