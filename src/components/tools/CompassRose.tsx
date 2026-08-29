"use client";

import React, { memo } from "react";
import { Kaaba } from "@/src/icons/tsx/tools";
import { cn } from "@/src/lib/utils";
import { normalizeDegrees } from "@/src/lib/qibla-utils";

interface CompassRoseProps {
  qiblaBearing: number;
  heading: number | null;
  isAligned: boolean;
}

const CARDINALS = [
  { label: "K", angle: 0 },
  { label: "D", angle: 90 },
  { label: "G", angle: 180 },
  { label: "B", angle: 270 },
] as const;

const CompassRoseComponent: React.FC<CompassRoseProps> = ({
  qiblaBearing,
  heading,
  isAligned,
}) => {
  const dialRotation = heading === null ? 0 : -heading;
  const needleRotation = normalizeDegrees(qiblaBearing);

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[300px]"
      role="img"
      aria-label={`Kıble yönü ${Math.round(needleRotation)} derece${
        isAligned ? ", kıbleye dönüksün" : ""
      }`}
    >
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 rounded-full border-[3px] transition-colors duration-300",
          isAligned
            ? "border-[var(--ng-green)] bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--ng-green)_16%,transparent),var(--ng-surface))] shadow-[0_10px_28px_rgba(0,0,0,0.45)]"
            : "border-[var(--ng-edge)] bg-[radial-gradient(closest-side,rgba(255,255,255,0.05),var(--ng-surface))] shadow-[0_10px_28px_rgba(0,0,0,0.45)]"
        )}
      />

      {isAligned && (
        <div
          aria-hidden="true"
          className="absolute -inset-2 animate-[pulse-ring_2.4s_ease-in-out_infinite] rounded-full border-2 border-[var(--ng-green)] opacity-35 motion-reduce:animate-none"
        />
      )}

      <div
        aria-hidden="true"
        className="absolute inset-0 transition-transform duration-200 ease-out motion-reduce:transition-none"
        style={{ transform: `rotate(${dialRotation}deg)` }}
      >
        {CARDINALS.map(({ label, angle }) => (
          <div
            key={label}
            className="absolute left-1/2 top-0 h-full w-0"
            style={{ transform: `rotate(${angle}deg)` }}
          >
            <span
              className={cn(
                "absolute left-1/2 top-[18px] text-[13px] font-black tracking-[0.08em]",
                label === "K" ? "text-[var(--ng-flame)]" : "text-[var(--ng-text-3)]"
              )}
              style={{
                transform: `translateX(-50%) rotate(${
                  -angle - dialRotation
                }deg)`,
              }}
            >
              {label}
            </span>
          </div>
        ))}

        <div
          className="absolute left-1/2 top-0 h-full w-0 transition-transform duration-200 ease-out motion-reduce:transition-none"
          style={{ transform: `rotate(${needleRotation}deg)` }}
        >
          <div
            className="absolute left-1/2 flex -translate-x-1/2 flex-col items-center"
            style={{ top: 30 }}
          >
            <div
              className={cn(
                "h-0 w-0 border-x-[11px] border-b-[20px] border-x-transparent transition-colors duration-300",
                isAligned
                  ? "border-b-[var(--ng-green)]"
                  : "border-b-[var(--ng-sky)]"
              )}
            />
            <div
              className={cn(
                "w-[4px] rounded-full transition-colors duration-300",
                isAligned ? "bg-[var(--ng-green)]" : "bg-[var(--ng-sky)]"
              )}
              style={{ height: 84 }}
            />
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className={cn(
          "absolute left-1/2 top-1/2 grid h-[74px] w-[74px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[var(--ng-radius)] border-[length:var(--ng-stroke)] transition-colors duration-[var(--motion-base)]",
          isAligned
            ? "border-[var(--ng-green)] bg-[color-mix(in_srgb,var(--ng-green)_16%,transparent)] "
            : "border-[var(--ng-edge)] bg-[var(--ng-surface)] "
        )}
      >
        <Kaaba className="h-11 w-11" />
      </div>

      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[-12px] h-0 w-0 -translate-x-1/2 border-x-[8px] border-t-[13px] border-x-transparent border-t-white/70"
      />
    </div>
  );
};

export const CompassRose = memo(CompassRoseComponent);
