import { MONTHS_TR, DAYS_LONG_TR } from "../constants/worship";
import { PrayerState } from "../types/enums/worship.enums";
import type { PrayerTime, Coordinates } from "../types/worship.types";

interface DurationParts {
  h: number;
  m: number;
  s: number;
}

export const padNumber = (value: number): string =>
  String(Math.max(0, Math.floor(value))).padStart(2, "0");

export const splitDuration = (totalSeconds: number): DurationParts => {
  const safe =
    Number.isFinite(totalSeconds) && totalSeconds > 0 ? totalSeconds : 0;
  return {
    h: Math.floor(safe / 3600),
    m: Math.floor((safe % 3600) / 60),
    s: Math.floor(safe % 60),
  };
};

export const formatTime = (iso: string): string => {
  const date = new Date(iso);
  return date.toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const buildLocalDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = padNumber(date.getMonth() + 1);
  const day = padNumber(date.getDate());
  return `${year}-${month}-${day}`;
};

export const parseLocalDate = (yyyyMmDd: string): Date =>
  new Date(`${yyyyMmDd}T00:00:00`);

export const addDays = (yyyyMmDd: string, delta: number): string => {
  const date = parseLocalDate(yyyyMmDd);
  date.setDate(date.getDate() + delta);
  return buildLocalDateString(date);
};

const isSameDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export const formatRelativeDate = (
  isoOrDateOnly: string,
  todayDateString: string
): string => {
  const target = isoOrDateOnly.includes("T")
    ? new Date(isoOrDateOnly)
    : parseLocalDate(isoOrDateOnly);
  const today = parseLocalDate(todayDateString);
  const tomorrow = new Date(today.getTime() + 86_400_000);
  if (isSameDay(target, today)) return "Bugün";
  if (isSameDay(target, tomorrow)) return "Yarın";
  return `${target.getDate()} ${MONTHS_TR[target.getMonth()]}`;
};

export const formatLongDate = (yyyyMmDd: string): string => {
  const date = parseLocalDate(yyyyMmDd);
  return `${date.getDate()} ${
    MONTHS_TR[date.getMonth()]
  } ${date.getFullYear()}`;
};

export const formatDayName = (input: string | Date): string => {
  const date = typeof input === "string" ? new Date(input) : input;
  return DAYS_LONG_TR[date.getDay()];
};

export const formatFromNow = (signedSeconds: number): string => {
  if (!Number.isFinite(signedSeconds)) return "";
  const abs = Math.abs(signedSeconds);
  const hours = Math.floor(abs / 3600);
  const minutes = Math.floor((abs % 3600) / 60);
  const body =
    hours > 0 ? `${hours} sa ${padNumber(minutes)} dk` : `${minutes} dk`;
  return signedSeconds < 0 ? `${body} önce` : `${body} sonra`;
};

export const formatHoursMinutes = (totalMs: number): string => {
  const totalMinutes = Math.max(0, Math.floor(totalMs / 60_000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours} sa ${padNumber(minutes)} dk`;
};

export const getPrayerState = (time: PrayerTime | undefined): PrayerState => {
  if (!time) return PrayerState.Upcoming;
  if (time.isNext) return PrayerState.Current;
  if (time.isPassed) return PrayerState.Passed;
  return PrayerState.Upcoming;
};

export const stripHijriPrefix = (hijri: string): string =>
  hijri.replace(/^Hicri\s+/i, "").trim();

export const formatCoordinate = (value: number, precision = 4): string =>
  `${value.toFixed(precision)}°`;

export const getBrowserTimezone = (): string => {
  if (typeof Intl === "undefined") return "Europe/Istanbul";
  try {
    return (
      Intl.DateTimeFormat().resolvedOptions().timeZone || "Europe/Istanbul"
    );
  } catch {
    return "Europe/Istanbul";
  }
};

export const roundCoordinate = (
  coords: Coordinates,
  precision = 6
): Coordinates => ({
  lat: Number(coords.lat.toFixed(precision)),
  lng: Number(coords.lng.toFixed(precision)),
});

export const clampPercent = (value: number): number =>
  Math.max(0, Math.min(100, value));
