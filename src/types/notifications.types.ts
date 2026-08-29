export type NotificationTopic =
  | "PRAYER_TIME"
  | "MARK_WINDOW_CLOSING"
  | "STREAK_AT_RISK"
  | "NEW_FOLLOWER";

export interface NotificationPreference {
  topic: NotificationTopic;
  title: string;
  description: string;
  enabled: boolean;
  optedInAt: string | null;
  optedOutAt: string | null;
}

export interface NotificationPreferencesResponse {
  topics: NotificationPreference[];
}

export interface UpdateNotificationPreferencePayload {
  topic: NotificationTopic;
  enabled: boolean;
}

export interface VapidPublicKeyResponse {
  publicKey: string;
}

export interface CreatePushSubscriptionPayload {
  endpoint: string;
  p256dh: string;
  auth: string;
  userAgent?: string;
}

export interface TestNotificationResult {
  delivered: number;
}

export type PushPermission = "default" | "granted" | "denied" | "unsupported";

export interface NotificationFeedItem {
  id: string;
  topic: NotificationTopic;
  title: string;
  body: string;
  url: string;
  read: boolean;
  sentAt: string;
}

export interface NotificationFeedResponse {
  items: NotificationFeedItem[];
  unreadCount: number;
}
