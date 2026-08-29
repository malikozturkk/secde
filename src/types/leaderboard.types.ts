import type {
  LeaderboardMetric,
  LeaderboardPeriod,
  LeaderboardScope,
} from "./enums/leaderboard.enums";
import type { AvatarCustomization } from "./auth.types";

export interface LeaderboardEntry {
  rank: number;
  username: string;
  city: string | null;
  avatarCustomization: AvatarCustomization;
  score: number;
  isCurrentUser: boolean;
}

export interface LeaderboardData {
  metric: LeaderboardMetric;
  scope: LeaderboardScope;
  period: LeaderboardPeriod;
  city: string | null;
  entries: LeaderboardEntry[];
  currentUser: {
    rank: number | null;
    score: number;
    inTopList: boolean;
  };
}

export interface LeaderboardQuery {
  metric?: LeaderboardMetric;
  scope?: LeaderboardScope;
  period?: LeaderboardPeriod;
  limit?: number;
}
