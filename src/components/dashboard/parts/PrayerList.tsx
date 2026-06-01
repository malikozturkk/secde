"use client";

import React, { memo } from "react";
import { PrayerCard } from "./PrayerCard";
import type { PrayerCardViewModel } from "@/src/types/streak.types";
import { cn } from "@/src/lib/utils";

interface PrayerListProps {
  prayers: readonly PrayerCardViewModel[];
  onMarkPrayer?: (prayer: PrayerCardViewModel) => void;
  isSubmitting?: boolean;
  variant?: "chain" | "grid";
}

const PrayerListComponent: React.FC<PrayerListProps> = ({
  prayers,
  onMarkPrayer,
  isSubmitting = false,
  variant = "chain",
}) => {
  if (variant === "grid") {
    return (
      <ol className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-x-4 md:gap-y-3 m-0 p-0 list-none">
        {prayers.map((prayer) => (
          <PrayerCard
            key={prayer.type}
            prayer={prayer}
            onMark={onMarkPrayer}
            isSubmitting={isSubmitting}
            variant="inline"
          />
        ))}
      </ol>
    );
  }

  return (
    <ol className={cn("relative flex flex-col m-0 p-0 list-none")}>
      {prayers.map((prayer, idx) => (
        <PrayerCard
          key={prayer.type}
          prayer={prayer}
          onMark={onMarkPrayer}
          isSubmitting={isSubmitting}
          variant="chain"
          showSpine={idx < prayers.length - 1}
        />
      ))}
    </ol>
  );
};

export const PrayerList = memo(PrayerListComponent);
