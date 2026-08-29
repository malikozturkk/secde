export enum ToolId {
  Qibla = "qibla",
  Dhikr = "dhikr",
  Zakat = "zakat",
}

export enum CompassStatus {
  Idle = "idle",
  Active = "active",
  Denied = "denied",
  Unsupported = "unsupported",
}

export enum NisabBasis {
  Gold = "gold",
  Silver = "silver",
}

export enum HeadingReference {
  True = "true",
  Magnetic = "magnetic",
}

export enum GeolocationStatus {
  Idle = "idle",
  Locating = "locating",
  Ready = "ready",
  Denied = "denied",
  Unavailable = "unavailable",
  Timeout = "timeout",
}

export enum QiblaOriginSource {
  Gps = "gps",
  ProfileCity = "profile-city",
  GuestCity = "guest-city",
}
