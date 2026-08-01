export enum PrayerType {
  Fajr = "FAJR",
  Dhuhr = "DHUHR",
  Asr = "ASR",
  Maghrib = "MAGHRIB",
  Isha = "ISHA",
  Jumuah = "JUMUAH",
  Tarawih = "TARAWIH",
  EidFitr = "EID_FITR",
  EidAdha = "EID_ADHA",
}

export enum PrayerCategory {
  Daily = "DAILY",
  Weekly = "WEEKLY",
  Ramadan = "RAMADAN",
  Eid = "EID",
}

export enum GamificationActionType {
  StreakFreeze = "STREAK_FREEZE",
}

export enum PrayerCompletionStatus {
  OnTime = "ON_TIME",
  Late = "LATE",
}

export enum PrayerCardState {
  Locked = "locked",
  Eligible = "eligible",
  Current = "current",
  Late = "late",
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
