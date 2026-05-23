"use client";

import React, { memo, useMemo } from "react";
import {
  ARC_HEIGHT,
  ARC_WIDTH,
  PRAYER_CONFIG,
  PRAYER_ORDER,
  TEXTS,
} from "@/src/constants/worship";
import { formatHoursMinutes, getPrayerState } from "@/src/lib/worship-utils";
import { PrayerKey } from "@/src/types/enums/worship.enums";
import type { WorshipData } from "@/src/types/worship.types";

interface DayOverviewProps {
  worship: WorshipData;
}

const SVG_RADIUS = ARC_WIDTH / 2 - 50;
const CX = ARC_WIDTH / 2;
const CY = ARC_HEIGHT - 20;

const DayOverviewComponent: React.FC<DayOverviewProps> = ({ worship }) => {
  const { times, dayProgressPercent } = worship;

  const sunriseMs = useMemo(
    () => new Date(times[PrayerKey.Sunrise].iso).getTime(),
    [times]
  );
  const maghribMs = useMemo(
    () => new Date(times[PrayerKey.Maghrib].iso).getTime(),
    [times]
  );

  const dayLengthLabel = useMemo(
    () => formatHoursMinutes(maghribMs - sunriseMs),
    [maghribMs, sunriseMs]
  );

  const sunProgress = useMemo(() => {
    const pct = (dayProgressPercent || 0) / 100;
    return Math.max(0, Math.min(1, pct));
  }, [dayProgressPercent]);

  const sunAngle = Math.PI * sunProgress;
  const sunX = CX - SVG_RADIUS * Math.cos(sunAngle);
  const sunY = CY - SVG_RADIUS * Math.sin(sunAngle);

  const positionForIso = useMemo(() => {
    const dayLen = Math.max(maghribMs - sunriseMs, 1);
    return (iso: string) => {
      const ms = new Date(iso).getTime();
      const pct = Math.max(0, Math.min(1, (ms - sunriseMs) / dayLen));
      const a = Math.PI * pct;
      return {
        x: CX - SVG_RADIUS * Math.cos(a),
        y: CY - SVG_RADIUS * Math.sin(a),
      };
    };
  }, [maghribMs, sunriseMs]);

  return (
    <section className="wsh-section">
      <div className="wsh-section-head">
        <div>
          <h3 className="wsh-section-title">{TEXTS.dayFlowTitle}</h3>
          <p className="wsh-section-sub">{TEXTS.dayFlowSubtitle}</p>
        </div>
        <span className="wsh-section-meta">
          {TEXTS.dayLength} · {dayLengthLabel}
        </span>
      </div>
      <div className="wsh-day-card">
        <svg
          viewBox={`0 0 ${ARC_WIDTH} ${ARC_HEIGHT}`}
          className="wsh-day-svg"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="wshSkyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.18} />
              <stop offset="60%" stopColor="#1A2B2A" stopOpacity={0} />
            </linearGradient>
            <radialGradient id="wshSunGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF4C2" />
              <stop offset="60%" stopColor="#FFCA6B" />
              <stop offset="100%" stopColor="#F59E0B" />
            </radialGradient>
            <filter id="wshSunGlow">
              <feGaussianBlur stdDeviation={6} />
            </filter>
          </defs>

          <rect
            x={0}
            y={0}
            width={ARC_WIDTH}
            height={ARC_HEIGHT}
            fill="url(#wshSkyGrad)"
          />
          <line
            x1={20}
            x2={ARC_WIDTH - 20}
            y1={CY}
            y2={CY}
            stroke="rgba(255,255,255,0.10)"
            strokeWidth={1.5}
            strokeDasharray="2 4"
          />
          <path
            d={`M ${
              CX - SVG_RADIUS
            } ${CY} A ${SVG_RADIUS} ${SVG_RADIUS} 0 0 1 ${
              CX + SVG_RADIUS
            } ${CY}`}
            stroke="rgba(255,255,255,0.10)"
            strokeWidth={2}
            fill="none"
            strokeDasharray="3 6"
          />

          {PRAYER_ORDER.map((key) => {
            const m = PRAYER_CONFIG[key];
            const time = times[key];
            const p = positionForIso(time.iso);
            const onArc =
              time.iso >= times[PrayerKey.Sunrise].iso &&
              time.iso <= times[PrayerKey.Maghrib].iso;
            return (
              <g key={key}>
                {onArc ? (
                  <>
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={5}
                      fill={m.color}
                      stroke="#1A2B2A"
                      strokeWidth={2}
                    />
                    <line
                      x1={p.x}
                      x2={p.x}
                      y1={p.y + 8}
                      y2={CY - 2}
                      stroke="rgba(255,255,255,0.15)"
                      strokeWidth={1}
                    />
                  </>
                ) : (
                  <circle
                    cx={p.x}
                    cy={CY + 12}
                    r={4}
                    fill={m.color}
                    stroke="#1A2B2A"
                    strokeWidth={2}
                  />
                )}
              </g>
            );
          })}

          {sunProgress > 0 && sunProgress < 1 && (
            <g>
              <circle
                cx={sunX}
                cy={sunY}
                r={22}
                fill="url(#wshSunGrad)"
                opacity={0.35}
                filter="url(#wshSunGlow)"
              />
              <circle cx={sunX} cy={sunY} r={14} fill="url(#wshSunGrad)" />
              <circle
                cx={sunX}
                cy={sunY}
                r={14}
                fill="none"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth={1.5}
              />
            </g>
          )}
        </svg>

        <div className="wsh-day-labels">
          {PRAYER_ORDER.map((key) => {
            const m = PRAYER_CONFIG[key];
            const time = times[key];
            const state = getPrayerState(time);
            return (
              <div key={key} className={`wsh-day-label is-${state}`}>
                <span
                  className="wsh-day-label-dot"
                  style={{ background: m.color }}
                />
                <span className="wsh-day-label-name">{m.shortLabel}</span>
                <span className="wsh-day-label-time">{time.time}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const DayOverview = memo(DayOverviewComponent);
