"use client";

import { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notificationsService } from "@/src/services/notifications.service";
import { NOTIFICATION_QUERY_KEYS } from "@/src/constants/notifications";
import {
  getExistingSubscription,
  isPushSupported,
  registerServiceWorker,
  serializeSubscription,
  urlBase64ToUint8Array,
} from "@/src/lib/push";
import type {
  NotificationPreference,
  NotificationPreferencesResponse,
  NotificationTopic,
  PushPermission,
  UpdateNotificationPreferencePayload,
} from "@/src/types/notifications.types";

export function usePushNotifications() {
  const queryClient = useQueryClient();
  const [permission, setPermission] = useState<PushPermission>("default");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preferenceError, setPreferenceError] = useState<string | null>(null);
  const [pendingTopics, setPendingTopics] = useState<Set<NotificationTopic>>(
    () => new Set()
  );
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [testResult, setTestResult] = useState<{
    ok: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    if (!isPushSupported()) {
      setPermission("unsupported");
      return;
    }
    setPermission(Notification.permission as PushPermission);
    void getExistingSubscription().then((sub) => setIsSubscribed(Boolean(sub)));
  }, []);

  const preferencesQuery = useQuery<NotificationPreferencesResponse>({
    queryKey: NOTIFICATION_QUERY_KEYS.preferences,
    queryFn: async () => {
      const { data } = await notificationsService.getPreferences();
      if (!data.data) throw new Error("Notification preferences missing data");
      return data.data;
    },
  });

  const patchTopic = useCallback(
    (topic: NotificationTopic, patch: Partial<NotificationPreference>) => {
      let previous: NotificationPreference | undefined;
      queryClient.setQueryData<NotificationPreferencesResponse>(
        NOTIFICATION_QUERY_KEYS.preferences,
        (current) => {
          if (!current) return current;
          return {
            ...current,
            topics: current.topics.map((item) => {
              if (item.topic !== topic) return item;
              previous = item;
              return { ...item, ...patch };
            }),
          };
        }
      );
      return previous;
    },
    [queryClient]
  );

  const updatePreference = useMutation({
    mutationFn: (payload: UpdateNotificationPreferencePayload) =>
      notificationsService.updatePreference(payload),

    onMutate: ({ topic, enabled }) => {
      setPreferenceError(null);
      setPendingTopics((prev) => new Set(prev).add(topic));
      const previous = patchTopic(topic, { enabled });
      return { previousEnabled: previous?.enabled ?? !enabled };
    },

    onSuccess: ({ data }, { topic }) => {
      const fresh = data.data?.topics.find((t) => t.topic === topic);
      if (fresh) patchTopic(topic, fresh);
    },

    onError: (_error, { topic }, context) => {
      patchTopic(topic, { enabled: context?.previousEnabled ?? false });
      setPreferenceError("Tercih kaydedilemedi. Lütfen tekrar dene.");
    },

    onSettled: (_data, _error, { topic }) => {
      setPendingTopics((prev) => {
        const next = new Set(prev);
        next.delete(topic);
        return next;
      });
    },
  });

  const sendTestNotification = useCallback(async (): Promise<void> => {
    setTestResult(null);
    setIsSendingTest(true);
    try {
      const { data } = await notificationsService.sendTest();
      const delivered = data.data?.delivered ?? 0;
      setTestResult(
        delivered > 0
          ? { ok: true, message: "Deneme bildirimi gönderildi." }
          : {
              ok: false,
              message:
                "Bu hesapta kayıtlı cihaz yok. Önce bu cihaza izin vermelisin.",
            }
      );
    } catch {
      setTestResult({
        ok: false,
        message: "Deneme bildirimi gönderilemedi. Lütfen tekrar dene.",
      });
    } finally {
      setIsSendingTest(false);
    }
  }, []);

  const enableOnThisDevice = useCallback(async (): Promise<boolean> => {
    setError(null);

    if (!isPushSupported()) {
      setPermission("unsupported");
      setError("Bu tarayıcı bildirimleri desteklemiyor.");
      return false;
    }

    setIsSyncing(true);
    try {
      const result = (await Notification.requestPermission()) as PushPermission;
      setPermission(result);
      if (result !== "granted") {
        setError(
          "Bildirim izni verilmedi. Tarayıcı ayarlarından izin vermen gerekiyor."
        );
        return false;
      }

      const registration = await registerServiceWorker();
      await navigator.serviceWorker.ready;

      const existing = await registration.pushManager.getSubscription();
      let subscription = existing;

      if (!subscription) {
        const { data } = await notificationsService.getPublicKey();
        const publicKey = data.data?.publicKey;
        if (!publicKey) throw new Error("VAPID public key missing");

        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicKey),
        });
      }

      const serialized = serializeSubscription(subscription);
      if (!serialized) throw new Error("Subscription could not be serialized");

      await notificationsService.subscribe({
        ...serialized,
        userAgent: navigator.userAgent.slice(0, 256),
      });

      setIsSubscribed(true);
      return true;
    } catch (err) {
      setError(
        err instanceof Error
          ? "Bildirimler açılamadı. Lütfen tekrar dene."
          : "Bildirimler açılamadı."
      );
      return false;
    } finally {
      setIsSyncing(false);
    }
  }, []);

  const disableOnThisDevice = useCallback(async (): Promise<void> => {
    setError(null);
    setIsSyncing(true);
    try {
      const subscription = await getExistingSubscription();
      if (subscription) {
        await notificationsService.unsubscribe(subscription.endpoint);
        await subscription.unsubscribe();
      }
      setIsSubscribed(false);
    } catch {
      setError("Cihaz kaydı kaldırılamadı. Lütfen tekrar dene.");
    } finally {
      setIsSyncing(false);
    }
  }, []);

  return {
    permission,
    isSubscribed,
    isSyncing,
    error,
    preferences: preferencesQuery.data?.topics ?? [],
    isLoadingPreferences: preferencesQuery.isLoading,
    preferencesError: preferencesQuery.error,
    updatePreference,
    preferenceError,
    pendingTopics,
    sendTestNotification,
    isSendingTest,
    testResult,
    enableOnThisDevice,
    disableOnThisDevice,
  };
}
