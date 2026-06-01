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
        "flex items-center gap-3 p-4 sm:p-[18px]"
      )}
      aria-label="Günlük namaz hedefi"
    >
      <div className="relative h-20 w-16 shrink-0">
        <CharacterIllustration character={character} animated shadow="soft" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] font-black uppercase tracking-[0.12em] text-[var(--color-primary-light)]">
          {allDone ? "BUGÜN TAMAMLANDI" : "GÜNLÜK HEDEF"}
        </div>
        <div className="mt-0.5 text-base font-black tracking-[-0.01em] text-white">
          {allDone
            ? "Bütün vakitler · tamam"
            : `${completedToday}/${totalToday} vakit kılındı`}
        </div>
        <div className="mt-2 flex items-center gap-2">
          <ProgressBar
            value={progressPercent}
            tone="primary"
            size="xs"
            aria-label="Günlük namaz ilerlemesi"
          />
          <span className="font-display text-sm tabular-nums text-[var(--color-primary-light)]">
            %{progressPercent}
          </span>
        </div>
      </div>
    </section>
  );
};

export const DailyGoalCard = memo(DailyGoalCardComponent);
