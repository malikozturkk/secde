"use client";

import React, { memo } from "react";
import { DAYS_LONG_TR, MONTHS_TR } from "@/src/constants/worship";
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
    <div className="flex flex-col gap-3 rounded-[22px] border border-white/[0.06] bg-[#1c2e35] p-[18px]">
      <div className="flex items-center justify-between">
        <h3 className="m-0 text-base font-black text-[var(--color-text)]">
          Hicri Tarih
        </h3>
        {yearTag && (
          <span className="text-[10px] font-black uppercase tracking-[0.12em] text-white/35">
            {yearTag} H
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1.5 rounded-[18px] border border-[rgba(37,180,154,0.2)] bg-[linear-gradient(160deg,rgba(37,180,154,0.1),rgba(37,180,154,0.02))] p-4">
        <span className="text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-primary-light)]">
          {meta.hijriMonthName} ayı
        </span>
        <span className="font-display text-[30px] leading-[1.1] text-[var(--color-text)]">
          {hijri}
        </span>
        <span className="text-xs font-bold text-[var(--color-text-muted)]">
          {DAYS_LONG_TR[date.getDay()]}, {date.getDate()}{" "}
          {MONTHS_TR[date.getMonth()]} {date.getFullYear()}
        </span>
      </div>
    </div>
  );
};

export const HijriCard = memo(HijriCardComponent);
