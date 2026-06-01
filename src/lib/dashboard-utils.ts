import {
  WeekDay,
  WeekDayState,
  MonthCalendar,
  MonthCell,
  MonthCellKind,
} from "../types/dashboard.types";
import { buildLocalDateString, parseLocalDate } from "./worship-utils";

export const SHORT_WEEKDAYS_TR: readonly string[] = [
  "PZT",
  "SAL",
  "ÇAR",
  "PER",
  "CUM",
  "CMT",
  "PAZ",
] as const;

export const MONTHS_TR_FULL: readonly string[] = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
] as const;

const toMondayIndex = (date: Date): number => (date.getDay() + 6) % 7;

const cloneDate = (input: Date): Date => new Date(input.getTime());
const startOfDay = (input: Date): Date => {
  const d = cloneDate(input);
  d.setHours(0, 0, 0, 0);
  return d;
};
const addDays = (date: Date, delta: number): Date => {
  const d = cloneDate(date);
  d.setDate(d.getDate() + delta);
  return d;
};

interface StreakCalendarInput {
  today?: Date;
  currentStreak: number;
  lastActiveDate: string | null;
  protectedDates?: readonly string[];
  completedToday: number;
  totalToday: number;
}

const isFrozen = (
  isoDate: string,
  protectedSet: ReadonlySet<string>
): boolean => protectedSet.has(isoDate);

export const buildWeekStrip = ({
  today = new Date(),
  currentStreak,
  lastActiveDate,
  protectedDates,
  completedToday,
  totalToday,
}: StreakCalendarInput): WeekDay[] => {
  const todayDate = startOfDay(today);
  const todayIndex = toMondayIndex(todayDate);
  const monday = addDays(todayDate, -todayIndex);
  const protectedSet = new Set(protectedDates ?? []);
  const todayIso = buildLocalDateString(todayDate);
  const lastActiveIso = lastActiveDate ?? null;

  const todayIsDone = totalToday > 0 && completedToday >= totalToday;

  return Array.from({ length: 7 }, (_, idx) => {
    const cellDate = addDays(monday, idx);
    const cellIso = buildLocalDateString(cellDate);
    const dayOfMonth = cellDate.getDate();
    const isToday = cellIso === todayIso;
    const isFuture = cellDate.getTime() > todayDate.getTime();
    const daysAgo = Math.round(
      (todayDate.getTime() - cellDate.getTime()) / 86_400_000
    );

    let state: WeekDayState;
    if (isFuture) {
      state = WeekDayState.Future;
    } else if (isToday) {
      state = todayIsDone ? WeekDayState.TodayDone : WeekDayState.TodayPending;
    } else if (isFrozen(cellIso, protectedSet)) {
      state = WeekDayState.Frozen;
    } else if (daysAgo <= currentStreak) {
      const lastActiveCoversToday =
        lastActiveIso !== null && lastActiveIso === todayIso;
      const lastActiveCoversYesterday =
        lastActiveIso !== null && cellIso <= lastActiveIso;
      state =
        lastActiveCoversToday || lastActiveCoversYesterday
          ? WeekDayState.Done
          : WeekDayState.Miss;
    } else {
      state = WeekDayState.Miss;
    }

    return {
      date: cellIso,
      label: SHORT_WEEKDAYS_TR[idx]!,
      dayOfMonth,
      state,
      isToday,
    };
  });
};

interface MonthCalendarInput extends StreakCalendarInput {
  year: number;
  month: number;
}

export const buildMonthCalendar = ({
  year,
  month,
  today = new Date(),
  currentStreak,
  lastActiveDate,
  protectedDates,
  completedToday,
  totalToday,
}: MonthCalendarInput): MonthCalendar => {
  const todayDate = startOfDay(today);
  const todayIso = buildLocalDateString(todayDate);
  const firstOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leadingBlanks = toMondayIndex(firstOfMonth);
  const protectedSet = new Set(protectedDates ?? []);
  const lastActiveIso = lastActiveDate ?? null;

  const cells: MonthCell[] = [];
  for (let i = 0; i < leadingBlanks; i += 1) {
    cells.push({
      kind: MonthCellKind.Empty,
      day: null,
      level: 0,
      perfect: false,
      date: "",
    });
  }

  let perfectDays = 0;
  let totalCompletedPrayers = 0;
  let viableDayCount = 0;
  let viableSuccessCount = 0;

  for (let day = 1; day <= daysInMonth; day += 1) {
    const cellDate = new Date(year, month, day);
    const cellIso = buildLocalDateString(cellDate);
    const cellTime = cellDate.getTime();
    const isToday = cellIso === todayIso;
    const isFuture = cellTime > todayDate.getTime();

    if (isFuture) {
      cells.push({
        kind: MonthCellKind.Future,
        day,
        level: 0,
        perfect: false,
        date: cellIso,
      });
      continue;
    }

    if (isToday) {
      const todayLevel =
        totalToday === 0
          ? 0
          : Math.min(5, Math.round((completedToday / totalToday) * 5));
      const todayPerfect = totalToday > 0 && completedToday >= totalToday;
      cells.push({
        kind: MonthCellKind.Today,
        day,
        level: todayLevel,
        perfect: todayPerfect,
        date: cellIso,
      });
      totalCompletedPrayers += completedToday;
      if (todayPerfect) perfectDays += 1;
      viableDayCount += 1;
      if (todayLevel >= 4) viableSuccessCount += 1;
      continue;
    }

    const frozen = isFrozen(cellIso, protectedSet);
    if (frozen) {
      cells.push({
        kind: MonthCellKind.Frozen,
        day,
        level: 0,
        perfect: false,
        date: cellIso,
      });
      viableDayCount += 1;
      viableSuccessCount += 1;
      continue;
    }

    const daysAgo = Math.round((todayDate.getTime() - cellTime) / 86_400_000);

    let level = 0;
    const lastActiveCoversCell =
      lastActiveIso !== null && cellIso <= lastActiveIso;
    if (daysAgo > 0 && daysAgo <= currentStreak && lastActiveCoversCell) {
      level = 5;
    }

    if (level === 5) {
      perfectDays += 1;
      totalCompletedPrayers += 5;
    }

    viableDayCount += 1;
    if (level >= 4) viableSuccessCount += 1;

    cells.push({
      kind: MonthCellKind.Past,
      day,
      level,
      perfect: level === 5,
      date: cellIso,
    });
  }

  const successPercent =
    viableDayCount === 0
      ? 0
      : Math.round((viableSuccessCount / viableDayCount) * 100);

  return {
    year,
    month,
    cells,
    perfectDays,
    successPercent,
    totalCompletedPrayers,
  };
};

export const monthNameTR = (month: number): string =>
  MONTHS_TR_FULL[month] ?? "";
export const parseIsoLocal = (iso: string): Date => parseLocalDate(iso);
