"use client";

import React, { memo } from "react";
import { Card } from "@/src/components/ui/Card";
import { ProgressBar } from "@/src/components/ui/ProgressBar";
import { useAnimatedNumber } from "@/src/hooks/streak/useAnimatedNumber";
import { resolveBadgeLabel } from "@/src/constants/user-stats";
import { cn } from "@/src/lib/utils";

interface LevelStatCardProps {
  level: number;
  badgeKey: string;
  progressPercent: number;
  xpToNextLevel?: number;
  totalXp?: number;
  currentLevelXp?: number;
  totalXpForNextLevel?: number;
  className?: string;
}

const LEVEL_TICKS = [25, 50, 75] as const;

const LevelStatCardComponent: React.FC<LevelStatCardProps> = ({
  level,
  badgeKey,
  progressPercent,
  xpToNextLevel,
  totalXp,
  currentLevelXp,
  totalXpForNextLevel,
  className,
}) => {
  const showXp = totalXp !== undefined;
  const animatedTotalXp = useAnimatedNumber(totalXp ?? 0);
  const badgeLabel = resolveBadgeLabel(badgeKey);
  const percent = Math.max(0, Math.min(100, Math.round(progressPercent)));

  return (
    <Card
      tone="violet"
      glow
      padding="md"
      className={className}
      aria-label={`Seviye ${level}`}
    >
      <div className="flex flex-col gap-3.5">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "grid h-12 w-12 shrink-0 place-items-center rounded-xl text-white",
              "bg-gradient-to-b from-[#6D5DFA] to-[#4338CA]",
              "shadow-[0_5px_0_0_#1E1B4B,inset_0_2px_0_rgba(255,255,255,0.20)]",
              "font-display text-[22px] tabular-nums"
            )}
          >
            {level}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-black uppercase tracking-[0.10em] text-white/55">
              SEVİYE {level}
            </div>
            <div className="truncate text-base font-black tracking-[-0.01em] text-white">
              {badgeLabel}
            </div>
          </div>
          {showXp && (
            <div className="shrink-0 text-right">
              <div className="font-display text-lg tabular-nums leading-none text-[#C7B9FF]">
                {animatedTotalXp.toLocaleString("tr-TR")}
              </div>
              <div className="text-[9px] font-black uppercase tracking-[0.10em] text-white/40">
                TOPLAM XP
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <ProgressBar
            value={percent}
            tone="violet"
            ticks={LEVEL_TICKS}
            size="sm"
            aria-label="Seviye ilerlemesi"
          />
          <div className="flex justify-between text-[11px] font-black uppercase tracking-[0.08em] text-white/40 tabular-nums">
            {showXp && currentLevelXp !== undefined && totalXpForNextLevel ? (
              <span>
                <strong className="text-[#C7B9FF]">
                  {currentLevelXp.toLocaleString("tr-TR")}
                </strong>
                <span> / {totalXpForNextLevel.toLocaleString("tr-TR")} XP</span>
              </span>
            ) : (
              <span>%{percent}</span>
            )}
            {showXp && xpToNextLevel !== undefined ? (
              <span>
                SONRAKİ SEVİYEYE {xpToNextLevel.toLocaleString("tr-TR")} XP
              </span>
            ) : (
              <span>SONRAKİ: SEVİYE {level + 1}</span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export const LevelStatCard = memo(LevelStatCardComponent);
