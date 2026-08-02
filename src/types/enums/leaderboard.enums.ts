export enum LeaderboardMetric {
  Xp = "XP",
  Streak = "STREAK",
  Prayers = "PRAYERS",
}

export enum LeaderboardScope {
  Global = "GLOBAL",
  City = "CITY",
  Following = "FOLLOWING",
}

export enum LeaderboardPeriod {
  AllTime = "ALL_TIME",
  Weekly = "WEEKLY",
  Monthly = "MONTHLY",
}

export const LEADERBOARD_METRIC_LABELS: Record<LeaderboardMetric, string> = {
  [LeaderboardMetric.Streak]: "Seri Liderleri",
  [LeaderboardMetric.Xp]: "XP Liderleri",
  [LeaderboardMetric.Prayers]: "En Çok Vakit Kılanlar",
};

export const LEADERBOARD_METRIC_UNIT: Record<LeaderboardMetric, string> = {
  [LeaderboardMetric.Streak]: "gün",
  [LeaderboardMetric.Xp]: "XP",
  [LeaderboardMetric.Prayers]: "vakit",
};
