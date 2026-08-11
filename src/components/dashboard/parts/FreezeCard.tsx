"use client";

import React, { memo, useMemo } from "react";
import { STREAK_FREEZE_MAX_SLOTS } from "@/src/constants/streak";
import { cn } from "@/src/lib/utils";

interface FreezeCardProps {
  streakFreezeCount: number;
  maxFreezes?: number;
  onUseFreeze?: () => void;
  isUsing?: boolean;
  lastUsedLabel?: string | null;
  freezeWindowExpired?: boolean;
  canFreezeNow?: boolean;
  recoverableStreak?: number;
}

const FreezeCardComponent: React.FC<FreezeCardProps> = ({
  streakFreezeCount,
  maxFreezes = STREAK_FREEZE_MAX_SLOTS,
  onUseFreeze,
  isUsing = false,
  lastUsedLabel,
  freezeWindowExpired = false,
  canFreezeNow = false,
  recoverableStreak = 0,
}) => {
  const canUse =
    !!onUseFreeze &&
    canFreezeNow &&
    streakFreezeCount > 0 &&
    !freezeWindowExpired;
  const statusLabel = freezeWindowExpired
    ? "Dondurma penceresi kapandı."
    : canFreezeNow && recoverableStreak > 0
    ? `Kaybettiğin ${recoverableStreak} günlük seriyi kurtarabilirsin.`
    : !canFreezeNow && streakFreezeCount > 0
    ? "Serin güvende — dondurulacak gün yok."
    : lastUsedLabel
    ? `Son kullanım: ${lastUsedLabel}`
    : streakFreezeCount > 0
    ? "Henüz kullanılmadı."
    : "Dondurma hakkın yok.";
  const slots = useMemo(
    () => Array.from({ length: Math.max(1, maxFreezes) }, (_, idx) => idx),
    [maxFreezes]
  );

  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-3xl border border-[rgba(79,195,247,0.30)]",
        "bg-gradient-to-br from-[rgba(79,195,247,0.15)] via-[#1C2E35] to-[#1C2E35] to-70%",
        "p-4 flex flex-col gap-3"
      )}
      aria-label="Seri dondurma"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-12 h-36 w-36 rounded-full bg-[radial-gradient(closest-side,rgba(79,195,247,0.30),transparent_70%)] blur-lg"
      />
      <header className="relative flex items-center gap-3">
        <div
          className={cn(
            "grid h-11 w-11 place-items-center rounded-xl text-2xl text-[#082F49]",
            "bg-gradient-to-b from-[#7DD3FC] to-[#0EA5E9]",
            "shadow-[0_5px_0_0_#075985,inset_0_2px_0_rgba(255,255,255,0.30)]"
          )}
          aria-hidden="true"
        >
          ❄
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="text-base font-black tracking-[-0.01em] text-white">
            Seri Dondurma
          </div>
          <div className="text-[11px] font-bold tracking-wide text-white/55">
            Kaçırdığın bir günde serini koruyalım
          </div>
        </div>
      </header>

      <div className="relative flex gap-2.5">
        {slots.map((slot) => {
          const isFilled = slot < streakFreezeCount;
          return (
            <div
              key={slot}
              aria-label={isFilled ? "Hazır" : "Boş"}
              className={cn(
                "grid h-14 flex-1 place-items-center rounded-2xl text-2xl",
                isFilled
                  ? cn(
                      "border-2 border-[#4FC3F7] text-[#BAE6FD]",
                      "bg-gradient-to-b from-[rgba(79,195,247,0.20)] to-[rgba(79,195,247,0.05)]",
                      "shadow-[0_4px_0_0_rgba(7,47,75,0.50),inset_0_1px_0_rgba(255,255,255,0.20)]"
                    )
                  : "border-2 border-dashed border-white/10 bg-white/[0.04] text-white/20"
              )}
            >
              {isFilled ? "❄" : "+"}
            </div>
          );
        })}
      </div>

      <div className="relative flex items-center justify-between gap-2.5">
        <div className="flex-1 text-[11px] font-bold text-white/55">
          {statusLabel}
        </div>
        {onUseFreeze && (
          <button
            type="button"
            onClick={onUseFreeze}
            disabled={!canUse || isUsing}
            className={cn(
              "inline-flex whitespace-nowrap rounded-2xl px-3.5 py-2 text-[11px] font-black uppercase tracking-[0.10em]",
              "bg-[#4FC3F7] text-[#082F49] shadow-[0_4px_0_0_#075985]",
              "transition-transform duration-100 active:translate-y-[3px] active:shadow-[0_1px_0_0_#075985]",
              "disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none disabled:active:translate-y-0"
            )}
          >
            {isUsing ? "DONDURULUYOR…" : "SERİYİ DONDUR"}
          </button>
        )}
      </div>
    </section>
  );
};

export const FreezeCard = memo(FreezeCardComponent);
