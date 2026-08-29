"use client";

import React, { memo } from "react";
import { Kaaba } from "@/src/icons/tsx/tools";
import { cn } from "@/src/lib/utils";
import { formatBearing, normalizeDegrees } from "@/src/lib/qibla-utils";

interface QiblaCompassProps {
  trueBearing: number;
  compassBearing: number;
  heading: number | null;
  delta: number | null;
  isAligned: boolean;
  isLive: boolean;
}

const CARDINALS = [
  { label: "K", angle: 0 },
  { label: "D", angle: 90 },
  { label: "G", angle: 180 },
  { label: "B", angle: 270 },
] as const;

const TICKS = Array.from({ length: 72 }, (_, i) => i * 5);

const RADIUS = 100;
const CENTER = 110;

const polar = (angleDeg: number, radius: number) => {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: CENTER + radius * Math.cos(rad),
    y: CENTER + radius * Math.sin(rad),
  };
};

const QiblaCompassComponent: React.FC<QiblaCompassProps> = ({
  trueBearing,
  compassBearing,
  heading,
  delta,
  isAligned,
  isLive,
}) => {
  const dialRotation = isLive && heading !== null ? -heading : 0;
  const needleAngle = normalizeDegrees(isLive ? compassBearing : trueBearing);

  const label = isLive
    ? isAligned
      ? "Kıbleye dönüksün"
      : delta === null
        ? null
        : `${Math.abs(Math.round(delta))}° ${delta > 0 ? "sağa" : "sola"}`
    : formatBearing(trueBearing);

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[320px] select-none"
      role="img"
      aria-label={
        isLive
          ? `Kıble yönü ${formatBearing(trueBearing)}. ${
              isAligned
                ? "Kıbleye dönüksün."
                : delta === null
                  ? ""
                  : `${Math.abs(Math.round(delta))} derece ${
                      delta > 0 ? "sağa" : "sola"
                    } dön.`
            }`
          : `Kıble yönü kuzeyden ${formatBearing(trueBearing)}`
      }
    >
      {isAligned && (
        <span
          aria-hidden="true"
          className="absolute inset-1 animate-[pulse-ring_2.4s_ease-in-out_infinite] rounded-full border-2 border-[var(--ng-green)] opacity-40 motion-reduce:animate-none"
        />
      )}

      <svg
        viewBox="0 0 220 220"
        className="h-full w-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="qibla-face" cx="50%" cy="42%" r="62%">
            <stop
              offset="0%"
              stopColor={isAligned ? "color-mix(in srgb, var(--ng-green) 26%, transparent)" : "rgba(255,255,255,0.07)"}
            />
            <stop offset="100%" stopColor="#0E1D24" />
          </radialGradient>
          <linearGradient id="qibla-needle" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={isAligned ? "var(--ng-green)" : "var(--ng-sky)"}
            />
            <stop
              offset="100%"
              stopColor={isAligned ? "#25B49A" : "#D98A0B"}
            />
          </linearGradient>
        </defs>

        <circle cx={CENTER} cy={CENTER} r={RADIUS + 6} fill="#0A151A" />
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="url(#qibla-face)"
          stroke={isAligned ? "var(--ng-green)" : "rgba(255,255,255,0.14)"}
          strokeWidth={2.5}
          className="transition-[stroke] duration-300"
        />

        <g
          className="transition-transform duration-200 ease-out motion-reduce:transition-none"
          style={{
            transform: `rotate(${dialRotation}deg)`,
            transformOrigin: `${CENTER}px ${CENTER}px`,
          }}
        >
          {TICKS.map((angle) => {
            const isMajor = angle % 45 === 0;
            const isMedium = !isMajor && angle % 15 === 0;
            const outer = polar(angle, RADIUS - 5);
            const inner = polar(angle, RADIUS - (isMajor ? 18 : isMedium ? 13 : 9));
            return (
              <line
                key={angle}
                x1={outer.x}
                y1={outer.y}
                x2={inner.x}
                y2={inner.y}
                stroke={
                  angle === 0
                    ? "#FF6B35"
                    : isMajor
                      ? "rgba(255,255,255,0.55)"
                      : "rgba(255,255,255,0.2)"
                }
                strokeWidth={isMajor ? 2.5 : 1.5}
                strokeLinecap="round"
              />
            );
          })}

          {CARDINALS.map(({ label: cardinal, angle }) => {
            const point = polar(angle, RADIUS - 32);
            return (
              <text
                key={cardinal}
                x={point.x}
                y={point.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={15}
                fontWeight={900}
                fill={angle === 0 ? "#FF6B35" : "rgba(255,255,255,0.4)"}
                style={{
                  transform: `rotate(${-dialRotation}deg)`,
                  transformOrigin: `${point.x}px ${point.y}px`,
                }}
              >
                {cardinal}
              </text>
            );
          })}

          <g
            className="transition-transform duration-200 ease-out motion-reduce:transition-none"
            style={{
              transform: `rotate(${needleAngle}deg)`,
              transformOrigin: `${CENTER}px ${CENTER}px`,
            }}
          >
            <path
              d={`M ${CENTER} ${CENTER - RADIUS + 14}
                  L ${CENTER + 13} ${CENTER - 18}
                  L ${CENTER} ${CENTER - 6}
                  L ${CENTER - 13} ${CENTER - 18} Z`}
              fill="url(#qibla-needle)"
            />
            <circle
              cx={CENTER}
              cy={CENTER - RADIUS + 14}
              r={4}
              fill={isAligned ? "var(--ng-green)" : "var(--ng-sky)"}
            />
          </g>
        </g>
      </svg>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-transform duration-200 ease-out motion-reduce:transition-none"
        style={{ transform: `rotate(${dialRotation + needleAngle}deg)` }}
      >
        <div
          className={cn(
            "absolute left-1/2 top-[2%] grid h-11 w-11 -translate-x-1/2 place-items-center rounded-2xl border-2 transition-colors duration-300",
            isAligned
              ? "border-[var(--ng-green)] bg-[color-mix(in_srgb,var(--ng-green)_16%,transparent)]"
              : "border-white/15 bg-[#12222B] shadow-[0_4px_0_0_rgba(0,0,0,0.45)]"
          )}
          style={{ transform: `translateX(-50%) rotate(${-(dialRotation + needleAngle)}deg)` }}
        >
          <Kaaba className="h-7 w-7" />
        </div>
      </div>

      {isLive && (
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-[-2px] h-0 w-0 -translate-x-1/2 border-x-[9px] border-t-[15px] border-x-transparent border-t-white/75"
        />
      )}

      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 flex w-[46%] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-0.5"
      >
        <span
          className={cn(
            "font-display text-[30px] leading-none tracking-[0.01em] transition-colors duration-300",
            isAligned ? "text-[var(--ng-green)]" : "text-white"
          )}
        >
          {label}
        </span>
        <span className="text-[10px] font-black uppercase tracking-[0.14em] text-white/35">
          {isLive ? "kıble" : "kuzeyden"}
        </span>
      </div>
    </div>
  );
};

export const QiblaCompass = memo(QiblaCompassComponent);
