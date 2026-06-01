"use client";

import React, { memo } from "react";
import { cn } from "@/src/lib/utils";

interface QuizProgressProps {
  total: number;
  current: number;
  answered: boolean;
}

const QuizProgressComponent: React.FC<QuizProgressProps> = ({
  total,
  current,
  answered,
}) => {
  return (
    <div className="flex flex-1 gap-1.5" aria-label="Quiz ilerlemesi">
      {Array.from({ length: total }).map((_, idx) => {
        const isDone = idx < current;
        const isActive = idx === current;
        return (
          <div
            key={idx}
            className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]"
          >
            <div
              className={cn(
                "h-full rounded-full bg-[var(--color-primary-light)] transition-[width] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                isDone && "w-full",
                isActive && !answered && "w-2/5",
                isActive && answered && "w-3/4",
                !isDone && !isActive && "w-0"
              )}
            />
          </div>
        );
      })}
    </div>
  );
};

export const QuizProgress = memo(QuizProgressComponent);
