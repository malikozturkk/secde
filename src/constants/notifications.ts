import type { NotificationTopic } from "@/src/types/notifications.types";

export const NOTIFICATION_QUERY_KEYS = {
  preferences: ["notifications", "preferences"] as const,
  publicKey: ["notifications", "public-key"] as const,
  feed: ["notifications", "feed"] as const,
};

export const NOTIFICATION_GROUPS: ReadonlyArray<{
  key: string;
  title: string;
  topics: readonly NotificationTopic[];
}> = [
  {
    key: "PRAYER",
    title: "Namaz vakitleri",
    topics: ["PRAYER_TIME", "MARK_WINDOW_CLOSING"],
  },
  {
    key: "STREAK",
    title: "Seri ve ilerleme",
    topics: ["STREAK_AT_RISK"],
  },
  {
    key: "SOCIAL",
    title: "Sosyal",
    topics: ["NEW_FOLLOWER"],
  },
];
