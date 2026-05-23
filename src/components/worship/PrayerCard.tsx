"use client";

import React, { memo } from "react";
import {
  PRAYER_CONFIG,
  PRAYER_STATE_LABEL,
  TEXTS,
} from "@/src/constants/worship";
import {
  formatFromNow,
  formatTime,
  getPrayerState,
} from "@/src/lib/worship-utils";
import {
  useCountdownToIso,
  useElapsedSinceIso,
} from "@/src/hooks/worship/useCountdown";
import { PrayerKey, PrayerState } from "@/src/types/enums/worship.enums";
import type { PrayerTime } from "@/src/types/worship.types";
import { PrayerIcon } from "./icons/PrayerIcon";

interface PrayerCardProps {
  prayerKey: PrayerKey;
  time: PrayerTime;
}

const PrayerCardComponent: React.FC<PrayerCardProps> = ({ prayerKey, time }) => {
  const config = PRAYER_CONFIG[prayerKey];
  const state = getPrayerState(time);
  const elapsed = useElapsedSinceIso(time.isPassed ? time.iso : null);
  const remaining = useCountdownToIso(time.isPassed ? null : time.iso);
  const signed = time.isPassed ? -elapsed : remaining;
  const timeLabel = formatTime(time.iso);

  const cardVars = {
    "--wsh-c": config.color,
    "--wsh-c-shadow": config.shadow,
  } as React.CSSProperties;

  return (
    <article
      className={`wsh-pcard is-${state}`}
      style={cardVars}
      aria-label={`${config.label} ${timeLabel}`}
    >
      {state === PrayerState.Current && (
        <span className="wsh-pcard-tag">{TEXTS.currentPrayerTag}</span>
      )}
      {state === PrayerState.Upcoming && time.isNext && (
        <span className="wsh-pcard-tag is-next">{TEXTS.nextPrayerTag}</span>
      )}

      <div className="wsh-pcard-head">
        <div className="wsh-pcard-icon">
          <PrayerIcon prayer={prayerKey} width={30} height={30} />
        </div>
        <div className="wsh-pcard-titles">
          <span className="wsh-pcard-name">{config.label}</span>
          <span className="wsh-pcard-state">{PRAYER_STATE_LABEL[state]}</span>
        </div>
      </div>

      <div className="wsh-pcard-time">{timeLabel}</div>
      <div className="wsh-pcard-meta">{formatFromNow(signed)}</div>
    </article>
  );
};

export const PrayerCard = memo(PrayerCardComponent);
