"use client";

import React, { memo } from "react";
import { cn } from "@/src/lib/utils";

interface QuizProgressProps {
  total: number;
  current: number;
  answered: boolean;
  activePercent?: number;
}

const QuizProgressComponent: React.FC<QuizProgressProps> = ({
  total,
  current,
  answered,
  activePercent,
}) => {
  return (
    <div className="flex flex-1 gap-1.5" aria-label="Quiz ilerlemesi">
      {Array.from({ length: total }).map((_, idx) => {
        const isDone = idx < current;
        const isActive = idx === current;
        const hasTimer =
          isActive && !answered && typeof activePercent === "number";
        const inlineWidth = hasTimer
          ? `${Math.max(0, Math.min(100, activePercent ?? 0))}%`
          : undefined;
        return (
          <div
            key={idx}
            className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]"
          >
            <div
              style={inlineWidth ? { width: inlineWidth } : undefined}
              className={cn(
                "h-full rounded-full transition-[width] duration-200 ease-linear",
                hasTimer
                  ? "bg-[var(--ng-sky)]"
                  : "bg-[var(--ng-green)]",
                !hasTimer && isDone && "w-full",
                !hasTimer && isActive && !answered && "w-2/5",
                !hasTimer && isActive && answered && "w-3/4",
                !hasTimer && !isDone && !isActive && "w-0"
              )}
            />
          </div>
        );
      })}
    </div>
  );
};

export const QuizProgress = memo(QuizProgressComponent);
