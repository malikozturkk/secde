"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AlarmClock, Bell, Flame, Sunrise, UserPlus } from "lucide-react";
import { MOTION_FADE, MOTION_REDUCED, MOTION_SPRING } from "@/src/constants/motion";
import { useNotificationFeed } from "@/src/hooks/notifications/useNotificationFeed";
import { formatDistanceToNowTr } from "@/src/lib/relative-time";
import { cn } from "@/src/lib/utils";
import type {
  NotificationFeedItem,
  NotificationTopic,
} from "@/src/types/notifications.types";

const TOPIC_ICON: Record<NotificationTopic, React.ReactNode> = {
  PRAYER_TIME: <Sunrise size={18} />,
  MARK_WINDOW_CLOSING: <AlarmClock size={18} />,
  STREAK_AT_RISK: <Flame size={18} />,
  NEW_FOLLOWER: <UserPlus size={18} />,
};

interface NotificationBellProps {
  variant: "sidebar" | "mobile";
  classNames?: {
    trigger?: string;
    triggerActive?: string;
    icon?: string;
    label?: string;
  };
}

function NotificationItem({
  item,
  onNavigate,
}: {
  item: NotificationFeedItem;
  onNavigate: (url: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onNavigate(item.url)}
      className={cn(
        "flex w-full items-start gap-3 rounded-[var(--ng-radius)] px-3 py-3 text-left transition-colors",
        "hover:bg-white/[0.06]",
        !item.read && "bg-white/[0.04]"
      )}
    >
      <span
        className={cn(
          "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
          item.read
            ? "bg-white/[0.06] text-[var(--ng-text-3)]"
            : "bg-[#4fc3f7]/15 text-[#4fc3f7]"
        )}
      >
        {TOPIC_ICON[item.topic]}
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="block truncate text-[14px] font-extrabold text-white">
            {item.title}
          </span>
          {!item.read && (
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#4fc3f7]" />
          )}
        </span>
        <span className="mt-0.5 block text-[13px] font-medium leading-relaxed text-[var(--ng-text-3)]">
          {item.body}
        </span>
        <span className="mt-1 block text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--ng-text-3)]">
          {formatDistanceToNowTr(item.sentAt)}
        </span>
      </span>
    </button>
  );
}

export default function NotificationBell({
  variant,
  classNames,
}: NotificationBellProps) {
  const router = useRouter();
  const prefersReduced = useReducedMotion();
  const { items, unreadCount, isLoading, markAllRead } = useNotificationFeed();
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const open = () => {
    setHasOpened(true);
    setIsOpen(true);
    markAllRead();
  };

  const handleNavigate = (url: string) => {
    setIsOpen(false);
    router.push(url);
  };

  const badge =
    unreadCount > 0 ? (unreadCount > 99 ? "99+" : String(unreadCount)) : null;

  const panel = (
    <AnimatePresence>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-[59]"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-label="Bildirimler"
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
            transition={prefersReduced ? MOTION_REDUCED : MOTION_SPRING.ui}
            className={cn(
              "fixed z-[60] w-[380px] overflow-hidden rounded-[var(--ng-radius-lg)]",
              "border-[length:var(--ng-stroke)] border-[var(--ng-edge)] bg-[var(--ng-surface)]",
              "shadow-[0_18px_40px_rgba(0,0,0,0.45)]",
              "bottom-6 left-[calc(var(--sidebar-width)+12px)]",
              "max-lg:left-3 max-lg:right-3 max-lg:w-auto",
              "max-lg:bottom-[calc(var(--mobile-bar-height,80px)+12px)]"
            )}
          >
            <div className="flex items-center justify-between border-b-[length:var(--ng-stroke)] border-[var(--ng-edge)] px-4 py-3">
              <h2 className="font-sans text-[15px] font-extrabold text-white">
                Bildirimler
              </h2>
              <Link
                href="/settings/notifications"
                onClick={() => setIsOpen(false)}
                className="text-[12px] font-black uppercase tracking-[0.08em] text-[#4fc3f7]"
              >
                Ayarlar
              </Link>
            </div>

            <div className="max-h-[min(60vh,440px)] overflow-y-auto p-2">
              {isLoading ? (
                <p className="px-3 py-6 text-center text-sm font-bold text-[var(--ng-text-3)]">
                  Yükleniyor...
                </p>
              ) : items.length === 0 ? (
                <div className="px-4 py-8 text-center">
                  <p className="text-sm font-extrabold text-white">
                    Henüz bildirim yok
                  </p>
                  <p className="mt-1 text-[13px] font-medium leading-relaxed text-[var(--ng-text-3)]">
                    Açtığın hatırlatmalar buraya düşer.
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <NotificationItem
                    key={item.id}
                    item={item}
                    onNavigate={handleNavigate}
                  />
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => (isOpen ? setIsOpen(false) : open())}
        aria-label={
          badge ? `Bildirimler, ${unreadCount} okunmamış` : "Bildirimler"
        }
        aria-expanded={isOpen}
        className={cn(classNames?.trigger, isOpen && classNames?.triggerActive)}
      >
        <span className={cn("relative", classNames?.icon)}>
          <Bell />
          {badge && (
            <motion.span
              initial={prefersReduced ? false : { scale: 0.6 }}
              animate={{ scale: 1 }}
              transition={prefersReduced ? MOTION_REDUCED : MOTION_FADE}
              className={cn(
                "absolute right-0 top-0 flex h-[18px] min-w-[18px] items-center justify-center",
                "rounded-full bg-[#FF4B4B] px-1 text-[11px] font-black leading-none text-white"
              )}
            >
              {badge}
            </motion.span>
          )}
        </span>

        {variant === "sidebar" && (
          <span className={classNames?.label}>Bildirimler</span>
        )}
      </button>

      {hasOpened ? createPortal(panel, document.body) : null}
    </>
  );
}
