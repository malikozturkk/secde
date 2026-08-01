"use client";

import React, { memo, useMemo, useState } from "react";
import { Sheet } from "@/src/components/ui/Sheet";
import { Button } from "@/src/components/ui/Button";
import {
  MONTHS_TR_FULL,
  SHORT_WEEKDAYS_TR,
  buildMonthCalendar,
  buildMonthRange,
} from "@/src/lib/dashboard-utils";
import { usePrayerHistory } from "@/src/hooks/streak/usePrayerHistory";
import { ChevronLeft, ChevronRight, Cross } from "@/src/icons/tsx/dashboard";
import { MonthCell } from "./MonthCell";
import { cn } from "@/src/lib/utils";
import type { PrayerHistoryDay } from "@/src/types/streak.types";

const EMPTY_HISTORY: readonly PrayerHistoryDay[] = [];

interface MonthHeatmapSheetProps {
  isOpen: boolean;
  onClose: () => void;
  longestStreak: number;
  completedToday: number;
  totalToday: number;
  onSeeStats?: () => void;
}

const SheetComponent: React.FC<MonthHeatmapSheetProps> = ({
  isOpen,
  onClose,
  longestStreak,
  completedToday,
  totalToday,
  onSeeStats,
}) => {
  const today = useMemo(() => new Date(), []);
  const [cursor, setCursor] = useState<{ year: number; month: number }>(() => ({
    year: today.getFullYear(),
    month: today.getMonth(),
  }));

  const monthRange = useMemo(
    () => (isOpen ? buildMonthRange(cursor.year, cursor.month) : null),
    [isOpen, cursor]
  );
  const historyQuery = usePrayerHistory(monthRange);
  const history = historyQuery.data?.days ?? EMPTY_HISTORY;

  const calendar = useMemo(
    () =>
      buildMonthCalendar({
        year: cursor.year,
        month: cursor.month,
        today,
        history,
        completedToday,
        totalToday,
      }),
    [cursor, today, history, completedToday, totalToday]
  );

  const isCurrentMonth =
    cursor.year === today.getFullYear() && cursor.month === today.getMonth();

  const goPrev = (): void => {
    setCursor((c) =>
      c.month === 0
        ? { year: c.year - 1, month: 11 }
        : { ...c, month: c.month - 1 }
    );
  };
  const goNext = (): void => {
    if (isCurrentMonth) return;
    setCursor((c) =>
      c.month === 11
        ? { year: c.year + 1, month: 0 }
        : { ...c, month: c.month + 1 }
    );
  };

  return (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      aria-label="Aylık seri görünümü"
      header={
        <header className="flex items-center gap-3 p-[18px] pb-3 pt-5">
          <h2 className="m-0 flex-1 text-lg font-black tracking-[-0.01em] text-white">
            {MONTHS_TR_FULL[cursor.month]} {cursor.year}
          </h2>
          <div className="flex items-center gap-1">
            <SheetNavButton
              onClick={goPrev}
              aria-label="Önceki ay"
              icon={<ChevronLeft className="h-3.5 w-3.5" />}
            />
            <SheetNavButton
              onClick={goNext}
              disabled={isCurrentMonth}
              aria-label="Sonraki ay"
              icon={<ChevronRight className="h-3.5 w-3.5" />}
            />
            <SheetNavButton
              onClick={onClose}
              aria-label="Kapat"
              icon={<Cross className="h-3.5 w-3.5" />}
              className="ml-1"
            />
          </div>
        </header>
      }
      footer={
        <div className="flex gap-2.5 border-t border-white/[0.06] bg-[var(--color-bg)] px-[18px] py-3.5 pb-[calc(0.875rem+env(safe-area-inset-bottom))]">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="flex-1"
          >
            Kapat
          </Button>
          {onSeeStats && (
            <Button
              variant="orange"
              size="sm"
              onClick={onSeeStats}
              className="flex-1"
            >
              İstatistiklere Git
            </Button>
          )}
        </div>
      }
    >
      <div className="px-[18px] pt-1">
        <MonthStats
          longestStreak={longestStreak}
          perfectDays={calendar.perfectDays}
          successPercent={calendar.successPercent}
        />

        <div className="grid grid-cols-7 gap-1.5 py-1.5">
          {SHORT_WEEKDAYS_TR.map((label) => (
            <span
              key={label}
              className="text-center text-[10px] font-black uppercase tracking-[0.10em] text-white/35"
            >
              {label}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1.5 pb-3">
          {calendar.cells.map((cell, idx) => (
            <MonthCell key={`${cell.date || "blank"}-${idx}`} cell={cell} />
          ))}
        </div>

        <MonthLegend />
      </div>
    </Sheet>
  );
};

interface SheetNavButtonProps {
  onClick: () => void;
  "aria-label": string;
  icon: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const SheetNavButton: React.FC<SheetNavButtonProps> = ({
  onClick,
  "aria-label": ariaLabel,
  icon,
  disabled,
  className,
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-label={ariaLabel}
    className={cn(
      "grid h-8 w-8 place-items-center rounded-xl border-0 bg-[#1C2E35] text-white/55",
      "transition-transform duration-100 hover:text-white active:translate-y-px",
      "disabled:cursor-not-allowed disabled:opacity-30",
      className
    )}
  >
    {icon}
  </button>
);

interface MonthStatsProps {
  longestStreak: number;
  perfectDays: number;
  successPercent: number;
}

const MonthStats: React.FC<MonthStatsProps> = ({
  longestStreak,
  perfectDays,
  successPercent,
}) => (
  <div className="grid grid-cols-3 gap-2.5 py-1 pb-3.5">
    <StatTile
      label="SERİ"
      value={String(longestStreak)}
      suffix="gün"
      valueClass="text-[#FF6B35]"
    />
    <StatTile
      label="TAM GÜN"
      value={String(perfectDays)}
      valueClass="text-[var(--color-primary-light)]"
    />
    <StatTile
      label="BAŞARI"
      value={`%${successPercent}`}
      valueClass="text-[var(--color-secondary)]"
    />
  </div>
);

interface StatTileProps {
  label: string;
  value: string;
  suffix?: string;
  valueClass?: string;
}

const StatTile: React.FC<StatTileProps> = ({
  label,
  value,
  suffix,
  valueClass,
}) => (
  <div className="rounded-2xl border border-white/[0.06] bg-[#1C2E35] p-2.5">
    <div className="text-[9px] font-black uppercase tracking-[0.10em] text-white/35">
      {label}
    </div>
    <div
      className={cn(
        "mt-1 font-display text-[22px] leading-none tabular-nums",
        valueClass
      )}
    >
      {value}
      {suffix && (
        <small className="ml-1 text-[11px] text-white/55">{suffix}</small>
      )}
    </div>
  </div>
);

const MonthLegend: React.FC = () => (
  <div className="flex items-center gap-2 py-3 text-[10px] font-black uppercase tracking-[0.10em] text-white/35">
    <span>AZ</span>
    <div className="flex gap-1">
      <span className="inline-block h-4 w-4 rounded border border-white/[0.08] bg-white/[0.04]" />
      <span className="inline-block h-4 w-4 rounded bg-[rgba(255,107,53,0.14)]" />
      <span className="inline-block h-4 w-4 rounded bg-[rgba(255,107,53,0.26)]" />
      <span className="inline-block h-4 w-4 rounded bg-[rgba(255,107,53,0.45)]" />
      <span className="inline-block h-4 w-4 rounded bg-[#FF6B35]" />
      <span className="inline-block h-4 w-4 rounded bg-gradient-to-br from-[#FF8A5C] to-[#FF6B35]" />
    </div>
    <span>ÇOK</span>
    <span className="ml-auto inline-flex items-center gap-1.5">
      <span className="inline-block h-3.5 w-3.5 rounded border border-[var(--color-accent)] bg-[rgba(79,195,247,0.20)]" />
      DONDURMA
    </span>
  </div>
);

export const MonthHeatmapSheet = memo(SheetComponent);
