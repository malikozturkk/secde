"use client";

import React, { memo } from "react";
import { TEXTS } from "@/src/constants/worship";
import {
  clampPercent,
  formatTime,
  padNumber,
  splitDuration,
} from "@/src/lib/worship-utils";
import { useCountdownToIso } from "@/src/hooks/worship/useCountdown";
import type { WorshipFasting } from "@/src/types/worship.types";
import { MoonIcon } from "./icons/ControlIcons";

interface FastingCardProps {
  fasting: WorshipFasting | null;
}

const FastingCardComponent: React.FC<FastingCardProps> = ({ fasting }) => {
  const live = useCountdownToIso(fasting?.fastingEnd ?? null);

  if (!fasting) return null;

  if (!fasting.isRamadan) {
    return (
      <section
        className="wsh-fasting-card is-inactive"
        aria-label={TEXTS.fastingTitle}
      >
        <div className="wsh-fasting-head">
          <div className="wsh-fast-icon is-muted" aria-hidden="true">
            <MoonIcon />
          </div>
          <div className="wsh-fasting-meta">
            <h3 className="wsh-card-title">{TEXTS.fastingTitle}</h3>
            <span className="wsh-card-sub">{TEXTS.noRamadanTitle}</span>
          </div>
          <span className="wsh-fast-empty-badge">{TEXTS.noRamadanBadge}</span>
        </div>
        <div className="wsh-fast-empty">
          <div className="wsh-fast-empty-decor" aria-hidden="true">
            <MoonIcon />
          </div>
          <div className="wsh-fast-empty-text">
            <span className="wsh-fast-empty-title">
              {TEXTS.noRamadanTitle}
            </span>
            <span className="wsh-fast-empty-body">{TEXTS.noRamadanBody}</span>
          </div>
        </div>
      </section>
    );
  }

  const startLabel = formatTime(fasting.fastingStart);
  const endLabel = formatTime(fasting.fastingEnd);
  const dur = splitDuration(live);
  const percent = clampPercent(fasting.progressPercent ?? 0);

  return (
    <section className="wsh-fasting-card" aria-label={TEXTS.fastingTitle}>
      <div className="wsh-fasting-head">
        <div className="wsh-fast-icon" aria-hidden="true">
          <MoonIcon />
        </div>
        <div className="wsh-fasting-meta">
          <h3 className="wsh-card-title">{TEXTS.fastingTitle}</h3>
          <span className="wsh-card-sub">
            {TEXTS.ramadanLabel} · {TEXTS.iftarRemainingPrefix}
            {padNumber(dur.h)}:{padNumber(dur.m)}:{padNumber(dur.s)}
            {TEXTS.iftarRemainingSuffix}
          </span>
        </div>
      </div>
      <div className="wsh-fast-times">
        <div className="wsh-fast-cell">
          <span className="wsh-fast-cell-key">{TEXTS.imsakLabel}</span>
          <span className="wsh-fast-cell-val">{startLabel}</span>
        </div>
        <div className="wsh-fast-progress">
          <div
            className="wsh-fast-progress-bar"
            role="progressbar"
            aria-valuenow={Math.round(percent)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="wsh-fast-progress-fill"
              style={{ width: `${percent}%` }}
            />
            <span
              className="wsh-fast-progress-pin"
              style={{ left: `${percent}%` }}
            />
          </div>
          <span className="wsh-fast-progress-label">
            {percent.toFixed(0)}
            {TEXTS.fastingCompletedSuffix}
          </span>
        </div>
        <div className="wsh-fast-cell">
          <span className="wsh-fast-cell-key">{TEXTS.iftarLabel}</span>
          <span className="wsh-fast-cell-val">{endLabel}</span>
        </div>
      </div>
    </section>
  );
};

export const FastingCard = memo(FastingCardComponent);
