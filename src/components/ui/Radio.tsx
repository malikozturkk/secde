"use client";

import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useId,
  useMemo,
  useState,
} from "react";
import { cn } from "@/src/lib/utils";

type RadioVariant = "card" | "outline" | "solid";
type RadioSize = "sm" | "md" | "lg";

interface RadioGroupContextValue {
  name: string;
  value?: string;
  disabled?: boolean;
  variant: RadioVariant;
  size: RadioSize;
  onChange: (next: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

interface RadioGroupProps {
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  variant?: RadioVariant;
  size?: RadioSize;
  className?: string;
  orientation?: "vertical" | "horizontal" | "grid";
  columns?: 1 | 2 | 3 | 4;
  children?: React.ReactNode;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      name,
      value,
      defaultValue,
      onChange,
      disabled = false,
      variant = "card",
      size = "md",
      className,
      orientation = "grid",
      columns = 2,
      children,
      ...rest
    },
    ref
  ) => {
    const autoId = useId();
    const groupName = name ?? `radio-group-${autoId}`;

    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState<string | undefined>(
      defaultValue
    );

    const currentValue = isControlled ? value : internalValue;

    const handleChange = useCallback(
      (next: string) => {
        if (!isControlled) setInternalValue(next);
        onChange?.(next);
      },
      [isControlled, onChange]
    );

    const context = useMemo<RadioGroupContextValue>(
      () => ({
        name: groupName,
        value: currentValue,
        disabled,
        variant,
        size,
        onChange: handleChange,
      }),
      [groupName, currentValue, disabled, variant, size, handleChange]
    );

    const layoutClass =
      orientation === "horizontal"
        ? "flex flex-wrap gap-2"
        : orientation === "vertical"
        ? "flex flex-col gap-2"
        : cn(
            "grid gap-2",
            columns === 1 && "grid-cols-1",
            columns === 2 && "grid-cols-1 sm:grid-cols-2",
            columns === 3 && "grid-cols-1 sm:grid-cols-3",
            columns === 4 && "grid-cols-2 sm:grid-cols-4"
          );

    return (
      <RadioGroupContext.Provider value={context}>
        <div
          ref={ref}
          role="radiogroup"
          className={cn(layoutClass, className)}
          {...rest}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  }
);

RadioGroup.displayName = "RadioGroup";

interface RadioProps {
  value: string;
  name?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  variant?: RadioVariant;
  size?: RadioSize;
  label?: React.ReactNode;
  description?: React.ReactNode;
  trailing?: React.ReactNode;
  className?: string;
  id?: string;
  onChange?: (
    value: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const SIZE_PADDING: Record<RadioSize, string> = {
  sm: "px-3 py-2 text-xs",
  md: "px-4 py-3 text-sm",
  lg: "px-5 py-4 text-base",
};

const SIZE_INDICATOR: Record<RadioSize, string> = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

const SIZE_INDICATOR_DOT: Record<RadioSize, string> = {
  sm: "h-1.5 w-1.5",
  md: "h-2 w-2",
  lg: "h-2.5 w-2.5",
};

const VARIANT_BASE: Record<RadioVariant, string> = {
  card: "rounded-[var(--ng-radius)] border-2",
  outline: "rounded-xl border",
  solid: "rounded-[var(--ng-radius)] border-2",
};

const VARIANT_ACTIVE: Record<RadioVariant, string> = {
  card: "border-[var(--ng-green)] bg-[var(--ng-green)]/15 text-white shadow-[0_4px_0_0_var(--ng-green-deep)] active:shadow-[0_0_0_0_var(--ng-green-deep)]",
  outline:
    "border-[var(--ng-green)] text-white bg-[var(--ng-green)]/10 shadow-[0_4px_0_0_var(--ng-green-deep)] active:shadow-[0_0_0_0_var(--ng-green-deep)]",
  solid:
    "border-[var(--ng-green)] bg-[var(--ng-green)] text-white shadow-[0_4px_0_0_var(--ng-green-deep)] active:shadow-[0_0_0_0_var(--ng-green-deep)]",
};

const VARIANT_INACTIVE: Record<RadioVariant, string> = {
  card: "border-[var(--ng-edge)] bg-[var(--ng-surface)] text-[var(--ng-text-2)] shadow-[0_4px_0_0_rgba(0,0,0,0.4)] hover:border-white/25 hover:bg-white/5 active:shadow-[0_0_0_0_rgba(0,0,0,0.4)]",
  outline:
    "border-white/15 bg-transparent text-[var(--ng-text-2)] shadow-[0_4px_0_0_rgba(0,0,0,0.3)] hover:border-white/30 hover:bg-white/5 active:shadow-[0_0_0_0_rgba(0,0,0,0.3)]",
  solid:
    "border-white/10 bg-[#152624] text-[var(--ng-text-2)] shadow-[0_4px_0_0_rgba(0,0,0,0.4)] hover:border-white/25 hover:bg-white/5 active:shadow-[0_0_0_0_rgba(0,0,0,0.4)]",
};

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      value,
      name,
      checked,
      defaultChecked,
      disabled,
      variant,
      size,
      label,
      description,
      trailing,
      className,
      id,
      onChange,
    },
    ref
  ) => {
    const group = useContext(RadioGroupContext);
    const autoId = useId();
    const inputId = id ?? `radio-${autoId}`;

    const resolvedName = name ?? group?.name ?? inputId;
    const resolvedVariant: RadioVariant = variant ?? group?.variant ?? "card";
    const resolvedSize: RadioSize = size ?? group?.size ?? "md";
    const resolvedDisabled = disabled ?? group?.disabled ?? false;

    const [uncontrolled, setUncontrolled] = useState<boolean>(
      defaultChecked ?? false
    );

    const isChecked =
      group !== null
        ? group.value === value
        : checked !== undefined
        ? checked
        : uncontrolled;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (resolvedDisabled) return;
      if (group) {
        group.onChange(value);
      } else if (checked === undefined) {
        setUncontrolled(true);
      }
      onChange?.(value, event);
    };

    return (
      <label
        htmlFor={inputId}
        className={cn(
          "group relative flex items-center justify-between gap-3 text-left font-bold transition-[transform,box-shadow,border-color,background-color] duration-[var(--motion-press)] ease-[var(--ease-out)]",
          "cursor-pointer select-none active:translate-y-[4px]",
          SIZE_PADDING[resolvedSize],
          VARIANT_BASE[resolvedVariant],
          isChecked
            ? VARIANT_ACTIVE[resolvedVariant]
            : VARIANT_INACTIVE[resolvedVariant],
          resolvedDisabled && "pointer-events-none opacity-50",
          className
        )}
        data-checked={isChecked || undefined}
      >
        <input
          ref={ref}
          id={inputId}
          type="radio"
          name={resolvedName}
          value={value}
          checked={isChecked}
          disabled={resolvedDisabled}
          onChange={handleChange}
          className="sr-only"
        />
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="flex min-w-0 flex-wrap items-center gap-2">
            {label !== undefined && (
              <span className="break-words">{label}</span>
            )}
            {trailing}
          </span>
          {description && (
            <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--ng-text-3)]">
              {description}
            </span>
          )}
        </span>
        <span
          className={cn(
            "grid shrink-0 place-items-center rounded-full border-2 transition-[border-color,background-color] duration-[var(--motion-press)] ease-[var(--ease-out)]",
            SIZE_INDICATOR[resolvedSize],
            isChecked
              ? "border-[var(--ng-green)] bg-[var(--ng-green)]"
              : "border-white/25"
          )}
          aria-hidden="true"
        >
          {isChecked && (
            <span
              className={cn(
                "rounded-full bg-[var(--ng-canvas)]",
                SIZE_INDICATOR_DOT[resolvedSize]
              )}
            />
          )}
        </span>
      </label>
    );
  }
);

Radio.displayName = "Radio";
