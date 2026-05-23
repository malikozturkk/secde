"use client";

import React, {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";
import { cn } from "@/src/lib/utils";

export type DateString = string;

export interface DateRange {
  from: DateString;
  to: DateString;
}

export type DatePickerMode = "single" | "range";

export type DatePickerVariant = "default" | "ghost" | "outline" | "minimal";

export type DatePickerSize = "sm" | "md" | "lg";
export type DatePickerProps =
  | (DatePickerCommonProps & {
      mode?: "single";
      value: DateString | null;
      onChange: (value: DateString) => void;
    })
  | (DatePickerCommonProps & {
      mode: "range";
      value: DateRange | null;
      onChange: (value: DateRange) => void;
    });

export interface DatePickerCommonProps {
  variant?: DatePickerVariant;
  size?: DatePickerSize;
  minDate?: DateString;
  maxDate?: DateString;
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
  inline?: boolean;
  disabled?: boolean;
  formatLabel?: (value: DateString | DateRange | null) => string;
  todayAction?: {
    label: string;
    onClick: () => void;
  };
}

const DAY_MS = 86_400_000;
const MONTHS_TR = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];
const DAYS_SHORT_TR = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

const pad = (n: number): string => String(n).padStart(2, "0");

const toIso = (date: Date): DateString =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

const fromIso = (value: DateString): Date => {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
};

const isSameDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const startOfMonth = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), 1);

const addMonths = (date: Date, delta: number): Date =>
  new Date(date.getFullYear(), date.getMonth() + delta, 1);

const isWithinRange = (date: Date, range: DateRange | null): boolean => {
  if (!range) return false;
  const t = date.getTime();
  return t >= fromIso(range.from).getTime() && t <= fromIso(range.to).getTime();
};

const clampDate = (
  date: Date,
  minDate?: DateString,
  maxDate?: DateString
): boolean => {
  if (minDate && date < fromIso(minDate)) return false;
  if (maxDate && date > fromIso(maxDate)) return false;
  return true;
};

const formatSingle = (value: DateString | null): string => {
  if (!value) return "";
  const d = fromIso(value);
  return `${d.getDate()} ${MONTHS_TR[d.getMonth()]} ${d.getFullYear()}`;
};

const formatRange = (range: DateRange | null): string => {
  if (!range) return "";
  const a = fromIso(range.from);
  const b = fromIso(range.to);
  if (isSameDay(a, b)) return formatSingle(range.from);
  if (a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear()) {
    return `${a.getDate()} – ${b.getDate()} ${
      MONTHS_TR[b.getMonth()]
    } ${b.getFullYear()}`;
  }
  return `${formatSingle(range.from)} – ${formatSingle(range.to)}`;
};

const TRIGGER_VARIANTS: Record<DatePickerVariant, string> = {
  default:
    "bg-[#1c2e35] border border-white/10 text-white shadow-[0_3px_0_0_rgba(0,0,0,0.3)] hover:brightness-110 active:translate-y-0.5 active:shadow-[0_1px_0_0_rgba(0,0,0,0.3)] rounded-full",
  ghost:
    "bg-transparent text-white hover:bg-white/5 rounded-full border border-transparent",
  outline:
    "bg-transparent border-2 border-white/15 text-white hover:border-[var(--color-primary-light)]/60 rounded-2xl",
  minimal:
    "bg-transparent border-0 text-white hover:text-[var(--color-primary-light)] px-0",
};

const TRIGGER_SIZES: Record<DatePickerSize, string> = {
  sm: "px-3 py-1.5 text-xs gap-1.5",
  md: "px-4 py-[7px] text-sm gap-2",
  lg: "px-5 py-2.5 text-base gap-2",
};

interface CalendarProps {
  monthCursor: Date;
  onChangeMonth: (next: Date) => void;
  isSelected: (date: Date) => boolean;
  isInRange: (date: Date) => boolean;
  isRangeEdge: (date: Date) => boolean;
  isDisabled: (date: Date) => boolean;
  onPick: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  monthCursor,
  onChangeMonth,
  isSelected,
  isInRange,
  isRangeEdge,
  isDisabled,
  onPick,
}) => {
  const cells: Date[] = useMemo(() => {
    const firstOfMonth = startOfMonth(monthCursor);
    const startWeekday = (firstOfMonth.getDay() + 6) % 7;
    const gridStart = new Date(firstOfMonth);
    gridStart.setDate(firstOfMonth.getDate() - startWeekday);
    const arr: Date[] = [];
    for (let i = 0; i < 42; i++) {
      arr.push(new Date(gridStart.getTime() + i * DAY_MS));
    }
    return arr;
  }, [monthCursor]);

  const today = new Date();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <button
          type="button"
          className="grid h-8 w-8 place-items-center rounded-full text-white/70 transition hover:bg-white/5 hover:text-white"
          onClick={() => onChangeMonth(addMonths(monthCursor, -1))}
          aria-label="Önceki ay"
        >
          <ChevronLeft size={16} />
        </button>
        <div className="text-sm font-extrabold tracking-wide text-white">
          {MONTHS_TR[monthCursor.getMonth()]} {monthCursor.getFullYear()}
        </div>
        <button
          type="button"
          className="grid h-8 w-8 place-items-center rounded-full text-white/70 transition hover:bg-white/5 hover:text-white"
          onClick={() => onChangeMonth(addMonths(monthCursor, 1))}
          aria-label="Sonraki ay"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-black uppercase tracking-[0.12em] text-white/40">
        {DAYS_SHORT_TR.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((cell, idx) => {
          const inMonth = cell.getMonth() === monthCursor.getMonth();
          const isToday = isSameDay(cell, today);
          const selected = isSelected(cell);
          const inRange = isInRange(cell);
          const edge = isRangeEdge(cell);
          const disabled = isDisabled(cell);
          return (
            <button
              key={idx}
              type="button"
              onClick={() => !disabled && onPick(cell)}
              disabled={disabled}
              className={cn(
                "relative h-9 rounded-lg text-sm font-bold transition focus:outline-none",
                "focus-visible:ring-2",
                inMonth ? "text-white" : "text-white/30",
                disabled
                  ? "cursor-not-allowed opacity-30"
                  : "cursor-pointer hover:bg-white/5",
                inRange && !edge && "bg-[var(--color-primary)]/15 text-white",
                (selected || edge) &&
                  "bg-[var(--color-primary)] text-white shadow-[0_3px_0_0_var(--color-primary-dark)] hover:brightness-110",
                isToday &&
                  !selected &&
                  !edge &&
                  "ring-1 ring-inset ring-[var(--color-primary-light)]/70"
              )}
              aria-pressed={selected || edge}
              aria-label={toIso(cell)}
            >
              {cell.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

interface CalendarSurfaceProps {
  initialCursor: Date;
  isSelected: (date: Date) => boolean;
  isInRange: (date: Date) => boolean;
  isRangeEdge: (date: Date) => boolean;
  isDisabledDate: (date: Date) => boolean;
  onPick: (date: Date) => void;
  todayAction?: DatePickerCommonProps["todayAction"];
  onTodayClicked?: () => void;
}

const CalendarSurface: React.FC<CalendarSurfaceProps> = ({
  initialCursor,
  isSelected,
  isInRange,
  isRangeEdge,
  isDisabledDate,
  onPick,
  todayAction,
  onTodayClicked,
}) => {
  const [monthCursor, setMonthCursor] = useState<Date>(initialCursor);
  return (
    <div className="flex w-72 flex-col gap-3 rounded-2xl border border-white/10 bg-[#0E181C] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
      <Calendar
        monthCursor={monthCursor}
        onChangeMonth={setMonthCursor}
        isSelected={isSelected}
        isInRange={isInRange}
        isRangeEdge={isRangeEdge}
        isDisabled={isDisabledDate}
        onPick={onPick}
      />
      {todayAction && (
        <div className="flex items-center justify-between border-t border-dashed border-white/10 pt-2 text-[11px] font-bold uppercase tracking-[0.1em] text-white/50">
          <span>Hızlı erişim</span>
          <button
            type="button"
            className="rounded-md px-2 py-1 text-[var(--color-accent)] transition hover:bg-[var(--color-accent)]/10"
            onClick={() => {
              todayAction.onClick();
              onTodayClicked?.();
            }}
          >
            {todayAction.label}
          </button>
        </div>
      )}
    </div>
  );
};

export const DatePicker: React.FC<DatePickerProps> = (props) => {
  const {
    variant = "default",
    size = "md",
    minDate,
    maxDate,
    placeholder = "Tarih seç",
    ariaLabel,
    className,
    inline = false,
    disabled = false,
    formatLabel,
    todayAction,
  } = props;

  const isRange = props.mode === "range";
  const [open, setOpen] = useState<boolean>(inline);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const popoverId = useId();

  const initialCursor: Date = useMemo(() => {
    if (isRange) {
      const range = props.value as DateRange | null;
      return range ? fromIso(range.from) : new Date();
    }
    const value = props.value as DateString | null;
    return value ? fromIso(value) : new Date();
  }, [isRange, props.value]);

  const [pendingRangeStart, setPendingRangeStart] = useState<DateString | null>(
    null
  );

  useEffect(() => {
    if (inline || !open) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        popoverRef.current?.contains(target) ||
        triggerRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [inline, open]);

  const triggerLabel = useMemo(() => {
    if (formatLabel) return formatLabel(props.value);
    if (isRange)
      return formatRange(props.value as DateRange | null) || placeholder;
    return formatSingle(props.value as DateString | null) || placeholder;
  }, [formatLabel, isRange, placeholder, props.value]);

  const isSelected = useCallback(
    (date: Date) => {
      if (isRange) {
        const range = props.value as DateRange | null;
        if (!range) return false;
        return (
          isSameDay(date, fromIso(range.from)) ||
          isSameDay(date, fromIso(range.to))
        );
      }
      const value = props.value as DateString | null;
      return value ? isSameDay(date, fromIso(value)) : false;
    },
    [isRange, props.value]
  );

  const isInRange = useCallback(
    (date: Date) => {
      if (!isRange) return false;
      return isWithinRange(date, props.value as DateRange | null);
    },
    [isRange, props.value]
  );

  const isRangeEdge = useCallback(
    (date: Date) => {
      if (!isRange) return false;
      const range = props.value as DateRange | null;
      if (!range) return false;
      return (
        isSameDay(date, fromIso(range.from)) ||
        isSameDay(date, fromIso(range.to))
      );
    },
    [isRange, props.value]
  );

  const isDisabledDate = useCallback(
    (date: Date) => !clampDate(date, minDate, maxDate),
    [minDate, maxDate]
  );

  const handlePick = useCallback(
    (date: Date) => {
      const iso = toIso(date);
      if (!isRange) {
        const single = props as Extract<DatePickerProps, { mode?: "single" }>;
        single.onChange(iso);
        if (!inline) setOpen(false);
        return;
      }

      const rangeProps = props as Extract<DatePickerProps, { mode: "range" }>;
      if (!pendingRangeStart) {
        setPendingRangeStart(iso);
        rangeProps.onChange({ from: iso, to: iso });
        return;
      }
      const startIso = pendingRangeStart;
      const startDate = fromIso(startIso);
      if (date.getTime() < startDate.getTime()) {
        rangeProps.onChange({ from: iso, to: startIso });
      } else {
        rangeProps.onChange({ from: startIso, to: iso });
      }
      setPendingRangeStart(null);
      if (!inline) setOpen(false);
    },
    [inline, isRange, pendingRangeStart, props]
  );

  const surface = (
    <CalendarSurface
      key={open ? `open-${initialCursor.getTime()}` : "closed"}
      initialCursor={initialCursor}
      isSelected={isSelected}
      isInRange={isInRange}
      isRangeEdge={isRangeEdge}
      isDisabledDate={isDisabledDate}
      onPick={handlePick}
      todayAction={todayAction}
      onTodayClicked={() => {
        if (!inline) setOpen(false);
      }}
    />
  );

  if (inline) {
    return <div className={cn("inline-block", className)}>{surface}</div>;
  }

  return (
    <div className="relative inline-flex">
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((prev) => !prev)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={popoverId}
        aria-label={ariaLabel ?? triggerLabel}
        className={cn(
          "inline-flex cursor-pointer items-center font-bold transition-all duration-100 disabled:cursor-not-allowed disabled:opacity-50",
          TRIGGER_VARIANTS[variant],
          TRIGGER_SIZES[size],
          className
        )}
      >
        <CalendarIcon
          className="shrink-0 text-[var(--color-primary-light)]"
          size={size === "lg" ? 16 : 14}
        />
        <span className="truncate">{triggerLabel}</span>
      </button>

      {open && (
        <div
          id={popoverId}
          ref={popoverRef}
          role="dialog"
          aria-label="Tarih seçici"
          className="absolute left-1/2 top-[calc(100%+8px)] z-40 -translate-x-1/2 animate-[fadeSlideUp_180ms_ease-out_forwards]"
        >
          {surface}
        </div>
      )}
    </div>
  );
};

DatePicker.displayName = "DatePicker";
