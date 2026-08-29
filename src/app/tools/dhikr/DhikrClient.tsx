"use client";

import React, { useCallback } from "react";
import { RotateCcw, Undo2 } from "lucide-react";
import { SeoPageShell } from "@/src/components/seo/SeoPageShell";
import { useDhikrCounter } from "@/src/hooks/tools/useDhikrCounter";
import { DHIKR_PRESETS } from "@/src/constants/tools";
import { ACCENT, ELEVATION, TEXT } from "@/src/constants/surface";
import { cn } from "@/src/lib/utils";

const RING = 268;
const STROKE = 14;
const RADIUS = (RING - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const BREADCRUMBS = [
  { name: "Ana sayfa", path: "/" },
  { name: "Araçlar", path: "/tools" },
  { name: "Zikirmatik", path: "/tools/dhikr" },
];

const SECONDARY_BUTTON = cn(
  "inline-flex items-center justify-center gap-2 rounded-[var(--ng-radius)]",
  "border-[length:var(--ng-stroke)] border-[var(--ng-edge)] bg-[var(--ng-surface)]",
  "py-3.5 text-[12px] font-black uppercase tracking-[0.1em] text-[var(--ng-text-2)]",
  "transition-colors duration-[var(--motion-fast)] ease-[var(--ease-out)] hover:border-[var(--ng-edge-strong)]",
  "disabled:opacity-40 disabled:active:translate-y-0",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ng-violet)]"
);

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
    <SeoPageShell
      publicShell
      className="ng-calm"
      breadcrumbs={BREADCRUMBS}
      eyebrow="Zikirmatik"
      title="Tesbihatını say"
      lede="Sübhânallah, Elhamdülillah, Allâhu ekber ve daha fazlası için hazır hedefler. Sayacın hedefe ulaşınca titreşimle haber verir; sayım yalnızca bu tarayıcıda tutulur."
    >
      <div className="-mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {DHIKR_PRESETS.map((item) => {
          const active = item.id === preset.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => selectPreset(item.id)}
              aria-pressed={active}
              className={cn(
                "shrink-0 snap-start whitespace-nowrap rounded-full px-4 py-2.5 text-[13px] font-bold",
                "border-[length:var(--ng-stroke)] transition-colors duration-[var(--motion-fast)] ease-[var(--ease-out)]",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ng-violet)]",
                active
                  ? ACCENT.violet.chip
                  : "border-[var(--ng-edge)] bg-[var(--ng-surface)] text-[var(--ng-text-2)] hover:border-[var(--ng-edge-strong)]"
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <section
        className={cn(
          "flex flex-col items-center gap-5 p-5 sm:p-6",
          ELEVATION.surface
        )}
      >
        <div className="text-center">
          <h2 className={cn(TEXT.h2, "m-0")}>{preset.label}</h2>
          <p className={cn(TEXT.muted, "m-0 mt-1.5")}>{preset.meaning}</p>
        </div>

        <button
          type="button"
          onClick={increment}
          onKeyDown={handleKeyDown}
          aria-label={`${preset.label} sayacı, ${count} bölü ${preset.target}. Saymak için dokun.`}
          className={cn(
            "relative grid touch-manipulation select-none place-items-center rounded-full",
            "transition-transform duration-[var(--motion-press)] ease-[var(--ease-out)]",
            "active:scale-[0.985] motion-reduce:transition-none",
            "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ng-violet)]"
          )}
          style={{ width: RING, height: RING }}
        >
          <span
            aria-hidden="true"
            className="absolute inset-[14px] rounded-full border-[length:var(--ng-stroke)] border-[var(--ng-edge)] bg-[var(--ng-surface-deep)] shadow-[inset_0_2px_0_rgba(255,255,255,0.05)]"
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
              className="transition-[stroke-dashoffset] duration-[var(--motion-base)] ease-[var(--ease-out)] motion-reduce:transition-none"
            />
            <defs>
              <linearGradient id="dhikrRing" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--ng-violet-deep)" />
                <stop offset="100%" stopColor="var(--ng-violet)" />
              </linearGradient>
            </defs>
          </svg>

          <span className="pointer-events-none relative flex flex-col items-center">
            <span className={cn(TEXT.num, "text-[80px]")}>{count}</span>
            <span className="mt-2 text-[12px] font-black uppercase tracking-[0.14em] text-[var(--ng-text-3)]">
              / {preset.target}
            </span>
          </span>
        </button>

        <div
          className={cn(
            "flex items-center gap-2 rounded-full px-4 py-1.5",
            ACCENT.violet.chip
          )}
        >
          <span className={cn(TEXT.num, "text-[18px] text-[var(--ng-violet)]")}>
            {completedRounds}
          </span>
          <span className="text-[11px] font-black uppercase tracking-[0.1em]">
            bugün tamamlanan tur
          </span>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={undo}
          disabled={count === 0}
          className={SECONDARY_BUTTON}
        >
          <Undo2 size={15} strokeWidth={2.8} aria-hidden="true" />
          Geri al
        </button>
        <button
          type="button"
          onClick={resetCount}
          disabled={count === 0}
          className={SECONDARY_BUTTON}
        >
          <RotateCcw size={15} strokeWidth={2.8} aria-hidden="true" />
          Sıfırla
        </button>
      </div>

      <section className={cn(ELEVATION.surface, "flex flex-col gap-1.5 p-4")}>
        <h2 className={cn(TEXT.eyebrow, "text-[var(--ng-text-3)]")}>
          İPUCU
        </h2>
        <p className={TEXT.body}>
          Sayaca boşluk veya Enter tuşuyla da basabilirsin. Hedefe ulaştığında
          tur sayısı artar ve sayaç sıfırdan devam eder; gün değişince turlar
          sıfırlanır.
        </p>
      </section>
    </SeoPageShell>
  );
};
