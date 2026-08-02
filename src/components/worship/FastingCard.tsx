"use client";

import React, { memo } from "react";
import {
  clampPercent,
  padNumber,
  splitDuration,
} from "@/src/lib/worship-utils";
import { formatTimeInZone } from "@/src/lib/time-format";
import { useCountdownToIso } from "@/src/hooks/worship/useCountdown";
import type { WorshipFasting } from "@/src/types/worship.types";
import { Moon } from "@/src/icons/tsx/worship";

interface FastingCardProps {
  timeZone: string;
  fasting: WorshipFasting | null;
}

const FastingCardComponent: React.FC<FastingCardProps> = ({
  fasting,
  timeZone,
}) => {
  const live = useCountdownToIso(fasting?.fastingEnd ?? null);

  if (!fasting) return null;

  if (!fasting.isRamadan) {
    return (
      <section
        className="relative flex flex-col gap-3.5 overflow-hidden rounded-[22px] border border-white/[0.06] bg-[radial-gradient(420px_220px_at_90%_0%,rgba(99,102,241,0.12),transparent_70%),radial-gradient(360px_220px_at_10%_110%,rgba(37,180,154,0.08),transparent_75%),#1c2e35] p-5"
        aria-label="Oruç"
      >
        <div className="flex items-center gap-3.5">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] bg-[linear-gradient(160deg,#25445a,#1a2e3b)] text-white/65 shadow-[0_6px_0_0_#0f1d27,inset_0_1px_0_rgba(255,255,255,0.1)] [&_svg]:h-7 [&_svg]:w-7"
            aria-hidden="true"
          >
            <Moon />
          </div>
          <div className="flex flex-1 flex-col gap-0.5">
            <h3 className="m-0 text-lg font-black text-[var(--color-text)]">
              Oruç
            </h3>
            <span className="text-xs font-bold tabular-nums text-[var(--color-text-muted)]">
              Ramazan ayında değiliz
            </span>
          </div>
          <span className="mt-1 inline-flex items-center gap-1.5 self-start rounded-full border border-[rgba(37,180,154,0.28)] bg-[rgba(37,180,154,0.12)] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[var(--color-primary-light)]">
            Nafile oruca açık
          </span>
        </div>
        <div className="flex items-center gap-4 rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.02] px-4 py-3.5">
          <div
            className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] border border-[rgba(37,180,154,0.22)] bg-[linear-gradient(160deg,rgba(37,180,154,0.18),rgba(37,180,154,0.04))] text-[var(--color-primary-light)] after:pointer-events-none after:absolute after:-inset-1.5 after:rounded-[22px] after:border after:border-dashed after:border-[rgba(37,180,154,0.25)] after:content-[''] after:animate-[wshDecorSpin_14s_linear_infinite]"
            aria-hidden="true"
          >
            <Moon />
          </div>
          <div className="flex min-w-0 flex-col gap-1">
            <span className="text-sm font-black text-[var(--color-text)]">
              Ramazan ayında değiliz
            </span>
            <span className="text-xs font-bold leading-[1.5] text-[var(--color-text-muted)]">
              Bugün Ramazan ayına denk gelmiyor. Yine de nafile oruç tutabilir,
              vaktinde kıldığın namazlarla manevi yolculuğuna devam edebilirsin.
            </span>
          </div>
        </div>
      </section>
    );
  }

  const startLabel = formatTimeInZone(fasting.fastingStart, timeZone);
  const endLabel = formatTimeInZone(fasting.fastingEnd, timeZone);
  const dur = splitDuration(live);
  const percent = clampPercent(fasting.progressPercent ?? 0);

  return (
    <section
      className="relative flex flex-col gap-3.5 overflow-hidden rounded-[22px] border border-white/[0.06] bg-[radial-gradient(420px_220px_at_90%_0%,rgba(67,56,202,0.2),transparent_70%),#1c2e35] p-5"
      aria-label="Oruç"
    >
      <div className="flex items-center gap-3.5">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] bg-[linear-gradient(160deg,#4338ca,#1e1b4b)] text-white shadow-[0_6px_0_0_#1e1b4b,inset_0_1px_0_rgba(255,255,255,0.18)] [&_svg]:h-7 [&_svg]:w-7"
          aria-hidden="true"
        >
          <Moon />
        </div>
        <div className="flex flex-1 flex-col gap-0.5">
          <h3 className="m-0 text-lg font-black text-[var(--color-text)]">
            Oruç
          </h3>
          <span className="text-xs font-bold tabular-nums text-[var(--color-text-muted)]">
            Ramazan ayı · İftar&apos;a {padNumber(dur.h)}:{padNumber(dur.m)}:
            {padNumber(dur.s)} kaldı
          </span>
        </div>
      </div>
      <div className="grid items-center gap-[18px] grid-cols-1 min-[721px]:grid-cols-[auto_1fr_auto]">
        <div className="flex flex-col gap-1 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-4 py-3.5">
          <span className="text-[10px] font-black uppercase tracking-[0.12em] text-white/35">
            İmsak
          </span>
          <span className="font-display text-[26px] tabular-nums text-[var(--color-text)]">
            {startLabel}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <div
            className="relative h-3 overflow-visible rounded-full bg-white/[0.06]"
            role="progressbar"
            aria-valuenow={Math.round(percent)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,#6366f1,#25b49a)] shadow-[0_0_10px_rgba(99,102,241,0.4)] transition-[width] duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
              style={{ width: `${percent}%` }}
            />
            <span
              className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-[#25b49a] bg-white shadow-[0_0_0_4px_rgba(37,180,154,0.18)] transition-[left] duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
              style={{ left: `${percent}%` }}
            />
          </div>
          <span className="text-center text-[11px] font-black uppercase tracking-[0.08em] tabular-nums text-[var(--color-text-muted)]">
            {percent.toFixed(0)}% tamamlandı
          </span>
        </div>
        <div className="flex flex-col gap-1 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-4 py-3.5">
          <span className="text-[10px] font-black uppercase tracking-[0.12em] text-white/35">
            İftar
          </span>
          <span className="font-display text-[26px] tabular-nums text-[var(--color-text)]">
            {endLabel}
          </span>
        </div>
      </div>
    </section>
  );
};

export const FastingCard = memo(FastingCardComponent);
