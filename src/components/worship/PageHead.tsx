"use client";

import React, { memo } from "react";
import { TEXTS } from "@/src/constants/worship";
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
    <header className="wsh-page-head">
      <span className="wsh-page-eyebrow">
        Bugün · {formatDayName(date)}
      </span>
      <h1 className="wsh-page-title">{TEXTS.pageTitle}</h1>
      <p className="wsh-page-sub">
        {formatLongDate(meta.gregorianDate)}
        {" · "}
        <span className="wsh-page-sub-accent">
          {hijri} {meta.hijriMonthName}
        </span>
      </p>
    </header>
  );
};

export const PageHead = memo(PageHeadComponent);
