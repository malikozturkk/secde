"use client";

import React, { memo, useId } from "react";
import { cn } from "@/src/lib/utils";

interface DonutChartProps {
  percent: number;
  size?: number;
  thickness?: number;
  from?: string;
  to?: string;
  trackColor?: string;
  label?: React.ReactNode;
  sublabel?: React.ReactNode;
  className?: string;
  "aria-label"?: string;
}

const clamp = (n: number): number => Math.max(0, Math.min(100, n));

const DonutChartComponent: React.FC<DonutChartProps> = ({
  percent,
  size = 140,
  thickness = 16,
  from = "var(--color-primary)",
  to = "var(--color-primary-light)",
  trackColor = "rgba(255,255,255,0.08)",
  label,
  sublabel,
  className,
  "aria-label": ariaLabel,
}) => {
  const reactId = useId();
  const gradientId = `donut-grad-${reactId}`;
  const value = clamp(percent);
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - value / 100);
  const center = size / 2;

  return (
    <div
      role="img"
      aria-label={ariaLabel ?? `Doğruluk %${Math.round(value)}`}
      className={cn("relative inline-grid place-items-center", className)}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
        </defs>
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={thickness}
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{
            transition:
              "stroke-dashoffset 700ms cubic-bezier(0.34,1.56,0.64,1)",
          }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div className="flex flex-col items-center leading-none">
          <span className="font-display text-[28px] tabular-nums text-white">
            {label ?? `%${Math.round(value)}`}
          </span>
          {sublabel && (
            <span className="mt-1 text-[11px] font-bold uppercase tracking-[0.08em] text-white/50">
              {sublabel}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export const DonutChart = memo(DonutChartComponent);
