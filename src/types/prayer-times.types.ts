export type PublicPrayerKey =
  | "fajr"
  | "sunrise"
  | "dhuhr"
  | "asr"
  | "maghrib"
  | "isha";

export interface PublicPrayerDay {
  date: string;
  weekdayName: string;
  gregorianLabel: string;
  hijriDate: string;
  hijriMonthName: string;
  times: Record<PublicPrayerKey, string>;
}

export interface PublicPrayerTimes {
  city: string;
  latitude: number;
  longitude: number;
  timezone: string;
  calculationMethod: string;
  madhab: string;
  today: PublicPrayerDay;
  days: PublicPrayerDay[];
}

export const PRAYER_LABELS: ReadonlyArray<{
  key: PublicPrayerKey;
  label: string;
  colloquial: string;
}> = [
  { key: "fajr", label: "İmsak", colloquial: "imsak" },
  { key: "sunrise", label: "Güneş", colloquial: "güneşin doğuşu" },
  { key: "dhuhr", label: "Öğle", colloquial: "öğle ezanı" },
  { key: "asr", label: "İkindi", colloquial: "ikindi ezanı" },
  { key: "maghrib", label: "Akşam", colloquial: "akşam ezanı" },
  { key: "isha", label: "Yatsı", colloquial: "yatsı ezanı" },
];
