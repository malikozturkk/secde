"use client";

import React, { memo } from "react";
import { Flame, Snowflake, Trophy, AlertTriangle } from "lucide-react";
import { Card } from "@/src/components/ui/Card";
import { Pill } from "@/src/components/ui/Pill";
import { StatTile } from "@/src/components/ui/StatTile";
import { useAnimatedNumber } from "@/src/hooks/streak/useAnimatedNumber";
import { buildLocalDateString } from "@/src/lib/worship-utils";
import { cn } from "@/src/lib/utils";

interface StreakStatCardProps {
  current: number;
  longest: number;
  freezeCount?: number;
  lastActiveDate?: string | null;
  className?: string;
}

const StreakStatCardComponent: React.FC<StreakStatCardProps> = ({
  current,
  longest,
  freezeCount,
  lastActiveDate,
  className,
}) => {
  const animatedCurrent = useAnimatedNumber(current);
  const hasFreeze = freezeCount !== undefined;
  const showRisk =
    lastActiveDate !== undefined &&
    current > 0 &&
    lastActiveDate !== buildLocalDateString(new Date());

  return (
    <Card
      tone="plain"
      glow
      padding="md"
      className={cn(
        "border-[rgba(255,107,53,0.22)] bg-gradient-to-br from-[rgba(255,107,53,0.14)] via-[#1C2E35] to-[#1C2E35] to-70%",
        className
      )}
      aria-label={`Güncel seri ${current} gün, en uzun ${longest} gün`}
    >
      <div className="flex flex-col gap-3.5">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.10em] text-[var(--color-streak)]">
            <Flame size={14} strokeWidth={2.5} />
            GÜNCEL SERİ
          </span>
          {hasFreeze && (
            <Pill
              tone={freezeCount! > 0 ? "accent" : "neutral"}
              size="sm"
              isCounter
              icon={<Snowflake size={12} strokeWidth={2.6} />}
              className={cn(freezeCount === 0 && "opacity-60")}
            >
              {freezeCount}
            </Pill>
          )}
        </div>

        <div className="flex items-end gap-4">
          <div className="flex flex-col">
            <span
              className={cn(
                "font-display tabular-nums leading-[0.9] text-[56px]",
                current === 0 ? "text-white/40" : "text-white"
              )}
            >
              {animatedCurrent}
            </span>
            <span className="mt-1 text-[10px] font-black uppercase tracking-[0.10em] text-white/45">
              GÜN
            </span>
          </div>
          <StatTile
            className="ml-auto min-w-[104px]"
            tone="gold"
            value={longest}
            label="EN UZUN"
            icon={<Trophy size={15} strokeWidth={2.5} />}
          />
        </div>

        {showRisk && (
          <div className="flex items-center gap-2 rounded-2xl border border-[rgba(245,166,35,0.30)] bg-[rgba(245,166,35,0.10)] px-3 py-2">
            <AlertTriangle
              size={16}
              strokeWidth={2.5}
              className="shrink-0 text-[var(--color-secondary-light)]"
            />
            <span className="text-[12px] font-bold text-[var(--color-secondary-light)]">
              Streak risk altında — bugün bir vakit kıl.
            </span>
          </div>
        )}
      </div>
    </Card>
  );
};

export const StreakStatCard = memo(StreakStatCardComponent);
