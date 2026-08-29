import { axiosInstance } from "../lib/axios";
import type { ApiResponse } from "@/src/types/api.types";
import type {
  CreatePushSubscriptionPayload,
  NotificationFeedResponse,
  NotificationPreferencesResponse,
  TestNotificationResult,
  UpdateNotificationPreferencePayload,
  VapidPublicKeyResponse,
} from "@/src/types/notifications.types";

export const notificationsService = {
  getPublicKey: () =>
    axiosInstance.get<ApiResponse<VapidPublicKeyResponse>>(
      "/notifications/public-key"
    ),

  getFeed: () =>
    axiosInstance.get<ApiResponse<NotificationFeedResponse>>(
      "/notifications/feed"
    ),

  markFeedRead: () =>
    axiosInstance.post<ApiResponse<NotificationFeedResponse>>(
      "/notifications/feed/read"
    ),

  getPreferences: () =>
    axiosInstance.get<ApiResponse<NotificationPreferencesResponse>>(
      "/notifications/preferences"
    ),

  updatePreference: (payload: UpdateNotificationPreferencePayload) =>
    axiosInstance.put<ApiResponse<NotificationPreferencesResponse>>(
      "/notifications/preferences",
      payload
    ),

  subscribe: (payload: CreatePushSubscriptionPayload) =>
    axiosInstance.post<ApiResponse<{ id: string }>>(
      "/notifications/subscriptions",
      payload
    ),

  sendTest: () =>
    axiosInstance.post<ApiResponse<TestNotificationResult>>(
      "/notifications/test"
    ),

  unsubscribe: (endpoint: string) =>
    axiosInstance.delete<ApiResponse<null>>("/notifications/subscriptions", {
      data: { endpoint },
    }),
};
