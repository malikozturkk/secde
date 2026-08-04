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

export const GUIDE_TITLES: Record<GuideId, string> = {
  wudu: "Abdest",
  ghusl: "Gusül Abdesti",
  fajr: "Sabah Namazı",
  dhuhr: "Öğle Namazı",
  asr: "İkindi Namazı",
  maghrib: "Akşam Namazı",
  isha: "Yatsı Namazı",
  jumuah: "Cuma Namazı",
};

export const isGuideId = (value: string): value is GuideId =>
  (GUIDE_IDS as readonly string[]).includes(value);
