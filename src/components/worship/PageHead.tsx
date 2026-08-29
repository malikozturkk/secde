"use client";

import React, { memo } from "react";
import {
  formatDayName,
  formatLongDate,
  parseLocalDate,
  stripHijriPrefix,
} from "@/src/lib/worship-utils";
import type { WorshipMeta } from "@/src/types/worship.types";
import { TEXT } from "@/src/constants/surface";
import { cn } from "@/src/lib/utils";

interface PageHeadProps {
  meta: WorshipMeta;
  todayDate: string;
}

const PageHeadComponent: React.FC<PageHeadProps> = ({ meta, todayDate }) => {
  const date = parseLocalDate(meta.gregorianDate);
  const hijri = stripHijriPrefix(meta.hijriDate);

  const isToday = meta.gregorianDate === todayDate;
  const eyebrowLabel = isToday
    ? `Bugün · ${formatDayName(date)}`
    : formatDayName(date);

  return (
    <header className="flex flex-col gap-1.5">
      <span
        className={
          isToday
            ? "inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-[var(--ng-green)] before:inline-block before:h-2 before:w-2 before:rounded-full before:bg-[var(--ng-green)] before:shadow-[0_0_10px_var(--ng-green)] before:content-[''] before:animate-[wshBlink_1.6s_ease-in-out_infinite]"
            : "inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-[var(--ng-text-3)]"
        }
      >
        {eyebrowLabel}
      </span>
      <h1 className={cn("m-0", TEXT.display)}>Namaz Vakitleri</h1>
      <p className={cn("m-0", TEXT.muted)}>
        {formatLongDate(meta.gregorianDate)}
        {" · "}
        <span className="text-[var(--ng-green)]">
          {hijri} {meta.hijriMonthName}
        </span>
      </p>
    </header>
  );
};

export const PageHead = memo(PageHeadComponent);
