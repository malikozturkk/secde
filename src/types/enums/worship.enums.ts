export enum PrayerKey {
  Fajr = "fajr",
  Sunrise = "sunrise",
  Dhuhr = "dhuhr",
  Asr = "asr",
  Maghrib = "maghrib",
  Isha = "isha",
}

export enum PrayerState {
  Passed = "passed",
  Current = "current",
  Upcoming = "upcoming",
}

export enum Madhab {
  Shafi = "Shafi",
  Hanafi = "Hanafi",
}

export enum WorshipPageState {
  Normal = "normal",
  Loading = "loading",
  Error = "error",
  Empty = "empty",
  GeoDenied = "geo-denied",
  NoLocation = "no-location",
}
