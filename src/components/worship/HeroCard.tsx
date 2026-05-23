"use client";

import React, { memo, useMemo } from "react";
import { PRAYER_CONFIG, TEXTS, ARC_RADIUS } from "@/src/constants/worship";
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
import { PrayerIcon } from "./icons/PrayerIcon";

interface HeroCardProps {
  worship: WorshipData;
}

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

  const heroVars = {
    "--wsh-hero": config.color,
    "--wsh-hero-shadow": config.shadow,
  } as React.CSSProperties;

  return (
    <section className="wsh-hero" style={heroVars}>
      <div className="wsh-hero-stars" aria-hidden="true">
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
      </div>

      <div className="wsh-hero-grid has-mascot">
        <div className="wsh-hero-mascot">
          <SpeechBubble
            tone="white"
            size="sm"
            placement="bottom"
            className="wsh-hero-bubble text-center"
          >
            <span className="block whitespace-nowrap text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#3d5158]">
              Sıradaki
            </span>
            <span className="block whitespace-nowrap text-[12px] font-black text-[#1c2e35]">
              {config.label} · {timeLabel}
            </span>
          </SpeechBubble>
          <NuraSitting className="wsh-hero-mascot-svg" aria-hidden="true" />
        </div>

        <div className="wsh-hero-center">
          <span className="wsh-hero-eye-chip">
            {TEXTS.nextPrayerEyebrow} · {whenLabel}
          </span>
          <h2 className="wsh-hero-name">{config.label}</h2>
          <div className="wsh-hero-time">
            {timeLabel}
            <small>· {dayName}</small>
          </div>
          <div
            className="wsh-hero-countdown"
            role="timer"
            aria-label={`${
              config.label
            } ${TEXTS.nextPrayerEyebrow.toLowerCase()}`}
          >
            <div className="wsh-cd-cell">
              <span className="wsh-cd-val">{padNumber(dur.h)}</span>
              <span className="wsh-cd-key">{TEXTS.saatLabel}</span>
            </div>
            <span className="wsh-cd-sep">:</span>
            <div className="wsh-cd-cell">
              <span className="wsh-cd-val">{padNumber(dur.m)}</span>
              <span className="wsh-cd-key">{TEXTS.dakikaLabel}</span>
            </div>
            <span className="wsh-cd-sep">:</span>
            <div className="wsh-cd-cell">
              <span className="wsh-cd-val">{padNumber(dur.s)}</span>
              <span className="wsh-cd-key">{TEXTS.saniyeLabel}</span>
            </div>
          </div>
        </div>

        <div className="wsh-hero-right" aria-hidden="true">
          <svg
            className="wsh-hero-arc"
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
          <span className="wsh-hero-icon-pulse" />
          <div className="wsh-hero-icon">
            <PrayerIcon prayer={config.key} width={86} height={86} />
          </div>
        </div>
      </div>
    </section>
  );
};

export const HeroCard = memo(HeroCardComponent);
