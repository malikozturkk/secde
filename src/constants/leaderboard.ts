import type { LeaderboardQuery } from "@/src/types/leaderboard.types";

export const LEADERBOARD_QUERY_KEYS = {
  all: ["leaderboard"] as const,
  list: (params: LeaderboardQuery) => ["leaderboard", params] as const,
} as const;

export const LEADERBOARD_STALE_TIME_MS = 5 * 60 * 1000;

export const LEADERBOARD_PREVIEW_LIMIT = 5;
