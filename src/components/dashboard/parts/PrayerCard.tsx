"use client";

import React, { memo, useCallback } from "react";
import { PrayerIcon } from "@/src/components/worship/PrayerIcon";
import { PrayerKey } from "@/src/types/enums/worship.enums";
import {
  PrayerCardState,
  PrayerCategory,
  PrayerCompletionStatus,
  PrayerType,
} from "@/src/types/enums/streak.enums";
import { PRAYER_META, type PrayerMeta } from "@/src/constants/streak";
import { formatCountdown } from "@/src/lib/streak-utils";
import { ProgressBar } from "@/src/components/ui/ProgressBar";
import { Pill } from "@/src/components/ui/Pill";
import { CharacterIllustration } from "./CharacterIllustration";
import { StatusChip } from "./StatusChip";
import {
  Check,
  ChevronRight,
  Cross,
  Fire,
  Lock,
  XpStar,
} from "@/src/icons/tsx/dashboard";
import { PRAYER_COLORWAY } from "../styles";
import { cn } from "@/src/lib/utils";
import type { PrayerCardViewModel } from "@/src/types/streak.types";

const PRAYER_TYPE_TO_ICON_KEY: Record<PrayerType, PrayerKey> = {
  [PrayerType.Fajr]: PrayerKey.Fajr,
  [PrayerType.Dhuhr]: PrayerKey.Dhuhr,
  [PrayerType.Asr]: PrayerKey.Asr,
  [PrayerType.Maghrib]: PrayerKey.Maghrib,
  [PrayerType.Isha]: PrayerKey.Isha,
  [PrayerType.Jumuah]: PrayerKey.Dhuhr,
  [PrayerType.Tarawih]: PrayerKey.Isha,
  [PrayerType.EidFitr]: PrayerKey.Sunrise,
  [PrayerType.EidAdha]: PrayerKey.Sunrise,
};

const FALLBACK_PRAYER_META: PrayerMeta = {
  type: PrayerType.Fajr,
  label: "Vakit",
  eyebrow: "VAKİT",
  color: "#94A3B8",
  shadow: "#334155",
  tint: "#CBD5E1",
  character: "ataman",
  hint: "",
};

const ROW_BG_BY_STATE: Record<PrayerCardState, string> = {
  [PrayerCardState.Completed]:
    "border-[rgba(37,180,154,0.30)] bg-gradient-to-b from-[rgba(37,180,154,0.10)] to-[#1C2E35] to-60%",
  [PrayerCardState.Missed]:
    "border-[rgba(239,68,68,0.30)] bg-gradient-to-b from-[rgba(239,68,68,0.08)] to-[#1C2E35] to-60%",
  [PrayerCardState.Current]:
    "border-[rgba(255,107,53,0.40)] bg-gradient-to-b from-[rgba(255,107,53,0.13)] to-[#1C2E35] to-60% shadow-[0_6px_0_0_rgba(124,39,8,0.30)]",
  [PrayerCardState.Eligible]:
    "border-[rgba(255,202,107,0.40)] bg-gradient-to-b from-[rgba(245,166,35,0.08)] to-[#1C2E35] to-60%",
  [PrayerCardState.Late]:
    "border-[rgba(245,166,35,0.45)] bg-gradient-to-b from-[rgba(245,166,35,0.12)] to-[#1C2E35] to-60%",
  [PrayerCardState.Locked]: "border-white/[0.06] bg-[#1C2E35] opacity-70",
  [PrayerCardState.MarkingLocked]:
    "border-[rgba(239,68,68,0.35)] bg-gradient-to-b from-[rgba(239,68,68,0.12)] to-[#1C2E35] to-60% opacity-90",
};

const ROW_TIME_BY_STATE: Record<PrayerCardState, string> = {
  [PrayerCardState.Completed]: "text-[var(--color-primary-light)]",
  [PrayerCardState.Missed]: "text-rose-400",
  [PrayerCardState.Current]: "text-[#FF6B35]",
  [PrayerCardState.Eligible]: "text-amber-300",
  [PrayerCardState.Late]: "text-amber-400",
  [PrayerCardState.Locked]: "text-white",
  [PrayerCardState.MarkingLocked]: "text-rose-300",
};

interface PrayerCardProps {
  prayer: PrayerCardViewModel;
  onMark?: (prayer: PrayerCardViewModel) => void;
  isSubmitting?: boolean;
  variant?: "chain" | "inline";
  showSpine?: boolean;
}

const PrayerCardComponent: React.FC<PrayerCardProps> = ({
  prayer,
  onMark,
  isSubmitting = false,
  variant = "chain",
  showSpine = true,
}) => {
  const meta = PRAYER_META[prayer.type] ?? FALLBACK_PRAYER_META;
  const colorway =
    PRAYER_COLORWAY[prayer.type] ?? PRAYER_COLORWAY[PrayerType.Fajr];
  const iconKey = PRAYER_TYPE_TO_ICON_KEY[prayer.type];
  if (process.env.NODE_ENV !== "production" && !PRAYER_META[prayer.type]) {
    console.warn(
      `[PrayerCard] Unknown PrayerType "${prayer.type}" — no PRAYER_META entry. Falling back to defaults.`
    );
  }
  const isInteractive =
    !isSubmitting &&
    !!onMark &&
    prayer.canMarkAsCompleted &&
    (prayer.state === PrayerCardState.Current ||
      prayer.state === PrayerCardState.Eligible ||
      prayer.state === PrayerCardState.Late);

  const handleMark = useCallback(() => {
    if (!isInteractive) return;
    onMark?.(prayer);
  }, [isInteractive, onMark, prayer]);

  const NodeButton = (
    <div className="relative flex w-[94px] shrink-0 items-center justify-center">
      {(prayer.state === PrayerCardState.Current ||
        prayer.state === PrayerCardState.Eligible ||
        prayer.state === PrayerCardState.Late) && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-2 -left-5 z-30 h-16 w-14 animate-[floatBounce_3.6s_ease-in-out_infinite] [filter:drop-shadow(0_6px_8px_rgba(0,0,0,0.4))]"
        >
          <CharacterIllustration character={meta.character} shadow="none" />
        </div>
      )}
      <button
        type="button"
        onClick={handleMark}
        disabled={!isInteractive}
        aria-label={`${meta.label} ${prayer.scheduledTimeLabel}`}
        className={cn(
          "relative grid h-[78px] w-[78px] place-items-center rounded-full",
          "transition-[transform,box-shadow] duration-150 ease-out isolate",
          colorway.nodeBg,
          colorway.nodeShadow,
          isInteractive &&
            "active:translate-y-1 active:shadow-[0_3px_0_0_currentColor]",
          prayer.state === PrayerCardState.Locked &&
            "cursor-not-allowed opacity-90",
          prayer.state === PrayerCardState.MarkingLocked &&
            "cursor-not-allowed opacity-90 grayscale-[0.4]",
          prayer.state === PrayerCardState.Missed && "opacity-80",
          prayer.state === PrayerCardState.Current &&
            "before:absolute before:-inset-2.5 before:rounded-full before:border-[2.5px] before:opacity-55 before:animate-[pulse-ring_2.2s_ease-in-out_infinite] before:content-['']",
          (prayer.state === PrayerCardState.Eligible ||
            prayer.state === PrayerCardState.Late) &&
            "before:absolute before:-inset-2 before:rounded-full before:border-2 before:opacity-35 before:animate-[pulse-ring_2.6s_ease-in-out_infinite] before:content-['']",
          prayer.state === PrayerCardState.Current &&
            `before:${colorway.nodeHalo.replace("ring-", "border-")}`,
          (prayer.state === PrayerCardState.Eligible ||
            prayer.state === PrayerCardState.Late) &&
            `before:${colorway.nodeHalo.replace("ring-", "border-")}`
        )}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-[5px] rounded-full border-2 border-dashed border-white/20"
        />
        {prayer.state === PrayerCardState.Completed ? (
          <Check className="h-10 w-10 text-white [filter:drop-shadow(0_3px_0_rgba(0,0,0,0.35))]" />
        ) : prayer.state === PrayerCardState.Missed ? (
          <Cross className="h-9 w-9 text-white/55" />
        ) : prayer.state === PrayerCardState.Locked ? (
          <Lock className="h-9 w-9 text-white/85" />
        ) : prayer.state === PrayerCardState.MarkingLocked ? (
          <Lock className="h-9 w-9 text-rose-300" />
        ) : iconKey ? (
          <PrayerIcon
            prayer={iconKey}
            className="h-[38px] w-[38px] text-white [filter:drop-shadow(0_2px_0_rgba(0,0,0,0.25))]"
          />
        ) : (
          <span aria-hidden="true" className="text-2xl font-black text-white">
            ★
          </span>
        )}

        {prayer.state === PrayerCardState.Current && (
          <span className="absolute -top-2.5 -right-1 z-40 whitespace-nowrap rounded-full bg-[#FF6B35] px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.08em] text-white shadow-[0_3px_0_0_rgba(124,39,8,0.6)]">
            ŞİMDİ
          </span>
        )}
        {prayer.state === PrayerCardState.Eligible && (
          <span className="absolute -top-2.5 -right-1 z-40 whitespace-nowrap rounded-full bg-[#FF6B35] px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.08em] text-white shadow-[0_3px_0_0_rgba(124,39,8,0.6)]">
            +{prayer.xpReward} XP
          </span>
        )}
        {prayer.state === PrayerCardState.Late && (
          <span className="absolute -top-2.5 -right-1 z-40 whitespace-nowrap rounded-full bg-[var(--color-secondary)] px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.08em] text-[#2A1813] shadow-[0_3px_0_0_rgba(124,80,8,0.6)]">
            KAZA
          </span>
        )}
      </button>
    </div>
  );

  const RowContent = (
    <div
      className={cn(
        "relative flex-1 overflow-hidden rounded-3xl border p-3.5 sm:p-4",
        "flex flex-col gap-1.5",
        ROW_BG_BY_STATE[prayer.state],
        prayer.category !== PrayerCategory.Daily &&
          colorway.rowBorder + " " + colorway.rowBg
      )}
    >
      <div className="flex items-baseline justify-between gap-2">
        <div className="text-[17px] font-black tracking-[-0.01em] text-white">
          {meta.label}
        </div>
        <div
          className={cn(
            "font-display tabular-nums tracking-[0.04em] text-base sm:text-lg",
            ROW_TIME_BY_STATE[prayer.state]
          )}
        >
          {prayer.scheduledTimeLabel}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <StatusChip
          state={prayer.state}
          category={prayer.category}
          completionStatus={prayer.completionStatus}
        />
        <Pill
          tone={prayer.state === PrayerCardState.Late ? "secondary" : "violet"}
          size="sm"
          isCounter
          icon={<XpStar className="h-[9px] w-[9px]" />}
        >
          +{prayer.effectiveXpReward} XP
        </Pill>
        {prayer.state === PrayerCardState.Late && (
          <span className="text-[10px] font-black tracking-[0.06em] text-white/30 line-through">
            +{prayer.xpReward} XP
          </span>
        )}
        {prayer.streakContribution && (
          <Pill
            tone="streak"
            size="sm"
            icon={<Fire className="h-[9px] w-[9px]" />}
          >
            +1 SERİ
          </Pill>
        )}
      </div>

      {prayer.state === PrayerCardState.Eligible && (
        <div className="mt-1.5 flex items-center justify-between gap-2.5">
          <div className="text-[11px] font-bold text-white/35">
            İşaretlemek için{" "}
            <strong className="font-black text-white/55">
              {formatCountdown(prayer.secondsUntilCloses)}
            </strong>{" "}
            kaldı
            <div className="mt-1.5 w-[140px]">
              <ProgressBar
                value={prayer.windowProgressPercent}
                tone="streak"
                size="xs"
                shiny={false}
                aria-label="Pencere ilerlemesi"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleMark}
            disabled={!isInteractive}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-2xl px-3.5 py-2",
              "bg-[#FF6B35] text-[#2A1813] font-black text-xs uppercase tracking-[0.10em]",
              "shadow-[0_4px_0_0_#7A2A0D] transition-transform duration-100",
              "active:translate-y-[3px] active:shadow-[0_1px_0_0_#7A2A0D]",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            İŞARETLE
            <ChevronRight className="h-[11px] w-[11px]" />
          </button>
        </div>
      )}

      {prayer.state === PrayerCardState.Current && (
        <div className="mt-1.5 flex items-center justify-between gap-2.5">
          <div className="text-[11px] font-bold text-white/35">
            Vakit girdi ·{" "}
            <strong className="font-black text-white/55">şimdi</strong>{" "}
            işaretleyebilirsin
          </div>
          <button
            type="button"
            onClick={handleMark}
            disabled={!isInteractive}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-2xl px-3.5 py-2",
              "bg-[#FF6B35] text-[#2A1813] font-black text-xs uppercase tracking-[0.10em]",
              "shadow-[0_4px_0_0_#7A2A0D] transition-transform duration-100",
              "active:translate-y-[3px] active:shadow-[0_1px_0_0_#7A2A0D]",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            İŞARETLE
            <ChevronRight className="h-[11px] w-[11px]" />
          </button>
        </div>
      )}

      {prayer.state === PrayerCardState.Late && (
        <div className="mt-1.5 flex items-center justify-between gap-2.5">
          <div className="text-[11px] font-bold text-white/35">
            Vakti çıktı · kaza olarak işaretlenir,{" "}
            <strong className="font-black text-[var(--color-secondary-light)]">
              {prayer.xpReward} yerine {prayer.lateXpReward} XP
            </strong>{" "}
            kazanılır
            <div className="mt-1">
              Sonraki vakte{" "}
              <strong className="font-black text-white/55">
                {formatCountdown(prayer.secondsUntilMarkCloses)}
              </strong>{" "}
              kaldı
            </div>
            <div className="mt-1.5 w-[140px]">
              <ProgressBar
                value={prayer.windowProgressPercent}
                tone="secondary"
                size="xs"
                shiny={false}
                aria-label="Kaza penceresi ilerlemesi"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleMark}
            disabled={!isInteractive}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-2xl px-3.5 py-2",
              "bg-[var(--color-secondary)] text-[#2A1813] font-black text-xs uppercase tracking-[0.10em]",
              "shadow-[0_4px_0_0_#7A5A0D] transition-transform duration-100",
              "active:translate-y-[3px] active:shadow-[0_1px_0_0_#7A5A0D]",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            KAZA ET
            <ChevronRight className="h-[11px] w-[11px]" />
          </button>
        </div>
      )}

      {prayer.state === PrayerCardState.Locked && (
        <div className="mt-1.5 text-[11px] font-bold text-white/35">
          <strong className="font-black text-white/55">
            {formatCountdown(prayer.secondsUntilOpens)}
          </strong>{" "}
          sonra açılacak
        </div>
      )}

      {prayer.state === PrayerCardState.Missed && (
        <div className="mt-1.5 text-[11px] font-bold text-white/35">
          İşaretleme penceresi kapandı
        </div>
      )}

      {prayer.state === PrayerCardState.MarkingLocked && (
        <div className="mt-1.5 text-[11px] font-bold text-rose-300/70">
          İşaretleme bu vakit için kapatıldı
        </div>
      )}

      {prayer.state === PrayerCardState.Completed &&
        prayer.completedAtLabel && (
          <div className="mt-1.5 text-[11px] font-bold text-white/35">
            <strong className="font-black text-white/55">
              {prayer.completedAtLabel}
            </strong>
            &apos;da{" "}
            {prayer.completionStatus === PrayerCompletionStatus.Late
              ? "kaza olarak işaretlendi"
              : "işaretlendi"}
          </div>
        )}
    </div>
  );

  if (variant === "inline") {
    return (
      <li className="flex items-stretch gap-4 rounded-3xl border border-white/[0.06] bg-[#1C2E35] p-4">
        {NodeButton}
        <div className="min-w-0 flex-1">{RowContent}</div>
      </li>
    );
  }

  return (
    <li className="relative flex items-stretch gap-3.5 py-2">
      {showSpine && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-[47px] top-[88px] bottom-[-12px] w-1 rounded bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.18)_0_6px,transparent_6px_14px)]"
        />
      )}
      {NodeButton}
      {RowContent}
    </li>
  );
};

const arePropsEqual = (
  prev: PrayerCardProps,
  next: PrayerCardProps
): boolean => {
  if (prev.isSubmitting !== next.isSubmitting) return false;
  if (prev.onMark !== next.onMark) return false;
  if (prev.variant !== next.variant) return false;
  if (prev.showSpine !== next.showSpine) return false;
  const a = prev.prayer;
  const b = next.prayer;
  return (
    a.type === b.type &&
    a.state === b.state &&
    a.isCompleted === b.isCompleted &&
    a.isLocked === b.isLocked &&
    a.canMarkAsCompleted === b.canMarkAsCompleted &&
    a.completionStatus === b.completionStatus &&
    a.effectiveXpReward === b.effectiveXpReward &&
    a.secondsUntilOpens === b.secondsUntilOpens &&
    a.secondsUntilCloses === b.secondsUntilCloses &&
    a.secondsUntilMarkCloses === b.secondsUntilMarkCloses &&
    a.windowProgressPercent === b.windowProgressPercent &&
    a.scheduledTimeLabel === b.scheduledTimeLabel &&
    a.completedAtLabel === b.completedAtLabel
  );
};

export const PrayerCard = memo(PrayerCardComponent, arePropsEqual);
