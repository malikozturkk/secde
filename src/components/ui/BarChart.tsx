"use client";

import React, { memo, useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/src/lib/utils";
import { MOTION_REDUCED, MOTION_SPRING } from "@/src/constants/motion";

export interface BarDatum {
  key: string;
  label: string;
  short?: string;
  value: number;
  color: string;
  shadow?: string;
}

interface BarChartProps {
  data: readonly BarDatum[];
  height?: number;
  className?: string;
  hideValues?: boolean;
  "aria-label"?: string;
}

const BarChartComponent: React.FC<BarChartProps> = ({
  data,
  height = 132,
  className,
  hideValues = false,
  "aria-label": ariaLabel,
}) => {
  const reactId = useId();
  const prefersReduced = useReducedMotion();
  const max = Math.max(1, ...data.map((d) => d.value));
  const total = data.reduce((sum, d) => sum + d.value, 0);

  const description =
    ariaLabel ??
    `Namaz dağılımı, toplam ${total}: ` +
      data.map((d) => `${d.label} ${d.value}`).join(", ");

  return (
    <div
      role="img"
      aria-label={description}
      className={cn("flex w-full items-end justify-between gap-1.5", className)}
    >
      {data.map((d) => {
        const ratio = d.value / max;
        const barHeight =
          d.value > 0 ? Math.max(8, Math.round(ratio * height)) : 4;
        const isEmpty = d.value === 0;
        return (
          <div
            key={`${reactId}-${d.key}`}
            className="flex min-w-0 flex-1 flex-col items-center gap-1.5"
            title={`${d.label}: ${d.value}`}
          >
            {!hideValues && (
              <span
                className={cn(
                  "text-[11px] font-black tabular-nums leading-none",
                  isEmpty ? "text-[var(--ng-text-3)]" : "text-[var(--ng-text-2)]"
                )}
              >
                {d.value}
              </span>
            )}
            <div
              className="flex w-full items-end justify-center"
              style={{ height }}
            >
              <motion.div
                className={cn(
                  "w-full max-w-[34px] origin-bottom rounded-t-lg will-change-transform",
                  isEmpty && "bg-white/[0.06]"
                )}
                initial={false}
                animate={{ scaleY: barHeight / height }}
                transition={
                  prefersReduced ? MOTION_REDUCED : MOTION_SPRING.ui
                }
                style={
                  isEmpty
                    ? { height }
                    : {
                        height,
                        background: d.color,
                        boxShadow: `0 3px 0 0 ${
                          d.shadow ?? "rgba(0,0,0,0.4)"
                        }, inset 0 2px 0 rgba(255,255,255,0.28)`,
                      }
                }
              />
            </div>
            <span className="w-full truncate text-center text-[9px] font-bold uppercase tracking-[0.04em] text-[var(--ng-text-3)]">
              {d.short ?? d.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export const BarChart = memo(BarChartComponent);
