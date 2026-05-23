"use client";

import React, { memo } from "react";
import {
  formatDayName,
  formatLongDate,
  parseLocalDate,
  stripHijriPrefix,
} from "@/src/lib/worship-utils";
import type { WorshipMeta } from "@/src/types/worship.types";

interface PageHeadProps {
  meta: WorshipMeta;
}

const PageHeadComponent: React.FC<PageHeadProps> = ({ meta }) => {
  const date = parseLocalDate(meta.gregorianDate);
  const hijri = stripHijriPrefix(meta.hijriDate);

  return (
    <header className="flex flex-col gap-1.5">
      <span
        className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-[var(--color-primary-light)] before:inline-block before:h-2 before:w-2 before:rounded-full before:bg-[var(--color-primary-light)] before:shadow-[0_0_10px_var(--color-primary-light)] before:content-[''] before:animate-[wshBlink_1.6s_ease-in-out_infinite]"
      >
        Bugün · {formatDayName(date)}
      </span>
      <h1 className="m-0 text-[28px] font-black leading-[1.05] tracking-[-0.025em] text-[var(--color-text)] md:text-[40px]">
        Namaz Vakitleri
      </h1>
      <p className="m-0 text-sm font-extrabold text-[var(--color-text-muted)]">
        {formatLongDate(meta.gregorianDate)}
        {" · "}
        <span className="text-[var(--color-primary-light)]">
          {hijri} {meta.hijriMonthName}
        </span>
      </p>
    </header>
  );
};

export const PageHead = memo(PageHeadComponent);
