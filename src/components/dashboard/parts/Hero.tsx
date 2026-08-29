"use client";

import React, { memo, useMemo } from "react";
import { StreakHeroVariant } from "@/src/types/enums/streak.enums";
import {
  STREAK_HERO_BUBBLES,
  type StreakCharacterName,
} from "@/src/constants/streak";
import { Sparkle, Trophy } from "@/src/icons/tsx/dashboard";
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
    "bg-[radial-gradient(120%_85%_at_16%_10%,rgba(255,122,41,0.55)_0%,transparent_58%),radial-gradient(130%_100%_at_100%_100%,rgba(255,199,44,0.32)_0%,transparent_62%),linear-gradient(165deg,#43200F_0%,#1B0C06_100%)]",
    "border-[var(--ng-flame)] shadow-[0_22px_50px_rgba(0,0,0,0.60)]"
  ),
  [StreakHeroVariant.Cuma]: cn(
    "bg-[radial-gradient(120%_85%_at_16%_10%,rgba(23,217,160,0.50)_0%,transparent_58%),radial-gradient(130%_100%_at_100%_100%,rgba(44,200,255,0.28)_0%,transparent_62%),linear-gradient(165deg,#0C3A2C_0%,#06170F_100%)]",
    "border-[var(--ng-green)] shadow-[0_22px_50px_rgba(0,0,0,0.60)]"
  ),
  [StreakHeroVariant.Ramazan]: cn(
    "bg-[radial-gradient(120%_85%_at_16%_10%,rgba(155,89,246,0.55)_0%,transparent_58%),radial-gradient(130%_100%_at_100%_100%,rgba(44,200,255,0.30)_0%,transparent_62%),linear-gradient(165deg,#281552_0%,#0C0723_100%)]",
    "border-[var(--ng-violet)] shadow-[0_22px_50px_rgba(0,0,0,0.60)]"
  ),
  [StreakHeroVariant.Bayram]: cn(
    "bg-[radial-gradient(120%_100%_at_18%_0%,rgba(255,199,44,0.60)_0%,transparent_58%),radial-gradient(130%_100%_at_100%_100%,rgba(255,122,41,0.42)_0%,transparent_62%),linear-gradient(165deg,#503A0B_0%,#1E1607_100%)]",
    "border-[var(--ng-gold)] shadow-[0_22px_50px_rgba(0,0,0,0.60)]"
  ),
};

const VARIANT_EYEBROW_CLASS: Record<StreakHeroVariant, string> = {
  [StreakHeroVariant.Normal]: "text-[var(--ng-gold)]",
  [StreakHeroVariant.Cuma]: "text-[var(--ng-green)]",
  [StreakHeroVariant.Ramazan]: "text-[var(--ng-violet)]",
  [StreakHeroVariant.Bayram]: "text-[var(--ng-gold)]",
};

const VARIANT_STREAK_NUM_TEXT_SHADOW: Record<StreakHeroVariant, string> = {
  [StreakHeroVariant.Normal]:
    "[text-shadow:0_0_46px_rgba(255,122,41,0.85),0_8px_0_var(--ng-flame-deep)]",
  [StreakHeroVariant.Cuma]:
    "[text-shadow:0_0_46px_rgba(23,217,160,0.85),0_8px_0_var(--ng-green-deep)]",
  [StreakHeroVariant.Ramazan]:
    "[text-shadow:0_0_46px_rgba(169,139,255,0.85),0_8px_0_var(--ng-violet-deep)]",
  [StreakHeroVariant.Bayram]:
    "[text-shadow:0_0_46px_rgba(255,199,44,0.85),0_8px_0_var(--ng-gold-deep)]",
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
        "relative isolate overflow-hidden rounded-[var(--ng-radius-lg)]",
        "border-[length:var(--ng-stroke-thick)]",
        "p-[24px_22px_28px] sm:p-[30px_28px_34px] lg:p-[36px_34px_40px]",
        VARIANT_BG_CLASS[variant]
      )}
      aria-label={`Güncel seri ${currentStreak} gün`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-70"
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
              "inline-flex items-center gap-1.5 text-[12px] font-black uppercase tracking-[0.18em]",
              VARIANT_EYEBROW_CLASS[variant]
            )}
          >
            <Sparkle className="h-[11px] w-[11px]" />
            GÜNCEL SERİ
          </span>
          <div
            className={cn(
              "font-display tabular-nums leading-[0.86] tracking-[-0.045em] my-1.5",
              size === "lg"
                ? "text-[136px] sm:text-[168px]"
                : "text-[96px] sm:text-[112px]",
              currentStreak === 0 ? "text-[var(--ng-text-3)]" : "text-white",
              currentStreak !== 0 && VARIANT_STREAK_NUM_TEXT_SHADOW[variant]
            )}
          >
            {currentStreak}
          </div>
          <div className="text-[15px] font-black uppercase tracking-[0.06em] text-[var(--ng-text-2)] sm:text-base">
            <span className="text-[var(--ng-flame)]">GÜNLÜK</span> SERİ
          </div>
          <p className="mt-3 max-w-[230px] text-[14px] font-bold leading-[1.45] text-[var(--ng-text-2)] sm:max-w-[340px] sm:text-[15px]">
            {message}
          </p>
          <span
            className={cn(
              "mt-4 inline-flex w-fit items-center gap-1.5 rounded-full",
              "border-2 border-white/[0.16] bg-black/45 px-3 py-1.5",
              "text-[11px] font-black uppercase tracking-[0.10em]",
              VARIANT_EYEBROW_CLASS[variant]
            )}
          >
            <Trophy className="h-[10px] w-[10px]" />
            EN UZUN: {longestStreak} GÜN
          </span>
        </div>

        <div
          className={cn(
            "relative flex shrink-0 items-end justify-center",
            size === "lg" ? "h-[252px] w-[208px]" : "h-[176px] w-[138px]"
          )}
        >
          <div className="absolute right-[-4px] top-[6px] z-20 whitespace-nowrap rounded-[14px] rounded-bl-[4px] bg-white px-3 py-2 text-[12px] font-black tracking-wide text-[#241009] shadow-[0_5px_0_0_rgba(0,0,0,0.45)] animate-[starFloat_3.6s_ease-in-out_infinite]">
            {bubbleText}
          </div>
          <div
            aria-hidden="true"
            className="absolute -bottom-3 left-1/2 z-0 h-[30px] w-[110px] -translate-x-1/2 rounded-full bg-[radial-gradient(50%_50%,rgba(255,122,41,0.45),transparent_70%)] blur-md"
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
