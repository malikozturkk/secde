"use client";

import React, { memo } from "react";
import { GraduationCap, CheckCircle2, XCircle } from "lucide-react";
import { Card } from "@/src/components/ui/Card";
import { StatTile } from "@/src/components/ui/StatTile";
import { DonutChart } from "@/src/components/ui/DonutChart";

interface QuizAccuracyCardProps {
  accuracyPercent: number;
  passed: number;
  failed?: number;
  totalAttempts: number;
  className?: string;
}

const donutColors = (percent: number): { from: string; to: string } => {
  if (percent >= 70)
    return { from: "var(--color-primary)", to: "var(--color-primary-light)" };
  if (percent >= 40)
    return {
      from: "var(--color-secondary)",
      to: "var(--color-secondary-light)",
    };
  return { from: "#E11D48", to: "#FB7185" };
};

const QuizAccuracyCardComponent: React.FC<QuizAccuracyCardProps> = ({
  accuracyPercent,
  passed,
  failed,
  totalAttempts,
  className,
}) => {
  const isEmpty = totalAttempts === 0;
  const colors = donutColors(accuracyPercent);
  const failedCount = failed ?? Math.max(0, totalAttempts - passed);

  return (
    <Card
      tone="plain"
      padding="md"
      className={className}
      aria-label="Quiz doğruluk"
    >
      <div className="flex flex-col gap-4">
        <h3 className="flex items-center gap-2 text-base font-black tracking-[-0.01em] text-white">
          <GraduationCap
            size={18}
            strokeWidth={2.4}
            className="text-[#9AE0FF]"
          />
          Quiz Doğruluğu
        </h3>

        {isEmpty ? (
          <div className="py-4 text-center">
            <div className="text-sm font-black text-white">
              Henüz quiz çözülmedi
            </div>
            <div className="mt-1 text-[13px] font-bold leading-snug text-white/55">
              Bir vakti işaretlerken çıkan soruları yanıtla.
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <DonutChart
              percent={accuracyPercent}
              size={128}
              thickness={15}
              from={colors.from}
              to={colors.to}
              sublabel="DOĞRULUK"
              aria-label={`Quiz doğruluğu %${Math.round(accuracyPercent)}`}
            />
            <div className="flex flex-1 flex-col gap-2.5">
              <StatTile
                tone="primary"
                size="sm"
                value={`${passed}/${totalAttempts}`}
                label="GEÇİLEN"
                icon={<CheckCircle2 size={15} strokeWidth={2.5} />}
              />
              <StatTile
                tone="default"
                size="sm"
                value={failedCount}
                label="YANLIŞ CEVAPLANAN"
                icon={
                  <XCircle
                    size={15}
                    strokeWidth={2.5}
                    className="text-[#FCA5A5]"
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

export const QuizAccuracyCard = memo(QuizAccuracyCardComponent);
