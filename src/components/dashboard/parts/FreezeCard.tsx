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
        "relative overflow-hidden rounded-[var(--ng-radius-lg)]",
        "border-[length:var(--ng-stroke)] border-[var(--ng-sky)]",
        "bg-[linear-gradient(180deg,rgba(44,200,255,0.22)_0%,var(--ng-surface)_65%)]",
        "p-[18px] flex flex-col gap-3.5"
      )}
      aria-label="Seri dondurma"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-12 h-36 w-36 rounded-full bg-[radial-gradient(closest-side,rgba(44,200,255,0.30),transparent_70%)] blur-lg"
      />
      <header className="relative flex items-center gap-3">
        <div
          className={cn(
            "grid h-12 w-12 place-items-center rounded-[var(--ng-radius)] text-[26px] text-[#04303F]",
            "border-2 border-white/30 bg-[linear-gradient(180deg,#7FE2FF_0%,var(--ng-sky)_100%)]",
            "shadow-[0_5px_0_0_var(--ng-sky-deep),inset_0_2px_0_rgba(255,255,255,0.40)]"
          )}
          aria-hidden="true"
        >
          ❄
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="font-display text-[20px] leading-none tracking-[-0.02em] text-white">
            Seri Dondurma
          </div>
          <div className="mt-1 text-[12px] font-bold leading-snug text-[var(--ng-text-3)]">
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
                "grid h-16 flex-1 place-items-center rounded-[var(--ng-radius)] text-[26px]",
                isFilled
                  ? cn(
                      "border-[length:var(--ng-stroke)] border-[var(--ng-sky)] text-[#BAF0FF]",
                      "bg-[linear-gradient(180deg,rgba(44,200,255,0.32)_0%,rgba(44,200,255,0.10)_100%)]",
                      "shadow-[0_4px_0_0_var(--ng-sky-deep),inset_0_1px_0_rgba(255,255,255,0.28)]"
                    )
                  : "border-2 border-dashed border-white/16 bg-white/[0.06] text-[var(--ng-text-3)]"
              )}
            >
              {isFilled ? "❄" : "+"}
            </div>
          );
        })}
      </div>

      <div className="relative flex items-center justify-between gap-2.5">
        <div className="flex-1 text-[12px] font-bold leading-snug text-[var(--ng-text-3)]">
          {statusLabel}
        </div>
        {onUseFreeze && (
          <button
            type="button"
            onClick={onUseFreeze}
            disabled={!canUse || isUsing}
            className={cn(
              "inline-flex shrink-0 whitespace-nowrap rounded-[var(--ng-radius)] px-4 py-2.5 text-[12px] font-black uppercase tracking-[0.10em]",
              "bg-[var(--ng-sky)] text-[#04303F] shadow-[0_5px_0_0_var(--ng-sky-deep)]",
              "transition-[transform,box-shadow] duration-[var(--motion-press)] ease-[var(--ease-out)]",
              "active:translate-y-[4px] active:shadow-[0_1px_0_0_var(--ng-sky-deep)]",
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
