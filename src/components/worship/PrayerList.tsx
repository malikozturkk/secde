"use client";

import React, { memo } from "react";
import { PRAYER_ORDER } from "@/src/constants/worship";
import type { WorshipTimes } from "@/src/types/worship.types";
import { PrayerCard } from "./PrayerCard";

interface PrayerListProps {
  times: WorshipTimes;
}

const PrayerListComponent: React.FC<PrayerListProps> = ({ times }) => {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h3 className="m-0 text-[22px] font-black tracking-[-0.01em] text-[var(--color-text)]">
            Bugünün Vakitleri
          </h3>
          <p className="mt-1 text-[13px] font-bold text-[var(--color-text-muted)]">
            Sabah&apos;tan yatsıya günün altı vakti.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3.5 min-[520px]:grid-cols-2 min-[900px]:grid-cols-3">
        {PRAYER_ORDER.map((key) => (
          <PrayerCard key={key} prayerKey={key} time={times[key]} />
        ))}
      </div>
    </section>
  );
};

export const PrayerList = memo(PrayerListComponent);
