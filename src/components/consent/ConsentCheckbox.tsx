"use client";

import React, { forwardRef, useId } from "react";
import { Check } from "lucide-react";
import { LegalLink } from "./LegalLink";
import type { ConsentType } from "@/src/types";

export interface ConsentCheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  consentType: ConsentType;
  error?: string;
}

export const ConsentCheckbox = forwardRef<
  HTMLInputElement,
  ConsentCheckboxProps
>(({ consentType, error, id, className, ...rest }, ref) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  const labelByType: Record<ConsentType, React.ReactNode> = {
    TERMS_OF_SERVICE: (
      <>
        <LegalLink type="TERMS_OF_SERVICE" />
        &apos;nı okudum ve kabul ediyorum.
      </>
    ),
    PRIVACY_POLICY: (
      <>
        <LegalLink type="PRIVACY_POLICY" />
        &apos;nı okudum ve kabul ediyorum.
      </>
    ),
  };

  return (
    <div className={`flex flex-col gap-1 ${className ?? ""}`}>
      <label
        htmlFor={inputId}
        className="flex items-start gap-3 cursor-pointer select-none"
      >
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          aria-invalid={!!error || undefined}
          aria-describedby={error ? errorId : undefined}
          className="peer sr-only"
          {...rest}
        />
        <span
          aria-hidden="true"
          className={[
            "shrink-0 mt-0.5 flex items-center justify-center",
            "w-5 h-5 rounded-xs border-2 bg-[#1a2b2a] transition-colors duration-150",
            "[&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-[#25B49A]/60",
            error
              ? "border-red-500 peer-checked:border-red-500 peer-checked:bg-red-500"
              : "border-[#2a3d3b] peer-checked:border-[#25B49A] peer-checked:bg-[#25B49A] hover:border-[rgba(255,255,255,0.35)]",
          ].join(" ")}
        >
          <Check size={14} strokeWidth={3} className="text-white" />
        </span>
        <span
          className="text-[rgba(255,255,255,0.7)] text-[13px] leading-relaxed"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          {labelByType[consentType]}
        </span>
      </label>

      {error && (
        <p
          id={errorId}
          role="alert"
          className="flex items-center gap-1.5 text-red-400 text-[12px] font-semibold pl-8"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold shrink-0">
            !
          </span>
          {error}
        </p>
      )}
    </div>
  );
});

ConsentCheckbox.displayName = "ConsentCheckbox";
