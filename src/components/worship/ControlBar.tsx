"use client";

import React, { memo } from "react";
import { TEXTS } from "@/src/constants/worship";
import {
  buildLocalDateString,
  formatLongDate,
  formatRelativeDate,
} from "@/src/lib/worship-utils";
import { DatePicker, type DateString } from "@/src/components/ui/DatePicker";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  PinIcon,
  RefreshIcon,
} from "./icons/ControlIcons";

interface ControlBarProps {
  locationLabel: string;
  dateLabel: string;
  selectedDate: DateString;
  onDateChange: (next: DateString) => void;
  onPrevDay: () => void;
  onNextDay: () => void;
  onToday: () => void;
  onOpenLocation: () => void;
  onRefresh: () => void;
}

const formatDateTrigger = (value: DateString | null): string => {
  if (!value) return TEXTS.todayLabel;
  const todayIso = buildLocalDateString(new Date());
  const relative = formatRelativeDate(value, todayIso);
  const long = formatLongDate(value).replace(/\s\d{4}$/, "");
  return `${relative} · ${long}`;
};

const ControlBarComponent: React.FC<ControlBarProps> = ({
  locationLabel,
  selectedDate,
  onDateChange,
  onPrevDay,
  onNextDay,
  onToday,
  onOpenLocation,
  onRefresh,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-[#1c2e35] px-3.5 py-2 text-[13px] font-extrabold text-white shadow-[0_3px_0_0_rgba(0,0,0,0.3)] transition-all duration-100 hover:border-[var(--color-primary-light)]/30 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-[var(--color-primary-light)] focus-visible:outline-offset-2 active:translate-y-0.5 active:shadow-[0_1px_0_0_rgba(0,0,0,0.3)]"
          onClick={onOpenLocation}
          aria-label={`${TEXTS.locationTitle}: ${locationLabel}`}
        >
          <PinIcon
            className="text-[var(--color-primary-light)]"
            width={14}
            height={14}
          />
          <span>{locationLabel}</span>
          <ChevronDownIcon width={12} height={12} />
        </button>

        <div className="inline-flex items-center gap-1.5">
          <button
            type="button"
            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-[#1c2e35] text-white shadow-[0_3px_0_0_rgba(0,0,0,0.3)] transition-all duration-100 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-[var(--color-primary-light)] focus-visible:outline-offset-2 active:translate-y-0.5 active:shadow-[0_1px_0_0_rgba(0,0,0,0.3)]"
            onClick={onPrevDay}
            aria-label={TEXTS.prevDayLabel}
          >
            <ChevronLeftIcon width={14} height={14} />
          </button>

          <DatePicker
            mode="single"
            value={selectedDate}
            onChange={onDateChange}
            variant="default"
            size="md"
            formatLabel={(v) => formatDateTrigger(v as DateString | null)}
            todayAction={{ label: TEXTS.todayLabel, onClick: onToday }}
            ariaLabel={TEXTS.todayLabel}
          />

          <button
            type="button"
            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-[#1c2e35] text-white shadow-[0_3px_0_0_rgba(0,0,0,0.3)] transition-all duration-100 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-[var(--color-primary-light)] focus-visible:outline-offset-2 active:translate-y-0.5 active:shadow-[0_1px_0_0_rgba(0,0,0,0.3)]"
            onClick={onNextDay}
            aria-label={TEXTS.nextDayLabel}
          >
            <ChevronRightIcon width={14} height={14} />
          </button>
        </div>
      </div>

      <button
        type="button"
        className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-[#1c2e35] text-white shadow-[0_3px_0_0_rgba(0,0,0,0.3)] transition-all duration-100 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-[var(--color-primary-light)] focus-visible:outline-offset-2 active:translate-y-0.5 active:shadow-[0_1px_0_0_rgba(0,0,0,0.3)]"
        onClick={onRefresh}
        aria-label={TEXTS.refreshLabel}
      >
        <RefreshIcon
          className="text-[var(--color-primary-light)]"
          width={14}
          height={14}
        />
      </button>
    </div>
  );
};

export const ControlBar = memo(ControlBarComponent);
