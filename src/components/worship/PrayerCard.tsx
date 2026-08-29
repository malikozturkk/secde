"use client";

import React, { memo } from "react";
import { PRAYER_CONFIG, PRAYER_STATE_LABEL } from "@/src/constants/worship";
import { formatFromNow, getPrayerState } from "@/src/lib/worship-utils";
import { formatTimeInZone } from "@/src/lib/time-format";
import {
  useCountdownToIso,
  useElapsedSinceIso,
} from "@/src/hooks/worship/useCountdown";
import { PrayerKey, PrayerState } from "@/src/types/enums/worship.enums";
import type { PrayerTime } from "@/src/types/worship.types";
import { cn } from "@/src/lib/utils";
import { PrayerIcon } from "./PrayerIcon";

interface PrayerCardProps {
  prayerKey: PrayerKey;
  time: PrayerTime;
  timeZone: string;
}

const PrayerCardComponent: React.FC<PrayerCardProps> = ({
  prayerKey,
  time,
  timeZone,
}) => {
  const config = PRAYER_CONFIG[prayerKey];
  const state = getPrayerState(time);
  const elapsed = useElapsedSinceIso(time.isPassed ? time.iso : null);
  const remaining = useCountdownToIso(time.isPassed ? null : time.iso);
  const signed = time.isPassed ? -elapsed : remaining;
  const timeLabel = formatTimeInZone(time.iso, timeZone);

  const cardVars = {
    "--wsh-c": config.color,
    "--wsh-c-shadow": config.shadow,
  } as React.CSSProperties;

  const isCurrent = state === PrayerState.Current;
  const isPassed = state === PrayerState.Passed;

  return (
    <article
      className={cn(
        "relative isolate flex flex-col gap-3.5 overflow-hidden rounded-[22px] border-[length:var(--ng-stroke)] border-[var(--ng-edge)] bg-[var(--ng-surface)] p-[18px] transition-[transform,border-color] duration-[180ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]",
        "before:pointer-events-none before:absolute before:inset-0 before:z-0 before:bg-[radial-gradient(220px_160px_at_80%_-20%,color-mix(in_srgb,var(--wsh-c)_30%,transparent),transparent_70%)] before:opacity-0 before:transition-opacity before:duration-[180ms] before:content-['']",
        "[&>*]:relative [&>*]:z-[1]",
        "hover:-translate-y-[3px] hover:border-[color-mix(in_srgb,var(--wsh-c)_30%,rgba(255,255,255,0.06))] hover:before:opacity-[0.55]",
        isCurrent &&
          "border-[color-mix(in_srgb,var(--wsh-c)_50%,transparent)] bg-[radial-gradient(220px_160px_at_80%_-20%,color-mix(in_srgb,var(--wsh-c)_20%,transparent),transparent_70%),var(--ng-surface)]",
        isPassed && "opacity-70 hover:opacity-100"
      )}
      style={cardVars}
      aria-label={`${config.label} ${timeLabel}`}
    >
      {state === PrayerState.Current && (
        <span className="absolute z-[2] inline-flex items-center rounded-full border border-[rgba(255,199,44,0.4)] bg-[rgba(255,199,44,0.18)] px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-[var(--ng-gold)] w-fit">
          ŞU AN
        </span>
      )}
      {state === PrayerState.Upcoming && time.isNext && (
        <span className="absolute right-3 top-3 z-[2] inline-flex items-center rounded-full border border-[rgba(23,217,160,0.32)] bg-[rgba(23,217,160,0.14)] px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-[var(--ng-green)]">
          SIRADAKİ
        </span>
      )}

      <div className="flex items-center gap-3">
        <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[var(--ng-radius)] bg-[var(--wsh-c)] text-white shadow-[0_5px_0_0_var(--wsh-c-shadow),inset_0_1px_0_rgba(255,255,255,0.18)] [&_svg]:h-[30px] [&_svg]:w-[30px]">
          <PrayerIcon prayer={prayerKey} width={30} height={30} />
        </div>
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="text-lg font-black tracking-[-0.01em] text-[var(--ng-text)]">
            {config.label}
          </span>
          <span
            className={cn(
              "text-[11px] font-extrabold uppercase tracking-[0.08em] text-[var(--ng-text-3)]",
              isCurrent && "text-[var(--wsh-c)]"
            )}
          >
            {PRAYER_STATE_LABEL[state]}
          </span>
        </div>
      </div>

      <div className="font-display text-4xl leading-none tabular-nums text-[var(--wsh-c)] [text-shadow:0_0_18px_color-mix(in_srgb,var(--wsh-c)_28%,transparent)]">
        {timeLabel}
      </div>
      <div className="text-xs font-extrabold text-[var(--ng-text-3)]">
        {formatFromNow(signed)}
      </div>
    </article>
  );
};

export const PrayerCard = memo(PrayerCardComponent);
