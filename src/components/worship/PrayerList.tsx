"use client";

import React, { memo } from "react";
import { PRAYER_ORDER, TEXTS } from "@/src/constants/worship";
import type { WorshipTimes } from "@/src/types/worship.types";
import { PrayerCard } from "./PrayerCard";

interface PrayerListProps {
  times: WorshipTimes;
}

const PrayerListComponent: React.FC<PrayerListProps> = ({ times }) => {
  return (
    <section className="wsh-section">
      <div className="wsh-section-head">
        <div>
          <h3 className="wsh-section-title">{TEXTS.todayPrayersTitle}</h3>
          <p className="wsh-section-sub">{TEXTS.todayPrayersSubtitle}</p>
        </div>
      </div>
      <div className="wsh-pgrid">
        {PRAYER_ORDER.map((key) => (
          <PrayerCard key={key} prayerKey={key} time={times[key]} />
        ))}
      </div>
    </section>
  );
};

export const PrayerList = memo(PrayerListComponent);
