"use client";

import React, { memo, useMemo } from "react";
import { StreakHeroVariant } from "@/src/types/enums/streak.enums";
import {
  STREAK_HERO_BUBBLES,
  type StreakCharacterName,
} from "@/src/constants/streak";
import { SparkleIcon, TrophyIcon } from "../icons";
import { CharacterIllustration } from "./CharacterIllustration";
import { cn } from "@/src/lib/utils";

interface StarSpec {
  top: number;
  left: number;
  delay: number;
  size: "lg" | "md" | "sm";
}

const STAR_SIZE_CLASS: Record<StarSpec["size"], string> = {
  lg: "text-[18px]",
  md: "text-[12px]",
  sm: "text-[9px] opacity-70",
};

const mulberry32 = (seed: number): (() => number) => {
  let t = seed >>> 0 || 1;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
};

const buildStars = (seed: number): readonly StarSpec[] => {
  const rand = mulberry32(seed * 9301 + 49297);
  const items: StarSpec[] = [];
  for (let i = 0; i < 9; i += 1) {
    items.push({
      top: 4 + rand() * 90,
      left: 2 + rand() * 96,
      delay: -(rand() * 2.6),
      size: i % 3 === 0 ? "lg" : i % 3 === 1 ? "md" : "sm",
    });
  }
  return items;
};

const VARIANT_BG_CLASS: Record<StreakHeroVariant, string> = {
  [StreakHeroVariant.Normal]: cn(
    "bg-[radial-gradient(120%_80%_at_18%_18%,rgba(255,107,53,0.28)_0%,transparent_55%),radial-gradient(120%_90%_at_100%_100%,rgba(245,166,35,0.18)_0%,transparent_60%),linear-gradient(160deg,#2A1813_0%,#150B09_100%)]",
    "border-[rgba(255,107,53,0.20)] shadow-[0_10px_0_0_rgba(124,39,8,0.35),0_24px_50px_rgba(0,0,0,0.45)]"
  ),
  [StreakHeroVariant.Cuma]: cn(
    "bg-[radial-gradient(120%_80%_at_18%_18%,rgba(5,150,105,0.28)_0%,transparent_55%),radial-gradient(120%_90%_at_100%_100%,rgba(34,197,94,0.16)_0%,transparent_60%),linear-gradient(160deg,#0B2417_0%,#061309_100%)]",
    "border-[rgba(5,150,105,0.30)] shadow-[0_10px_0_0_rgba(2,44,34,0.55),0_24px_50px_rgba(0,0,0,0.45)]"
  ),
  [StreakHeroVariant.Ramazan]: cn(
    "bg-[radial-gradient(120%_80%_at_18%_18%,rgba(124,58,237,0.30)_0%,transparent_55%),radial-gradient(120%_90%_at_100%_100%,rgba(79,195,247,0.18)_0%,transparent_60%),linear-gradient(160deg,#1A1438_0%,#0A0820_100%)]",
    "border-[rgba(124,58,237,0.30)] shadow-[0_10px_0_0_rgba(59,7,100,0.45),0_24px_50px_rgba(0,0,0,0.45)]"
  ),
  [StreakHeroVariant.Bayram]: cn(
    "bg-[radial-gradient(120%_100%_at_20%_0%,rgba(234,179,8,0.40)_0%,transparent_55%),radial-gradient(120%_100%_at_100%_100%,rgba(245,166,35,0.30)_0%,transparent_60%),linear-gradient(160deg,#3B2A0C_0%,#1B1408_100%)]",
    "border-[rgba(234,179,8,0.40)] shadow-[0_10px_0_0_rgba(113,63,18,0.45),0_24px_50px_rgba(0,0,0,0.50)]"
  ),
};

const VARIANT_EYEBROW_CLASS: Record<StreakHeroVariant, string> = {
  [StreakHeroVariant.Normal]: "text-[rgba(255,202,107,0.85)]",
  [StreakHeroVariant.Cuma]: "text-emerald-300",
  [StreakHeroVariant.Ramazan]: "text-violet-200",
  [StreakHeroVariant.Bayram]: "text-yellow-300",
};

const VARIANT_STREAK_NUM_TEXT_SHADOW: Record<StreakHeroVariant, string> = {
  [StreakHeroVariant.Normal]:
    "[text-shadow:0_0_28px_rgba(255,107,53,0.6),0_4px_0_rgba(124,39,8,0.7)]",
  [StreakHeroVariant.Cuma]:
    "[text-shadow:0_0_28px_rgba(5,150,105,0.7),0_4px_0_rgba(2,44,34,0.7)]",
  [StreakHeroVariant.Ramazan]:
    "[text-shadow:0_0_28px_rgba(124,58,237,0.7),0_4px_0_rgba(59,7,100,0.7)]",
  [StreakHeroVariant.Bayram]:
    "[text-shadow:0_0_28px_rgba(234,179,8,0.7),0_4px_0_rgba(113,63,18,0.7)]",
};

interface HeroProps {
  variant: StreakHeroVariant;
  currentStreak: number;
  longestStreak: number;
  message: string;
  character: StreakCharacterName;
  bubble?: string;
  bubbleSeed?: number;
  size?: "default" | "lg";
}

const HeroComponent: React.FC<HeroProps> = ({
  variant,
  currentStreak,
  longestStreak,
  message,
  character,
  bubble,
  bubbleSeed = 0,
  size = "default",
}) => {
  const stars = useMemo(
    () => buildStars(currentStreak + bubbleSeed + 1),
    [currentStreak, bubbleSeed]
  );
  const bubbleText =
    bubble ??
    STREAK_HERO_BUBBLES[
      Math.abs(currentStreak + bubbleSeed) % STREAK_HERO_BUBBLES.length
    ];

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden rounded-3xl border-[1.5px]",
        "p-[22px_22px_24px] sm:p-[28px_28px_32px] lg:p-[32px_32px_36px]",
        VARIANT_BG_CLASS[variant]
      )}
      aria-label={`Güncel seri ${currentStreak} gün`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-45"
      >
        {stars.map((s, i) => (
          <span
            key={`${s.top}-${s.left}-${i}`}
            className={cn(
              "absolute font-bold text-amber-400 animate-[starFloat_2.6s_ease-in-out_infinite]",
              STAR_SIZE_CLASS[s.size]
            )}
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              animationDelay: `${s.delay}s`,
            }}
          >
            ★
          </span>
        ))}
      </div>

      <div className="relative z-10 grid grid-cols-[1fr_auto] items-end gap-4">
        <div className="flex flex-col gap-1">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.14em]",
              VARIANT_EYEBROW_CLASS[variant]
            )}
          >
            <SparkleIcon className="h-[11px] w-[11px]" />
            GÜNCEL SERİ
          </span>
          <div
            className={cn(
              "font-display tabular-nums leading-[0.95] tracking-[-0.01em] my-1",
              size === "lg"
                ? "text-[120px] sm:text-[140px]"
                : "text-[84px] sm:text-[96px]",
              currentStreak === 0 ? "text-white/45" : "text-white",
              currentStreak !== 0 && VARIANT_STREAK_NUM_TEXT_SHADOW[variant]
            )}
          >
            {currentStreak}
          </div>
          <div className="text-sm font-black uppercase tracking-[0.04em] text-white/78">
            <span className="text-[#FF6B35]">GÜNLÜK</span> SERİ
          </div>
          <p className="mt-2.5 max-w-[220px] text-[13px] sm:text-[14px] sm:max-w-[320px] font-bold leading-snug text-white/65">
            {message}
          </p>
          <span
            className={cn(
              "mt-3 inline-flex w-fit items-center gap-1.5 rounded-full",
              "border border-white/[0.08] bg-black/30 px-2.5 py-1",
              "text-[11px] font-black uppercase tracking-[0.08em]",
              VARIANT_EYEBROW_CLASS[variant]
            )}
          >
            <TrophyIcon className="h-[10px] w-[10px]" />
            EN UZUN: {longestStreak} GÜN
          </span>
        </div>

        <div
          className={cn(
            "relative flex shrink-0 items-end justify-center",
            size === "lg" ? "h-[240px] w-[200px]" : "h-[168px] w-[132px]"
          )}
        >
          <div className="absolute right-[-4px] top-[6px] z-20 whitespace-nowrap rounded-[14px] rounded-bl-[4px] bg-white px-2.5 py-1.5 text-[11px] font-black tracking-wide text-[#2A1813] shadow-[0_4px_0_0_rgba(0,0,0,0.25)] animate-[starFloat_3.6s_ease-in-out_infinite]">
            {bubbleText}
          </div>
          <div
            aria-hidden="true"
            className="absolute -bottom-3 left-1/2 z-0 h-[30px] w-[110px] -translate-x-1/2 rounded-full bg-[radial-gradient(50%_50%,rgba(255,107,53,0.45),transparent_70%)] blur-md"
          />
          <CharacterIllustration
            character={character}
            animated
            shadow="strong"
            className="relative z-10"
          />
        </div>
      </div>
    </section>
  );
};

export const Hero = memo(HeroComponent);
