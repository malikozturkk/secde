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
  [PrayerType.Teravih]: {
    type: PrayerType.Teravih,
    label: "Teravih",
    eyebrow: "TERAVİH",
    color: "#7C3AED",
    shadow: "#3B0764",
    tint: "#C4B5FD",
    character: "nura_sitting",
    hint: "Ramazan gecesi",
  },
  [PrayerType.Bayram]: {
    type: PrayerType.Bayram,
    label: "Bayram",
    eyebrow: "BAYRAM",
    color: "#EAB308",
    shadow: "#713F12",
    tint: "#FDE047",
    character: "ataman",
    hint: "Bayram namazı",
  },
};

export interface StreakMessageRange {
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
  dailyPrayers: (params: {
    lat: number;
    lng: number;
    date: string;
    tz: string;
    method?: string;
    madhab?: string;
  }) => ["gamification", "daily-prayers", params] as const,
  prayerQuestions: (params: {
    prayerType: string;
    lat: number;
    lng: number;
    tz: string;
    method?: string;
    madhab?: string;
  }) => ["gamification", "prayer-questions", params] as const,
} as const;

export const DAILY_PRAYERS_STALE_TIME_MS = 60 * 1000;
export const PRAYER_QUESTIONS_STALE_TIME_MS = 5 * 60 * 1000;

export const DAILY_PRAYERS_REFRESH_INTERVAL_MS = 5 * 60 * 1000;
export const STREAK_TICK_INTERVAL_MS = 1000;

export const STREAK_LOCALE = "tr-TR";
export const STREAK_TIME_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  hour: "2-digit",
  minute: "2-digit",
};
export const STREAK_DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
};

export const PRAYER_QUIZ_QUESTION_COUNT = 3;
export const STREAK_FREEZE_MAX_SLOTS = 3;
export const ANIMATED_NUMBER_DURATION_MS = 700;
export const REWARD_CELEBRATION_DURATION_MS = 1500;
export const ROW_STAGGER_MS = 60;
export const STREAK_HERO_LEVEL_LABEL_FALLBACK = "Sabır Yolcusu";
export const STREAK_HERO_LEVEL_TITLES: Record<number, string> = {
  1: "İlk Adım",
  5: "Yolcu",
  10: "Kararlı",
  15: "Sabır Yolcusu",
  20: "Devamlı",
  30: "Erken Kuş",
  50: "Disiplinli",
  75: "İçten",
  100: "Üç Hane",
};

export const PRAYER_COMPLETION_REQUEST_PREFIX = "complete-";
export const STREAK_DEFAULT_METHOD = "Turkey";
export const STREAK_DEFAULT_MADHAB = "Shafi";
