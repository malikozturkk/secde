import type { PrayerKey, Madhab } from "./enums/worship.enums";

export interface WorshipMeta {
  latitude: number;
  longitude: number;
  timezone: string;
  gregorianDate: string;
  hijriDate: string;
  hijriMonthName: string;
  calculationMethod: string;
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
  date: string;
}

export interface WorshipOption {
  key: string;
  value?: string;
  isDefault: boolean;
}

export interface WorshipOptionsDefaults {
  method: string;
  madhab: string;
}

export interface WorshipOptionsData {
  calculationMethods: WorshipOption[];
  madhabs: WorshipOption[];
  defaults: WorshipOptionsDefaults;
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
