"use client";

import React, { memo } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Card } from "@/src/components/ui/Card";
import { Pill } from "@/src/components/ui/Pill";
import { Button } from "@/src/components/ui/Button";
import { BarChart, type BarDatum } from "@/src/components/ui/BarChart";
import { PRAYER_BREAKDOWN_META } from "@/src/constants/user-stats";
import type { PrayerBreakdown } from "@/src/types/user-stats.types";

interface PrayerBreakdownCardProps {
  breakdown: PrayerBreakdown;
  totalCompleted: number;
  lastCompletedAt?: string | null;
  showCta?: boolean;
  ctaHref?: string;
  className?: string;
}

const PrayerBreakdownCardComponent: React.FC<PrayerBreakdownCardProps> = ({
  breakdown,
  totalCompleted,
  lastCompletedAt,
  showCta = false,
  ctaHref = "/",
  className,
}) => {
  const isEmpty = totalCompleted === 0 || lastCompletedAt === null;

  const data: BarDatum[] = PRAYER_BREAKDOWN_META.map((m) => ({
    key: m.key,
    label: m.label,
    short: m.short,
    value: breakdown?.[m.key] ?? 0,
    color: m.color,
    shadow: m.shadow,
  }));

  return (
    <Card
      tone="primary"
      padding="md"
      className={className}
      aria-label="Namaz dağılımı"
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base font-black tracking-[-0.01em] text-white">
            Namaz Dağılımı
          </h3>
          {!isEmpty && (
            <Pill tone="primary" size="sm" isCounter>
              {totalCompleted} TAMAM
            </Pill>
          )}
        </div>

        {isEmpty ? (
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/[0.05] text-[var(--color-primary-light)]">
              <Sparkles size={26} strokeWidth={2.2} />
            </span>
            <div>
              <div className="text-sm font-black text-white">
                Henüz namaz tamamlanmadı
              </div>
              <div className="mt-1 text-[13px] font-bold leading-snug text-white/55">
                {showCta
                  ? "İlk vaktini kıl, dağılımın burada belirsin."
                  : "Bu kullanıcı henüz bir vakit tamamlamamış."}
              </div>
            </div>
            {showCta && (
              <Link href={ctaHref} className="mt-1">
                <Button variant="primary" size="sm">
                  Hemen başla
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <BarChart
            data={data}
            height={120}
            aria-label={`Namaz dağılımı, toplam ${totalCompleted}`}
          />
        )}
      </div>
    </Card>
  );
};

export const PrayerBreakdownCard = memo(PrayerBreakdownCardComponent);
