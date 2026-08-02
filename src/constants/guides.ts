export const GUIDE_IDS = [
  "wudu",
  "ghusl",
  "fajr",
  "dhuhr",
  "asr",
  "maghrib",
  "isha",
  "jumuah",
] as const;

export type GuideId = (typeof GUIDE_IDS)[number];

export const isGuideId = (value: string): value is GuideId =>
  (GUIDE_IDS as readonly string[]).includes(value);
