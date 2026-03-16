"use client";

import React, { forwardRef, useId } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  suffix?: React.ReactNode;
  leftIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, suffix, leftIcon, className = "", id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[rgba(255,255,255,0.6)] text-[13px] font-bold px-1"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            {label}
          </label>
        )}
        <label
          htmlFor={inputId}
          className={[
            "flex items-center gap-2 cursor-text",
            "bg-[#1a2b2a] border-2 rounded-2xl px-4 h-14",
            "transition-colors duration-150",
            error
              ? "border-red-500"
              : "border-[#2a3d3b] focus-within:border-[#25B49A]",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {leftIcon && (
            <span className="text-[rgba(255,255,255,0.35)] flex-shrink-0 flex items-center">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            className={[
              "flex-1 min-w-0 bg-transparent",
              "text-white placeholder-[rgba(255,255,255,0.35)]",
              "text-[15px] font-medium outline-none",
              "disabled:opacity-40 disabled:cursor-not-allowed",
            ].join(" ")}
            style={{ fontFamily: "'Nunito', sans-serif" }}
            {...props}
          />

          {suffix && (
            <span className="flex-shrink-0 flex items-center">{suffix}</span>
          )}
        </label>

        {error && (
          <p
            className="flex items-center gap-1.5 text-red-400 text-[13px] font-semibold px-1"
            style={{ fontFamily: "'Nunito', sans-serif" }}
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
