"use client";

import React, { memo } from "react";
import { cn } from "@/src/lib/utils";

type QuizOptionStatus =
  | "idle"
  | "selected"
  | "correct"
  | "incorrect"
  | "missed-correct";

interface QuizOptionProps {
  optionId: string;
  letter: string;
  label: string;
  status: QuizOptionStatus;
  disabled?: boolean;
  onSelect: (optionId: string) => void;
}

const STATUS_CONTAINER: Record<QuizOptionStatus, string> = {
  idle: "border-white/10 bg-[#1C2E35] text-white",
  selected:
    "border-[var(--color-accent)] bg-[rgba(79,195,247,0.10)] text-white shadow-[0_3px_0_0_#075985]",
  correct:
    "border-[var(--color-primary-light)] bg-[rgba(37,180,154,0.12)] text-[var(--color-primary-light)] shadow-[0_3px_0_0_var(--color-primary-dark)]",
  incorrect:
    "border-red-500 bg-[rgba(239,68,68,0.10)] text-rose-300 animate-[shake_0.5s_ease-in-out]",
  "missed-correct":
    "border-[var(--color-primary-light)] bg-[rgba(37,180,154,0.12)] text-[var(--color-primary-light)]",
};

const STATUS_KEY: Record<QuizOptionStatus, string> = {
  idle: "bg-white/[0.08] text-white/55",
  selected: "bg-[var(--color-accent)] text-[#082F49]",
  correct: "bg-[var(--color-primary-light)] text-[#042F2E]",
  incorrect: "bg-red-500 text-white",
  "missed-correct": "bg-[var(--color-primary-light)] text-[#042F2E]",
};

const OptionComponent: React.FC<QuizOptionProps> = ({
  optionId,
  letter,
  label,
  status,
  disabled = false,
  onSelect,
}) => {
  const handleClick = (): void => {
    if (disabled) return;
    onSelect(optionId);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      aria-pressed={status === "selected"}
      className={cn(
        "flex w-full items-center gap-3 rounded-2xl border-2 px-4 py-3.5 text-left",
        "text-[15px] font-extrabold transition-all duration-150 ease-out",
        "shadow-[0_3px_0_0_rgba(0,0,0,0.30)]",
        "hover:border-white/20",
        "active:translate-y-[2px] active:shadow-[0_1px_0_0_rgba(0,0,0,0.30)]",
        "disabled:cursor-not-allowed",
        STATUS_CONTAINER[status]
      )}
    >
      <span
        className={cn(
          "grid h-7 w-7 shrink-0 place-items-center rounded-lg font-display text-sm",
          STATUS_KEY[status]
        )}
      >
        {letter}
      </span>
      <span className="flex-1">{label}</span>
    </button>
  );
};

export const QuizOption = memo(OptionComponent);
