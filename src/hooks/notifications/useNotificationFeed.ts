"use client";

import { useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notificationsService } from "@/src/services/notifications.service";
import { NOTIFICATION_QUERY_KEYS } from "@/src/constants/notifications";
import { useAuthStore } from "@/src/store/auth.store";
import type { NotificationFeedResponse } from "@/src/types/notifications.types";

const FEED_POLL_INTERVAL_MS = 60_000;
const EMPTY_FEED: NotificationFeedResponse = { items: [], unreadCount: 0 };

export function useNotificationFeed() {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  const feedQuery = useQuery<NotificationFeedResponse>({
    queryKey: NOTIFICATION_QUERY_KEYS.feed,
    queryFn: async () => {
      const { data } = await notificationsService.getFeed();
      return data.data ?? EMPTY_FEED;
    },
    enabled: Boolean(user),
    refetchInterval: FEED_POLL_INTERVAL_MS,
    refetchOnWindowFocus: true,
  });

  const markRead = useMutation({
    mutationFn: () => notificationsService.markFeedRead(),

    onMutate: () => {
      queryClient.setQueryData<NotificationFeedResponse>(
        NOTIFICATION_QUERY_KEYS.feed,
        (current) =>
          current
            ? {
                ...current,
                unreadCount: 0,
                items: current.items.map((item) => ({ ...item, read: true })),
              }
            : current
      );
    },

    onSuccess: ({ data }) => {
      if (data.data) {
        queryClient.setQueryData(NOTIFICATION_QUERY_KEYS.feed, data.data);
      }
    },

    onError: () => {
      void queryClient.invalidateQueries({
        queryKey: NOTIFICATION_QUERY_KEYS.feed,
      });
    },
  });

  const feed = feedQuery.data ?? EMPTY_FEED;

  const markAllRead = useCallback(() => {
    if (feed.unreadCount === 0) return;
    markRead.mutate();
  }, [feed.unreadCount, markRead]);

  return {
    items: feed.items,
    unreadCount: feed.unreadCount,
    isLoading: feedQuery.isLoading,
    markAllRead,
  };
}
