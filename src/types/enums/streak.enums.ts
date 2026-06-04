export enum PrayerType {
  Fajr = "FAJR",
  Dhuhr = "DHUHR",
  Asr = "ASR",
  Maghrib = "MAGHRIB",
  Isha = "ISHA",
  Jumuah = "JUMUAH",
  Teravih = "TERAVIH",
  Bayram = "BAYRAM",
}

export enum PrayerCategory {
  Obligatory = "OBLIGATORY",
  Friday = "FRIDAY",
  Taraweeh = "TARAWEEH",
  Eid = "EID",
}

export enum GamificationActionType {
  StreakFreeze = "STREAK_FREEZE",
}

export enum PrayerCardState {
  Locked = "locked",
  Eligible = "eligible",
  Current = "current",
  Completed = "completed",
  Missed = "missed",
  MarkingLocked = "marking-locked",
}

export enum PrayerQuizStatus {
  Pending = "PENDING",
  Passed = "PASSED",
  Failed = "FAILED",
  Expired = "EXPIRED",
}

export enum PrayerQuestionStatus {
  Pending = "PENDING",
  Shown = "SHOWN",
  Correct = "CORRECT",
  Incorrect = "INCORRECT",
  Expired = "EXPIRED",
  Locked = "LOCKED",
}

export enum PrayerAnswerResult {
  Correct = "CORRECT",
  Incorrect = "INCORRECT",
  Expired = "EXPIRED",
}

export enum StreakHeroVariant {
  Normal = "normal",
  Cuma = "cuma",
  Ramazan = "ramazan",
  Bayram = "bayram",
}
