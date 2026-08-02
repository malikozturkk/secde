"use client";

import React, { useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw, Undo2 } from "lucide-react";
import AppLayout from "@/src/components/layout/AppLayout";
import { useDhikrCounter } from "@/src/hooks/tools/useDhikrCounter";
import { DHIKR_PRESETS } from "@/src/constants/tools";
import { cn } from "@/src/lib/utils";

const RING = 268;
const STROKE = 14;
const RADIUS = (RING - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export const DhikrClient: React.FC = () => {
  const {
    preset,
    count,
    completedRounds,
    progressPercent,
    increment,
    undo,
    resetCount,
    selectPreset,
  } = useDhikrCounter();

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        increment();
      }
    },
    [increment]
  );

  return (
    <AppLayout mainClassName="px-4 pb-10 pt-6 lg:pt-8">
      <div className="mx-auto flex w-full flex-col gap-4">
        <Link
          href="/tools"
          className="inline-flex w-fit items-center gap-1.5 rounded-xl text-[11px] font-black uppercase tracking-[0.1em] text-white/45 transition-colors hover:text-white/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-light)]"
        >
          <ArrowLeft size={14} strokeWidth={3} aria-hidden="true" />
          Araçlar
        </Link>

        <div className="-mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {DHIKR_PRESETS.map((item) => {
            const active = item.id === preset.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => selectPreset(item.id)}
                aria-pressed={active}
                className={cn(
                  "shrink-0 snap-start whitespace-nowrap rounded-2xl border px-3.5 py-2 text-[12px] font-black transition-transform duration-100",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E0B487]",
                  active
                    ? "border-[rgba(176,123,74,0.65)] bg-[#8B5A2B] text-white shadow-[0_4px_0_0_#4A2C17] active:translate-y-[3px] active:shadow-[0_1px_0_0_#4A2C17]"
                    : "border-white/[0.08] bg-[#1C2E35] text-white/55 shadow-[0_4px_0_0_rgba(0,0,0,0.3)] active:translate-y-[3px] active:shadow-[0_1px_0_0_rgba(0,0,0,0.3)]"
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <section className="flex flex-col items-center gap-5 rounded-3xl border border-[rgba(176,123,74,0.34)] bg-gradient-to-b from-[rgba(176,123,74,0.14)] to-[#1C2E35] to-60% p-5">
          <div className="text-center">
            <h1 className="m-0 text-xl font-black tracking-[-0.01em] text-white">
              {preset.label}
            </h1>
            <p className="m-0 mt-1 text-[12px] font-bold text-white/45">
              {preset.meaning}
            </p>
          </div>

          <button
            type="button"
            onClick={increment}
            onKeyDown={handleKeyDown}
            aria-label={`${preset.label} sayacı, ${count} bölü ${preset.target}. Saymak için dokun.`}
            className={cn(
              "relative grid touch-manipulation select-none place-items-center rounded-full",
              "transition-transform duration-100 active:translate-y-1.5 motion-reduce:transition-none",
              "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E0B487]"
            )}
            style={{ width: RING, height: RING }}
          >
            <span
              aria-hidden="true"
              className="absolute inset-[14px] rounded-full bg-gradient-to-b from-[#2A3C48] to-[#16252C] shadow-[0_8px_0_0_#0E1A20,inset_0_2px_0_rgba(255,255,255,0.08)]"
            />
            <svg
              width={RING}
              height={RING}
              viewBox={`0 0 ${RING} ${RING}`}
              aria-hidden="true"
              className="absolute inset-0 -rotate-90"
            >
              <circle
                cx={RING / 2}
                cy={RING / 2}
                r={RADIUS}
                fill="none"
                stroke="rgba(255,255,255,0.07)"
                strokeWidth={STROKE}
              />
              <circle
                cx={RING / 2}
                cy={RING / 2}
                r={RADIUS}
                fill="none"
                stroke="url(#dhikrRing)"
                strokeWidth={STROKE}
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={CIRCUMFERENCE * (1 - progressPercent / 100)}
                className="transition-[stroke-dashoffset] duration-200 ease-out motion-reduce:transition-none"
              />
              <defs>
                <linearGradient id="dhikrRing" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#8B5A2B" />
                  <stop offset="100%" stopColor="#E0B487" />
                </linearGradient>
              </defs>
            </svg>

            <span className="pointer-events-none relative flex flex-col items-center">
              <span className="font-display text-[76px] leading-none tracking-[0.02em] text-white tabular-nums [text-shadow:0_5px_0_rgba(0,0,0,0.4)]">
                {count}
              </span>
              <span className="mt-1.5 text-[12px] font-black uppercase tracking-[0.14em] text-white/35">
                / {preset.target}
              </span>
            </span>
          </button>

          <div className="flex items-center gap-2 rounded-full border border-[rgba(176,123,74,0.38)] bg-[rgba(176,123,74,0.12)] px-4 py-1.5">
            <span className="font-display text-[18px] leading-none text-[#E0B487] tabular-nums">
              {completedRounds}
            </span>
            <span className="text-[11px] font-black uppercase tracking-[0.1em] text-white/45">
              bugün tamamlanan tur
            </span>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={undo}
            disabled={count === 0}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/[0.08] bg-[#1C2E35] py-3 text-xs font-black uppercase tracking-[0.1em] text-white/70 shadow-[0_4px_0_0_rgba(0,0,0,0.3)] transition-transform duration-100 active:translate-y-[3px] active:shadow-[0_1px_0_0_rgba(0,0,0,0.3)] disabled:opacity-40 disabled:active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-light)]"
          >
            <Undo2 size={15} strokeWidth={2.8} aria-hidden="true" />
            Geri al
          </button>
          <button
            type="button"
            onClick={resetCount}
            disabled={count === 0}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/[0.08] bg-[#1C2E35] py-3 text-xs font-black uppercase tracking-[0.1em] text-white/70 shadow-[0_4px_0_0_rgba(0,0,0,0.3)] transition-transform duration-100 active:translate-y-[3px] active:shadow-[0_1px_0_0_rgba(0,0,0,0.3)] disabled:opacity-40 disabled:active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-light)]"
          >
            <RotateCcw size={15} strokeWidth={2.8} aria-hidden="true" />
            Sıfırla
          </button>
        </div>
      </div>
    </AppLayout>
  );
};
