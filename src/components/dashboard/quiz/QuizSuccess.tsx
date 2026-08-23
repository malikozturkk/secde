"use client";

import React, { memo } from "react";
import { Pill } from "@/src/components/ui/Pill";
import { CharacterIllustration } from "../parts/CharacterIllustration";
import { PRAYER_META } from "@/src/constants/streak";
import {
  PrayerCompletionStatus,
  type PrayerType,
} from "@/src/types/enums/streak.enums";
import { Fire, XpStar } from "@/src/icons/tsx/dashboard";
import { ConfettiBurst } from "./ConfettiBurst";
import { PRAYER_COLORWAY } from "../styles";
import { cn } from "@/src/lib/utils";
import { upperTr } from "@/src/lib/turkish";

interface QuizSuccessProps {
  prayerType: PrayerType;
  prayerLabel: string;
  xpAwarded: number;
  xpBeforePenalty: number;
  completionStatus: PrayerCompletionStatus;
  currentStreak: number;
  leveledUp?: boolean;
}

const SuccessComponent: React.FC<QuizSuccessProps> = ({
  prayerType,
  prayerLabel,
  xpAwarded,
  xpBeforePenalty,
  completionStatus,
  currentStreak,
  leveledUp,
}) => {
  const meta = PRAYER_META[prayerType];
  const colorway = PRAYER_COLORWAY[prayerType];
  const isLate = completionStatus === PrayerCompletionStatus.Late;
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
        {upperTr(prayerLabel)} {isLate ? "KAZA EDİLDİ" : "TAMAMLANDI"}
      </div>
      <h2 className="font-display text-[42px] leading-none tracking-[0.02em] text-[#FF6B35] [text-shadow:0_4px_0_rgba(124,39,8,0.5),0_0_30px_rgba(255,107,53,0.5)]">
        Maşallah!
      </h2>
      <p className="text-sm font-black tracking-wide text-white/55">
        {isLate
          ? "Vakti geçmişti — kaza olarak kaydedildi."
          : "Vakit kaydedildi — devam edelim."}
      </p>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2.5">
        <Pill
          tone={isLate ? "secondary" : "violet"}
          size="md"
          icon={<XpStar className="h-4 w-4" />}
          isCounter
        >
          +{xpAwarded} XP
        </Pill>
        {isLate && xpBeforePenalty > xpAwarded && (
          <span className="text-xs font-black tracking-wide text-white/30 line-through">
            +{xpBeforePenalty} XP
          </span>
        )}
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
      {isLate && (
        <p className="mt-3 max-w-[300px] text-xs font-bold leading-snug text-white/40">
          Vaktinde kılsaydın{" "}
          <strong className="font-black text-white/60">
            {xpBeforePenalty} XP
          </strong>{" "}
          kazanacaktın. Serin yine de devam ediyor.
        </p>
      )}
    </div>
  );
};

export const QuizSuccess = memo(SuccessComponent);
