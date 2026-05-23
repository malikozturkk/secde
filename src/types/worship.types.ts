import type {
  PrayerKey,
  CalculationMethod,
  Madhab,
} from "./enums/worship.enums";

export interface WorshipMeta {
  latitude: number;
  longitude: number;
  timezone: string;
  gregorianDate: string;
  hijriDate: string;
  hijriMonthName: string;
  calculationMethod: CalculationMethod | string;
  madhab: Madhab | string;
}

export interface PrayerTime {
  time: string;
  iso: string;
  remainingSeconds: number;
  isNext: boolean;
  isPassed: boolean;
}

export type WorshipTimes = Record<PrayerKey, PrayerTime>;

export interface RamadanInfo {
  day: number;
  totalDays: number;
}

export interface WorshipFasting {
  isRamadan: boolean;
  isFastingTime: boolean;
  fastingStart: string;
  fastingEnd: string;
  remainingSeconds: number;
  progressPercent: number;
  ramadan: RamadanInfo | null;
}

export interface WorshipData {
  meta: WorshipMeta;
  times: WorshipTimes;
  nextPrayer: PrayerKey;
  nextPrayerAt: string;
  secondsUntilNext: number;
  lastPrayer: PrayerKey | null;
  dayProgressPercent: number;
  fasting: WorshipFasting | null;
}

export interface WorshipQueryParams {
  lat: number;
  lng: number;
  date: string;
  tz: string;
  method?: CalculationMethod | string;
  madhab?: Madhab | string;
}

export interface WorshipSettings {
  method?: CalculationMethod | string;
  madhab?: Madhab | string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface City {
  id: string;
  name: string;
  lat: number;
  lng: number;
  timezone: string;
}
