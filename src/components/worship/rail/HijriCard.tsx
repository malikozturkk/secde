"use client";

import React, { memo } from "react";
import { DAYS_LONG_TR, MONTHS_TR, TEXTS } from "@/src/constants/worship";
import {
  parseLocalDate,
  stripHijriPrefix,
} from "@/src/lib/worship-utils";
import type { WorshipMeta } from "@/src/types/worship.types";

interface HijriCardProps {
  meta: WorshipMeta;
}

const HijriCardComponent: React.FC<HijriCardProps> = ({ meta }) => {
  const hijri = stripHijriPrefix(meta.hijriDate);
  const yearTag = hijri.split(".").pop()?.trim();
  const date = parseLocalDate(meta.gregorianDate);
  return (
    <div className="wsh-rail-card">
      <div className="wsh-rail-head">
        <h3 className="wsh-rail-title">{TEXTS.hijriTitle}</h3>
        {yearTag && <span className="wsh-rail-tag">{yearTag} H</span>}
      </div>
      <div className="wsh-hijri-display">
        <span className="wsh-hijri-month">
          {meta.hijriMonthName}
          {TEXTS.hijriMonthSuffix}
        </span>
        <span className="wsh-hijri-big">{hijri}</span>
        <span className="wsh-hijri-greg">
          {DAYS_LONG_TR[date.getDay()]}, {date.getDate()}{" "}
          {MONTHS_TR[date.getMonth()]} {date.getFullYear()}
        </span>
      </div>
    </div>
  );
};

export const HijriCard = memo(HijriCardComponent);
