"use client";

import React, { memo } from "react";
import {
  buildLocalDateString,
  formatLongDate,
  formatRelativeDate,
} from "@/src/lib/worship-utils";
import { DatePicker, type DateString } from "@/src/components/ui/DatePicker";
import { ChevronLeft, ChevronRight, Refresh } from "@/src/icons/tsx/worship";

interface ControlBarProps {
  selectedDate: DateString;
  onDateChange: (next: DateString) => void;
  onPrevDay: () => void;
  onNextDay: () => void;
  onToday: () => void;
  onRefresh: () => void;
}

const formatDateTrigger = (value: DateString | null): string => {
  if (!value) return "Bugün";
  const todayIso = buildLocalDateString(new Date());
  const relative = formatRelativeDate(value, todayIso);
  const long = formatLongDate(value).replace(/\s\d{4}$/, "");
  return `${relative} · ${long}`;
};

const ControlBarComponent: React.FC<ControlBarProps> = ({
  selectedDate,
  onDateChange,
  onPrevDay,
  onNextDay,
  onToday,
  onRefresh,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="inline-flex items-center gap-1.5">
        <button
          type="button"
          className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-[length:var(--ng-stroke)] border-[var(--ng-edge)] bg-[var(--ng-surface)] text-white shadow-[0_3px_0_0_rgba(0,0,0,0.3)] transition-all duration-100 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-[var(--ng-green)] focus-visible:outline-offset-2 active:translate-y-0.5 active:shadow-[0_1px_0_0_rgba(0,0,0,0.3)]"
          onClick={onPrevDay}
          aria-label="Önceki gün"
        >
          <ChevronLeft width={14} height={14} />
        </button>

        <DatePicker
          mode="single"
          value={selectedDate}
          onChange={onDateChange}
          variant="default"
          size="md"
          formatLabel={(v) => formatDateTrigger(v as DateString | null)}
          todayAction={{ label: "Bugün", onClick: onToday }}
          ariaLabel="Bugün"
        />

        <button
          type="button"
          className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-[length:var(--ng-stroke)] border-[var(--ng-edge)] bg-[var(--ng-surface)] text-white shadow-[0_3px_0_0_rgba(0,0,0,0.3)] transition-all duration-100 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-[var(--ng-green)] focus-visible:outline-offset-2 active:translate-y-0.5 active:shadow-[0_1px_0_0_rgba(0,0,0,0.3)]"
          onClick={onNextDay}
          aria-label="Sonraki gün"
        >
          <ChevronRight width={14} height={14} />
        </button>
      </div>

      <button
        type="button"
        className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-[length:var(--ng-stroke)] border-[var(--ng-edge)] bg-[var(--ng-surface)] text-white shadow-[0_3px_0_0_rgba(0,0,0,0.3)] transition-all duration-100 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-[var(--ng-green)] focus-visible:outline-offset-2 active:translate-y-0.5 active:shadow-[0_1px_0_0_rgba(0,0,0,0.3)]"
        onClick={onRefresh}
        aria-label="Yenile"
      >
        <Refresh
          className="text-[var(--ng-green)]"
          width={14}
          height={14}
        />
      </button>
    </div>
  );
};

export const ControlBar = memo(ControlBarComponent);
