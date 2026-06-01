import {
  PrayerCardState,
  PrayerType,
  StreakHeroVariant,
} from "../types/enums/streak.enums";
import {
  PRAYER_META,
  STREAK_DAY_COMPLETED_MESSAGE,
  STREAK_FRESH_DAY_MESSAGE,
  STREAK_HERO_CHARACTER_POOL,
  STREAK_HERO_LEVEL_LABEL_FALLBACK,
  STREAK_HERO_LEVEL_TITLES,
  STREAK_LOCALE,
  STREAK_MESSAGES,
  STREAK_TIME_FORMAT_OPTIONS,
  type StreakCharacterName,
} from "../constants/streak";
import type {
  DailyPrayersResponse,
  DailyPrayersViewModel,
  PrayerCardDto,
  PrayerCardViewModel,
} from "../types/streak.types";

const MS_PER_SECOND = 1000;

export const clampPercent = (value: number): number =>
  Math.max(0, Math.min(100, Math.round(value)));

const parseIsoMs = (iso: string): number => {
  const ms = new Date(iso).getTime();
  return Number.isFinite(ms) ? ms : Number.NaN;
};

export const formatPrayerTime = (iso: string): string => {
  const ms = parseIsoMs(iso);
  if (!Number.isFinite(ms)) return "";
  return new Date(ms).toLocaleTimeString(
    STREAK_LOCALE,
    STREAK_TIME_FORMAT_OPTIONS
  );
};

export const formatPrayerDate = (
  date: Date,
  options: Intl.DateTimeFormatOptions
): string => date.toLocaleDateString(STREAK_LOCALE, options);

export const buildPrayerCardViewModel = (
  dto: PrayerCardDto,
  nowMs: number
): PrayerCardViewModel => {
  const startMs = parseIsoMs(dto.windowStartsAt);
  const endMs = parseIsoMs(dto.windowEndsAt);
  const scheduledMs = parseIsoMs(dto.scheduledAt);

  const hasWindow =
    Number.isFinite(startMs) && Number.isFinite(endMs) && endMs > startMs;

  const secondsUntilOpens = hasWindow
    ? Math.max(0, Math.floor((startMs - nowMs) / MS_PER_SECOND))
    : 0;
  const secondsUntilCloses = hasWindow
    ? Math.max(0, Math.floor((endMs - nowMs) / MS_PER_SECOND))
    : 0;

  const windowProgressPercent = hasWindow
    ? clampPercent(((nowMs - startMs) / (endMs - startMs)) * 100)
    : 0;

  let state: PrayerCardState;
  if (dto.isCompleted) {
    state = PrayerCardState.Completed;
  } else if (!hasWindow || nowMs < startMs) {
    state = PrayerCardState.Locked;
  } else if (nowMs >= startMs && nowMs <= endMs) {
    state = dto.canMarkAsCompleted
      ? nowMs >= scheduledMs
        ? PrayerCardState.Current
        : PrayerCardState.Eligible
      : PrayerCardState.Locked;
  } else {
    state = PrayerCardState.Missed;
  }

  return {
    type: dto.type,
    category: dto.category,
    isObligatory: dto.isObligatory,
    scheduledAt: dto.scheduledAt,
    scheduledTimeLabel: formatPrayerTime(dto.scheduledAt),
    windowStartsAt: dto.windowStartsAt,
    windowEndsAt: dto.windowEndsAt,
    xpReward: dto.xpReward,
    isCompleted: dto.isCompleted,
    canMarkAsCompleted: dto.canMarkAsCompleted,
    completedAt: dto.completedAt,
    completedAtLabel: dto.completedAt
      ? formatPrayerTime(dto.completedAt)
      : null,
    streakContribution: dto.streakContribution,
    pendingQuizId: dto.pendingQuizId,
    state,
    secondsUntilOpens,
    secondsUntilCloses,
    windowProgressPercent,
  };
};

export const buildDailyPrayersViewModel = (
  payload: DailyPrayersResponse,
  nowMs: number
): DailyPrayersViewModel => {
  const prayers = payload.prayers.map((dto) =>
    buildPrayerCardViewModel(dto, nowMs)
  );

  const totalToday = prayers.length;
  const completedToday = prayers.filter((p) => p.isCompleted).length;
  const remainingToday = totalToday - completedToday;
  const progressPercent =
    totalToday === 0 ? 0 : Math.round((completedToday / totalToday) * 100);
  const activePrayer =
    prayers.find(
      (p) =>
        p.state === PrayerCardState.Current ||
        p.state === PrayerCardState.Eligible
    ) ?? null;

  return {
    date: payload.date,
    timezone: payload.timezone,
    isFriday: payload.isFriday,
    isRamadan: payload.isRamadan,
    isEidDay: payload.isEidDay,
    prayers,
    totalToday,
    completedToday,
    remainingToday,
    progressPercent,
    allCompleted: totalToday > 0 && completedToday === totalToday,
    activePrayer,
  };
};

export const resolveStreakMessage = ({
  currentStreak,
  completedToday,
  totalToday,
}: {
  currentStreak: number;
  completedToday: number;
  totalToday: number;
}): string => {
  if (totalToday === 0) return STREAK_FRESH_DAY_MESSAGE;
  if (completedToday >= totalToday) return STREAK_DAY_COMPLETED_MESSAGE;

  for (const range of STREAK_MESSAGES) {
    if (currentStreak >= range.min) return range.text;
  }
  return STREAK_MESSAGES[STREAK_MESSAGES.length - 1]!.text;
};

export const pickHeroCharacter = (seed: number): StreakCharacterName => {
  const safeSeed = Number.isFinite(seed) && seed >= 0 ? Math.floor(seed) : 0;
  return STREAK_HERO_CHARACTER_POOL[
    safeSeed % STREAK_HERO_CHARACTER_POOL.length
  ]!;
};

export const resolveHeroVariant = ({
  isEidDay,
  isFriday,
  isRamadan,
}: {
  isEidDay: boolean;
  isFriday: boolean;
  isRamadan: boolean;
}): StreakHeroVariant => {
  if (isEidDay) return StreakHeroVariant.Bayram;
  if (isFriday) return StreakHeroVariant.Cuma;
  if (isRamadan) return StreakHeroVariant.Ramazan;
  return StreakHeroVariant.Normal;
};

export const getPrayerMeta = (type: PrayerType) => PRAYER_META[type];

export const resolveLevelTitle = (level: number): string => {
  const thresholds = Object.keys(STREAK_HERO_LEVEL_TITLES)
    .map(Number)
    .filter((n) => Number.isFinite(n))
    .sort((a, b) => b - a);
  for (const threshold of thresholds) {
    if (level >= threshold) {
      return (
        STREAK_HERO_LEVEL_TITLES[threshold] ?? STREAK_HERO_LEVEL_LABEL_FALLBACK
      );
    }
  }
  return STREAK_HERO_LEVEL_LABEL_FALLBACK;
};

export const formatCountdown = (seconds: number): string => {
  if (!Number.isFinite(seconds) || seconds < 0) return "0 dk";
  if (seconds < 60) return `${seconds} sn`;
  const totalMinutes = Math.floor(seconds / 60);
  if (totalMinutes < 60) return `${totalMinutes} dk`;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours} sa ${String(minutes).padStart(2, "0")} dk`;
};

export const buildPrayerCompletionRequestId = (
  prayerType: PrayerType,
  date: string
): string =>
  `complete-${prayerType.toLowerCase()}-${date}-${Math.random()
    .toString(36)
    .slice(2, 10)}`;
