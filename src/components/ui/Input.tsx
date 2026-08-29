"use client";

import React, { forwardRef, useId } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  suffix?: React.ReactNode;
  leftIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, suffix, leftIcon, className = "", id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;
    const accessibleLabel =
      props["aria-label"] ?? (label ? undefined : props.placeholder);

    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[var(--ng-text-2)] text-[13px] font-bold px-1"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {label}
          </label>
        )}
        <label
          htmlFor={inputId}
          className={[
            "flex items-center gap-2 cursor-text",
            "bg-[var(--ng-surface-deep)] border-[length:var(--ng-stroke)] rounded-[var(--ng-radius)] px-4 h-14",
            "transition-colors duration-[var(--motion-press)]",
            error
              ? "border-[var(--ng-rose)]"
              : "border-[var(--ng-edge)] focus-within:border-[var(--ng-green)]",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {leftIcon && (
            <span className="text-[var(--ng-text-3)] flex-shrink-0 flex items-center">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            aria-label={accessibleLabel}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            className={[
              "flex-1 min-w-0 bg-transparent",
              "text-white placeholder-[rgba(255,255,255,0.35)]",
              "text-[15px] font-medium outline-none",
              "disabled:opacity-40 disabled:cursor-not-allowed",
            ].join(" ")}
            style={{ fontFamily: "var(--font-sans)" }}
            {...props}
          />

          {suffix && (
            <span className="flex-shrink-0 flex items-center">{suffix}</span>
          )}
        </label>

        {error && (
          <p
            id={errorId}
            className="flex items-center gap-1.5 text-red-400 text-[13px] font-semibold px-1"
            style={{ fontFamily: "var(--font-sans)" }}
            role="alert"
          >
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex-shrink-0">
              !
            </span>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
