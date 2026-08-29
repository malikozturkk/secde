"use client";

import React, { memo } from "react";
import { Clock, AlarmClock, CheckCircle2 } from "lucide-react";
import { Card } from "@/src/components/ui/Card";
import { StatTile } from "@/src/components/ui/StatTile";
import { DonutChart } from "@/src/components/ui/DonutChart";

interface PunctualityCardProps {
  onTimePercent: number;
  onTime: number;
  late: number;
  className?: string;
}

const donutColors = (percent: number): { from: string; to: string } => {
  if (percent >= 70)
    return { from: "var(--ng-green)", to: "var(--ng-green)" };
  if (percent >= 40)
    return {
      from: "var(--ng-gold)",
      to: "var(--ng-gold)",
    };
  return { from: "#E11D48", to: "#FB7185" };
};

const PunctualityCardComponent: React.FC<PunctualityCardProps> = ({
  onTimePercent,
  onTime,
  late,
  className,
}) => {
  const total = onTime + late;
  const isEmpty = total === 0;
  const colors = donutColors(onTimePercent);

  return (
    <Card
      tone="plain"
      padding="md"
      className={className}
      aria-label="Vaktinde kılınan namaz oranı"
    >
      <div className="flex flex-col gap-4">
        <h3 className="flex items-center gap-2 text-base font-black tracking-[-0.01em] text-white">
          <Clock size={18} strokeWidth={2.4} className="text-[var(--ng-sky)]" />
          Vaktinde Kılınan Namaz Oranı
        </h3>

        {isEmpty ? (
          <div className="py-4 text-center">
            <div className="text-sm font-black text-white">
              Henüz namaz işaretlenmedi
            </div>
            <div className="mt-1 text-[13px] font-bold leading-snug text-[var(--ng-text-2)]">
              Vaktinde işaretlediğin namazlar burada görünecek.
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <DonutChart
              percent={onTimePercent}
              size={128}
              thickness={15}
              from={colors.from}
              to={colors.to}
              sublabel="VAKTİNDE"
              aria-label={`Vaktinde kılınan namaz oranı %${Math.round(
                onTimePercent
              )}`}
            />
            <div className="flex flex-1 flex-col gap-2.5">
              <StatTile
                tone="primary"
                size="sm"
                value={`${onTime}/${total}`}
                label="VAKTİNDE"
                icon={<CheckCircle2 size={15} strokeWidth={2.5} />}
              />
              <StatTile
                tone="default"
                size="sm"
                value={late}
                label="GEÇ (KAZA)"
                icon={
                  <AlarmClock
                    size={15}
                    strokeWidth={2.5}
                    className="text-[var(--ng-gold)]"
                  />
                }
              />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export const PunctualityCard = memo(PunctualityCardComponent);
