"use client";

import Link from "next/link";
import { BellOff, BellRing, Check, Loader2 } from "lucide-react";
import AppLayout from "@/src/components/layout/AppLayout";
import SettingsRightPanel from "@/src/components/settings/SettingsRightPanel";
import { Button } from "@/src/components/ui/Button";
import { usePushNotifications } from "@/src/hooks/notifications/usePushNotifications";
import { NOTIFICATION_GROUPS } from "@/src/constants/notifications";
import { TEXT } from "@/src/constants/surface";
import { cn } from "@/src/lib/utils";
import type {
  NotificationPreference,
  NotificationTopic,
} from "@/src/types/notifications.types";

interface TopicRowProps {
  preference: NotificationPreference;
  isPending: boolean;
  onToggle: (topic: NotificationTopic, enabled: boolean) => void;
}

function TopicRow({ preference, isPending, onToggle }: TopicRowProps) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-6 border-b-[length:var(--ng-stroke)] border-[var(--ng-edge)] py-4 last:border-b-0">
      <span>
        <span className="block text-[15px] font-extrabold text-white">
          {preference.title}
        </span>
        <span className="mt-1 block max-w-[440px] text-[13px] font-medium leading-relaxed text-[var(--ng-text-3)]">
          {preference.description}
        </span>
      </span>

      <input
        type="checkbox"
        checked={preference.enabled}
        onChange={(event) => onToggle(preference.topic, event.target.checked)}
        aria-busy={isPending}
        className="sr-only"
      />
      <span
        aria-hidden="true"
        className={cn(
          "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-[6px] border-2 transition-colors",
          preference.enabled
            ? "border-[#4fc3f7] bg-[#4fc3f7]"
            : "border-[var(--ng-edge-strong)] bg-transparent",
          isPending && "opacity-60"
        )}
      >
        {preference.enabled && (
          <Check size={16} strokeWidth={4} className="text-[#0f1720]" />
        )}
      </span>
    </label>
  );
}

export default function NotificationsSettingsClient() {
  const {
    permission,
    isSubscribed,
    isSyncing,
    error,
    preferences,
    isLoadingPreferences,
    updatePreference,
    preferenceError,
    pendingTopics,
    sendTestNotification,
    isSendingTest,
    testResult,
    enableOnThisDevice,
    disableOnThisDevice,
  } = usePushNotifications();

  const byTopic = new Map(preferences.map((p) => [p.topic, p]));
  const isUnsupported = permission === "unsupported";
  const isBlocked = permission === "denied";
  const isDeviceReady = permission === "granted" && isSubscribed;

  const handleToggle = (topic: NotificationTopic, enabled: boolean) => {
    updatePreference.mutate({ topic, enabled });
  };

  return (
    <AppLayout rightPanel={<SettingsRightPanel active="notifications" />}>
      <h1 className={cn(TEXT.h2, "mb-2")}>Bildirimler</h1>
      <p className="mb-6 max-w-[560px] text-sm font-medium leading-relaxed text-[var(--ng-text-3)]">
        Hangi bildirimleri alacağını buradan seçersin. Hepsi varsayılan olarak
        kapalıdır ve istediğin an kapatabilirsin. Bildirim tercihlerin{" "}
        <Link
          href="/privacy"
          className="font-bold text-[#4fc3f7] underline underline-offset-2"
        >
          Aydınlatma Metni
        </Link>{" "}
        kapsamında açık rızanla işlenir.
      </p>

      <section className="mb-4 rounded-[var(--ng-radius-lg)] border-[length:var(--ng-stroke)] border-[var(--ng-edge)] bg-[var(--ng-surface)] p-5">
        <div className="mb-2 flex items-center gap-2.5">
          {isDeviceReady ? (
            <BellRing size={18} className="text-[var(--ng-green)]" />
          ) : (
            <BellOff size={18} className="text-[var(--ng-text-3)]" />
          )}
          <h2 className="font-sans text-base font-extrabold text-white">
            Bu cihaz
          </h2>
        </div>

        {isUnsupported ? (
          <p className="text-sm font-medium leading-relaxed text-[var(--ng-text-3)]">
            Bu tarayıcı web bildirimlerini desteklemiyor. Chrome, Edge veya
            Firefox&apos;un güncel bir sürümünü kullanabilirsin. iPhone&apos;da
            bildirim alabilmek için siteyi ana ekrana eklemen gerekiyor.
          </p>
        ) : isBlocked ? (
          <p className="text-sm font-medium leading-relaxed text-[var(--ng-text-3)]">
            Bildirim izni bu tarayıcıda engellenmiş. Adres çubuğundaki kilit
            simgesinden izni açtıktan sonra bu sayfayı yenile.
          </p>
        ) : (
          <>
            <p className="mb-4 text-sm font-medium leading-relaxed text-[var(--ng-text-3)]">
              {isDeviceReady
                ? "Bu cihaz bildirim almaya hazır. Aşağıdaki başlıklardan açtıklarını buraya göndeririz."
                : "Bildirim alabilmek için önce bu cihaza izin vermen gerekiyor. İzin yalnızca bu tarayıcı için geçerlidir."}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={() =>
                  isDeviceReady
                    ? void disableOnThisDevice()
                    : void enableOnThisDevice()
                }
                disabled={isSyncing}
                size="lg"
                className="w-full sm:w-auto"
              >
                {isSyncing
                  ? "İŞLENİYOR..."
                  : isDeviceReady
                    ? "BİLDİRİMLERİ KAPAT"
                    : "BİLDİRİMLERE İZİN VER"}
              </Button>

              {isDeviceReady && (
                <Button
                  variant="ghost"
                  onClick={() => void sendTestNotification()}
                  disabled={isSendingTest}
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {isSendingTest ? "GÖNDERİLİYOR..." : "DENEME BİLDİRİMİ GÖNDER"}
                </Button>
              )}
            </div>

            {testResult && (
              <p
                className={cn(
                  "mt-3 text-sm font-bold",
                  testResult.ok ? "text-[var(--ng-green)]" : "text-red-400"
                )}
              >
                {testResult.message}
              </p>
            )}
          </>
        )}

        {error && <p className="mt-3 text-sm font-bold text-red-400">{error}</p>}
      </section>

      {isLoadingPreferences ? (
        <div className="flex items-center gap-2 p-5 text-sm font-bold text-[var(--ng-text-3)]">
          <Loader2 size={16} className="animate-spin" />
          Tercihler yükleniyor...
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {NOTIFICATION_GROUPS.map((group) => {
            const rows = group.topics
              .map((topic) => byTopic.get(topic))
              .filter((p): p is NotificationPreference => Boolean(p));

            if (rows.length === 0) return null;

            return (
              <section
                key={group.key}
                className="rounded-[var(--ng-radius-lg)] border-[length:var(--ng-stroke)] border-[var(--ng-edge)] bg-[var(--ng-surface)] px-5 py-2"
              >
                <div className="flex items-center justify-between border-b-[length:var(--ng-stroke)] border-[var(--ng-edge)] py-3">
                  <h2 className="font-sans text-base font-extrabold text-white">
                    {group.title}
                  </h2>
                  <span className="text-[11px] font-black uppercase tracking-[0.12em] text-[var(--ng-text-3)]">
                    Bildirim
                  </span>
                </div>
                {rows.map((preference) => (
                  <TopicRow
                    key={preference.topic}
                    preference={preference}
                    isPending={pendingTopics.has(preference.topic)}
                    onToggle={handleToggle}
                  />
                ))}
              </section>
            );
          })}
        </div>
      )}

      {preferenceError && (
        <p className="mt-4 text-sm font-bold text-red-400">{preferenceError}</p>
      )}

      <p className="mt-6 max-w-[560px] text-[12px] font-semibold leading-relaxed text-[var(--ng-text-3)]">
        Bildirim içerikleri cihazına şifreli olarak iletilir; bildirim
        sağlayıcısı (tarayıcının push servisi) içeriği okuyamaz. Gönderim
        kayıtları aynı bildirimin iki kez gitmemesi için 30 gün saklanır, sonra
        silinir. Hesabını sildiğinde tüm bildirim kayıtların da silinir.
      </p>
    </AppLayout>
  );
}
