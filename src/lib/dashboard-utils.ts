import {
  WeekDay,
  WeekDayState,
  MonthCalendar,
  MonthCell,
  MonthCellKind,
} from "../types/dashboard.types";
import type { PrayerHistoryDay } from "../types/streak.types";
import { buildLocalDateString } from "./worship-utils";

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

export const formatFreezeUsageLabel = (isoDate: string | null): string | null => {
  if (!isoDate) return null;
  const [year, month, day] = isoDate.split("-").map(Number);
  if (!year || !month || !day) return null;
  return `${day} ${MONTHS_TR_FULL[month - 1]} ${year}`;
};

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
  history: readonly PrayerHistoryDay[];
  completedToday: number;
  totalToday: number;
}

export const buildWeekRange = (
  today: Date = new Date()
): { from: string; to: string } => {
  const todayDate = startOfDay(today);
  const monday = addDays(todayDate, -toMondayIndex(todayDate));
  return {
    from: buildLocalDateString(monday),
    to: buildLocalDateString(addDays(monday, 6)),
  };
};

export const buildMonthRange = (
  year: number,
  month: number
): { from: string; to: string } => ({
  from: buildLocalDateString(new Date(year, month, 1)),
  to: buildLocalDateString(new Date(year, month + 1, 0)),
});

const indexHistory = (
  history: readonly PrayerHistoryDay[]
): ReadonlyMap<string, PrayerHistoryDay> =>
  new Map(history.map((day) => [day.date, day]));

const resolvePastState = (day: PrayerHistoryDay | undefined): WeekDayState => {
  if (!day) return WeekDayState.Miss;
  if (day.isFrozen) return WeekDayState.Frozen;
  if (day.isComplete) return WeekDayState.Done;
  if (day.completedCount > 0) return WeekDayState.Partial;
  return WeekDayState.Miss;
};

export const buildWeekStrip = ({
  today = new Date(),
  history,
  completedToday,
  totalToday,
}: StreakCalendarInput): WeekDay[] => {
  const todayDate = startOfDay(today);
  const todayIndex = toMondayIndex(todayDate);
  const monday = addDays(todayDate, -todayIndex);
  const todayIso = buildLocalDateString(todayDate);
  const byDate = indexHistory(history);

  const todayIsDone = totalToday > 0 && completedToday >= totalToday;

  return Array.from({ length: 7 }, (_, idx) => {
    const cellDate = addDays(monday, idx);
    const cellIso = buildLocalDateString(cellDate);
    const dayOfMonth = cellDate.getDate();
    const isToday = cellIso === todayIso;
    const isFuture = cellDate.getTime() > todayDate.getTime();
    const entry = byDate.get(cellIso);

    if (isFuture) {
      return {
        date: cellIso,
        label: SHORT_WEEKDAYS_TR[idx]!,
        dayOfMonth,
        state: WeekDayState.Future,
        isToday,
        completedCount: 0,
        totalCount: 0,
      };
    }

    if (isToday) {
      return {
        date: cellIso,
        label: SHORT_WEEKDAYS_TR[idx]!,
        dayOfMonth,
        state: todayIsDone
          ? WeekDayState.TodayDone
          : WeekDayState.TodayPending,
        isToday,
        completedCount: completedToday,
        totalCount: totalToday,
      };
    }

    return {
      date: cellIso,
      label: SHORT_WEEKDAYS_TR[idx]!,
      dayOfMonth,
      state: resolvePastState(entry),
      isToday,
      completedCount: entry?.completedCount ?? 0,
      totalCount: entry?.totalCount ?? 0,
    };
  });
};

interface MonthCalendarInput extends StreakCalendarInput {
  year: number;
  month: number;
}

const toLevel = (completedCount: number, totalCount: number): number => {
  if (totalCount <= 0 || completedCount <= 0) return 0;
  return Math.max(1, Math.min(5, Math.round((completedCount / totalCount) * 5)));
};

export const buildMonthCalendar = ({
  year,
  month,
  today = new Date(),
  history,
  completedToday,
  totalToday,
}: MonthCalendarInput): MonthCalendar => {
  const todayDate = startOfDay(today);
  const todayIso = buildLocalDateString(todayDate);
  const firstOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leadingBlanks = toMondayIndex(firstOfMonth);
  const byDate = indexHistory(history);

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
      const todayLevel = toLevel(completedToday, totalToday);
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

    const entry = byDate.get(cellIso);

    if (!entry) {
      cells.push({
        kind: MonthCellKind.Past,
        day,
        level: 0,
        perfect: false,
        date: cellIso,
      });
      continue;
    }

    if (entry.isFrozen) {
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

    const level = toLevel(entry.completedCount, entry.totalCount);

    totalCompletedPrayers += entry.completedCount;
    if (entry.isComplete) perfectDays += 1;

    viableDayCount += 1;
    if (level >= 4) viableSuccessCount += 1;

    cells.push({
      kind: MonthCellKind.Past,
      day,
      level,
      perfect: entry.isComplete,
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

