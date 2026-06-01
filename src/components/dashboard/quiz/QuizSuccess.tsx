"use client";

import React, { memo } from "react";
import { Pill } from "@/src/components/ui/Pill";
import { CharacterIllustration } from "../parts/CharacterIllustration";
import { PRAYER_META } from "@/src/constants/streak";
import type { PrayerType } from "@/src/types/enums/streak.enums";
import { Fire, XpStar } from "@/src/icons/tsx/dashboard";
import { ConfettiBurst } from "./ConfettiBurst";
import { PRAYER_COLORWAY } from "../styles";
import { cn } from "@/src/lib/utils";

interface QuizSuccessProps {
  prayerType: PrayerType;
  prayerLabel: string;
  xpAwarded: number;
  currentStreak: number;
  leveledUp?: boolean;
}

const SuccessComponent: React.FC<QuizSuccessProps> = ({
  prayerType,
  prayerLabel,
  xpAwarded,
  currentStreak,
  leveledUp,
}) => {
  const meta = PRAYER_META[prayerType];
  const colorway = PRAYER_COLORWAY[prayerType];
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center gap-2 overflow-hidden p-6 text-center">
      <ConfettiBurst seed={xpAwarded + 7} />
      <div className="relative mb-1.5 h-[200px] w-[160px] animate-[floatBounce_3s_ease-in-out_infinite] drop-shadow-[0_12px_20px_rgba(0,0,0,0.5)]">
        <CharacterIllustration character={meta.character} shadow="none" />
      </div>
      <div
        className={cn(
          "text-[10px] font-black uppercase tracking-[0.16em]",
          colorway.textAccent
        )}
      >
        {prayerLabel.toUpperCase()} TAMAMLANDI
      </div>
      <h2 className="font-display text-[42px] leading-none tracking-[0.02em] text-[#FF6B35] [text-shadow:0_4px_0_rgba(124,39,8,0.5),0_0_30px_rgba(255,107,53,0.5)]">
        Maşallah!
      </h2>
      <p className="text-sm font-black tracking-wide text-white/55">
        Vakit kaydedildi — devam edelim.
      </p>
      <div className="mt-3 flex flex-wrap justify-center gap-2.5">
        <Pill
          tone="violet"
          size="md"
          icon={<XpStar className="h-4 w-4" />}
          isCounter
        >
          +{xpAwarded} XP
        </Pill>
        {currentStreak > 0 && (
          <Pill tone="streak" size="md" icon={<Fire className="h-4 w-4" />}>
            {currentStreak} GÜN SERİ
          </Pill>
        )}
        {leveledUp && (
          <Pill tone="secondary" size="md">
            SEVİYE ATLADIN
          </Pill>
        )}
      </div>
    </div>
  );
};

export const QuizSuccess = memo(SuccessComponent);
