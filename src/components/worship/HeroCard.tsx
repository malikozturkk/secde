"use client";

import React, { memo, useMemo } from "react";
import { PRAYER_CONFIG, ARC_RADIUS } from "@/src/constants/worship";
import {
  formatDayName,
  formatRelativeDate,
  formatTime,
  padNumber,
  splitDuration,
} from "@/src/lib/worship-utils";
import { useCountdownToIso } from "@/src/hooks/worship/useCountdown";
import type { WorshipData } from "@/src/types/worship.types";
import { NuraSitting } from "@/src/icons/tsx/characters/nura";
import { SpeechBubble } from "@/src/components/ui/SpeechBubble";
import { PrayerIcon } from "./PrayerIcon";

interface HeroCardProps {
  worship: WorshipData;
}

const STAR_POSITIONS: Array<React.CSSProperties> = [
  { top: "18%", left: "18%", animationDelay: "0.2s", fontSize: "12px" },
  { top: "72%", left: "8%", animationDelay: "1s", fontSize: "9px" },
  { top: "22%", left: "52%", animationDelay: "1.6s", fontSize: "14px" },
  { top: "80%", left: "58%", animationDelay: "0.8s", fontSize: "8px" },
  { top: "8%", left: "76%", animationDelay: "2s", fontSize: "10px" },
];

const HeroCardComponent: React.FC<HeroCardProps> = ({ worship }) => {
  const config = PRAYER_CONFIG[worship.nextPrayer];
  const live = useCountdownToIso(worship.nextPrayerAt);
  const dur = splitDuration(live);
  const timeLabel = formatTime(worship.nextPrayerAt);
  const whenLabel = formatRelativeDate(
    worship.nextPrayerAt,
    worship.meta.gregorianDate
  );
  const dayName = formatDayName(worship.nextPrayerAt);

  const { circumference, dashOffset } = useMemo(() => {
    const total = Math.max(worship.secondsUntilNext, 1);
    const progress = Math.max(0, Math.min(1, 1 - live / total));
    const c = 2 * Math.PI * ARC_RADIUS;
    return { circumference: c, dashOffset: c * (1 - progress) };
  }, [live, worship.secondsUntilNext]);

  const heroStyle = {
    "--wsh-hero": config.color,
    "--wsh-hero-shadow": config.shadow,
    background: `radial-gradient(700px 380px at 20% 5%, color-mix(in srgb, var(--wsh-hero) 26%, transparent), transparent 65%), radial-gradient(500px 320px at 90% 110%, color-mix(in srgb, var(--wsh-hero) 18%, transparent), transparent 70%), linear-gradient(160deg, #1a2b2a 0%, #0f1a1f 100%)`,
  } as React.CSSProperties;

  return (
    <section
      className="relative isolate overflow-hidden rounded-[28px] border border-white/[0.06] px-[22px] py-6 shadow-[0_30px_80px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] min-[900px]:px-8 min-[900px]:py-7"
      style={heroStyle}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 [&_span]:absolute [&_span]:text-[12px] [&_span]:opacity-50 [&_span]:text-[var(--wsh-hero)] [&_span]:[filter:drop-shadow(0_0_6px_var(--wsh-hero))] [&_span]:animate-[wshStar_3.6s_ease-in-out_infinite]"
        aria-hidden="true"
      >
        {STAR_POSITIONS.map((style, index) => (
          <span key={index} style={style}>
            ★
          </span>
        ))}
      </div>

      <div className="relative z-[1] grid grid-cols-1 items-center gap-[26px] min-[900px]:grid-cols-[130px_1fr_200px] min-[900px]:gap-4 min-[1081px]:grid-cols-[150px_1fr_220px] min-[1081px]:gap-[22px]">
        <div className="hidden flex-col items-center gap-1 self-center min-[900px]:flex">
          <SpeechBubble
            tone="white"
            size="sm"
            placement="bottom"
            className="z-[2] whitespace-nowrap text-center"
          >
            <span className="block whitespace-nowrap text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#3d5158]">
              Sıradaki
            </span>
            <span className="block whitespace-nowrap text-[12px] font-black text-[#1c2e35]">
              {config.label} · {timeLabel}
            </span>
          </SpeechBubble>
          <NuraSitting
            className="h-auto w-[120px] animate-[wshFloat_5s_ease-in-out_infinite] [filter:drop-shadow(0_14px_18px_rgba(0,0,0,0.45))] min-[1081px]:w-[138px]"
            aria-hidden="true"
          />
        </div>

        <div className="flex min-w-0 flex-col gap-3.5">
          <span className="inline-flex w-fit items-center whitespace-nowrap rounded-full border border-white/10 bg-white/[0.08] px-3 py-[5px] text-[11px] font-black uppercase tracking-[0.18em] text-[var(--wsh-hero)]">
            SIRADAKİ NAMAZ · {whenLabel}
          </span>
          <h2 className="m-0 text-[44px] font-black leading-[0.95] tracking-[-0.03em] text-[var(--color-text)] min-[900px]:text-[62px]">
            {config.label}
          </h2>
          <div className="inline-flex items-baseline gap-3.5 font-display text-[34px] leading-none tabular-nums text-[var(--wsh-hero)] [text-shadow:0_0_30px_color-mix(in_srgb,var(--wsh-hero)_45%,transparent)] min-[900px]:text-[44px]">
            {timeLabel}
            <small className="font-sans text-[13px] font-black uppercase tracking-[0.14em] text-white/35">
              · {dayName}
            </small>
          </div>
          <div
            className="mt-1.5 flex items-center gap-2.5"
            role="timer"
            aria-label={`${config.label} sıradaki namaz`}
          >
            <div className="flex min-w-[64px] flex-col items-center gap-1 rounded-[18px] border border-white/10 bg-white/[0.05] px-3 py-2.5 shadow-[0_5px_0_0_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)] min-[521px]:min-w-[86px] min-[521px]:px-[18px] min-[521px]:py-3.5">
              <span className="font-display text-[26px] leading-none tabular-nums text-[var(--color-text)] min-[521px]:text-[34px]">
                {padNumber(dur.h)}
              </span>
              <span className="text-[9px] font-black uppercase tracking-[0.18em] text-white/35">
                Saat
              </span>
            </div>
            <span className="font-display text-[28px] text-[var(--wsh-hero)] opacity-[0.55]">
              :
            </span>
            <div className="flex min-w-[64px] flex-col items-center gap-1 rounded-[18px] border border-white/10 bg-white/[0.05] px-3 py-2.5 shadow-[0_5px_0_0_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)] min-[521px]:min-w-[86px] min-[521px]:px-[18px] min-[521px]:py-3.5">
              <span className="font-display text-[26px] leading-none tabular-nums text-[var(--color-text)] min-[521px]:text-[34px]">
                {padNumber(dur.m)}
              </span>
              <span className="text-[9px] font-black uppercase tracking-[0.18em] text-white/35">
                Dakika
              </span>
            </div>
            <span className="font-display text-[28px] text-[var(--wsh-hero)] opacity-[0.55]">
              :
            </span>
            <div className="flex min-w-[64px] flex-col items-center gap-1 rounded-[18px] border border-white/10 bg-white/[0.05] px-3 py-2.5 shadow-[0_5px_0_0_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)] min-[521px]:min-w-[86px] min-[521px]:px-[18px] min-[521px]:py-3.5">
              <span className="font-display text-[26px] leading-none tabular-nums text-[var(--color-text)] min-[521px]:text-[34px]">
                {padNumber(dur.s)}
              </span>
              <span className="text-[9px] font-black uppercase tracking-[0.18em] text-white/35">
                Saniye
              </span>
            </div>
          </div>
        </div>

        <div
          className="relative ml-auto hidden h-[220px] w-[220px] items-center justify-center min-[900px]:flex"
          aria-hidden="true"
        >
          <svg
            className="absolute inset-0 [filter:drop-shadow(0_0_24px_color-mix(in_srgb,var(--wsh-hero)_40%,transparent))]"
            viewBox="0 0 220 220"
            width="100%"
            height="100%"
          >
            <defs>
              <linearGradient id="wshArcGrad" x1="0" y1="0" x2="1" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--wsh-hero)"
                  stopOpacity={0.9}
                />
                <stop
                  offset="100%"
                  stopColor="var(--wsh-hero)"
                  stopOpacity={0.4}
                />
              </linearGradient>
            </defs>
            <circle
              cx={110}
              cy={110}
              r={ARC_RADIUS}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth={8}
              fill="none"
            />
            <circle
              cx={110}
              cy={110}
              r={ARC_RADIUS}
              stroke="url(#wshArcGrad)"
              strokeWidth={8}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              transform="rotate(-90 110 110)"
              style={{ transition: "stroke-dashoffset 1s linear" }}
            />
          </svg>
          <span className="pointer-events-none absolute -inset-4 rounded-full border-[3px] border-[var(--wsh-hero)] opacity-40 animate-[wshPulseRing_2.4s_ease-in-out_infinite]" />
          <div className="relative flex h-[152px] w-[152px] animate-[wshFloat_5s_ease-in-out_infinite] items-center justify-center rounded-full bg-[var(--wsh-hero)] text-white shadow-[0_14px_0_0_var(--wsh-hero-shadow),inset_0_-10px_14px_rgba(0,0,0,0.18),inset_0_5px_10px_rgba(255,255,255,0.2)]">
            <PrayerIcon prayer={config.key} width={86} height={86} />
          </div>
        </div>
      </div>
    </section>
  );
};

export const HeroCard = memo(HeroCardComponent);
