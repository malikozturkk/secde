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
  PrayerCompletion = "PRAYER_COMPLETION",
  StreakFreeze = "STREAK_FREEZE",
}

export enum PrayerCardState {
  Locked = "locked",
  Eligible = "eligible",
  Current = "current",
  Completed = "completed",
  Missed = "missed",
}

export enum StreakHeroVariant {
  Normal = "normal",
  Cuma = "cuma",
  Ramazan = "ramazan",
  Bayram = "bayram",
}
