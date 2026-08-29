"use client";

import React, { memo } from "react";
import { ProgressBar } from "@/src/components/ui/ProgressBar";
import { CharacterIllustration } from "./CharacterIllustration";
import type { StreakCharacterName } from "@/src/constants/streak";
import { SURFACE_CARD_GRADIENT_PRIMARY } from "../styles";
import { cn } from "@/src/lib/utils";

interface DailyGoalCardProps {
  completedToday: number;
  totalToday: number;
  progressPercent: number;
  character: StreakCharacterName;
}

const DailyGoalCardComponent: React.FC<DailyGoalCardProps> = ({
  completedToday,
  totalToday,
  progressPercent,
  character,
}) => {
  const allDone = totalToday > 0 && completedToday >= totalToday;
  return (
    <section
      className={cn(
        SURFACE_CARD_GRADIENT_PRIMARY,
        "flex items-center gap-4 overflow-hidden p-[18px] sm:p-5"
      )}
      aria-label="Günlük namaz hedefi"
    >
      <div className="relative h-24 w-[76px] shrink-0">
        <CharacterIllustration character={character} animated shadow="soft" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[11px] font-black uppercase tracking-[0.16em] text-[var(--ng-green)]">
          {allDone ? "BUGÜN TAMAMLANDI" : "GÜNLÜK HEDEF"}
        </div>
        <div className="mt-1.5 font-display text-[20px] leading-[1.1] tracking-[-0.02em] text-white sm:text-[22px]">
          {allDone
            ? "Bütün vakitler · tamam"
            : `${completedToday}/${totalToday} vakit kılındı`}
        </div>
        <div className="mt-3 flex items-center gap-2.5">
          <ProgressBar
            value={progressPercent}
            tone="primary"
            size="md"
            aria-label="Günlük namaz ilerlemesi"
          />
          <span className="shrink-0 font-display text-[17px] tabular-nums text-[var(--ng-green)]">
            %{progressPercent}
          </span>
        </div>
      </div>
    </section>
  );
};

export const DailyGoalCard = memo(DailyGoalCardComponent);
