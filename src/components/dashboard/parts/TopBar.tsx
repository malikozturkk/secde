"use client";

import React, { memo } from "react";
import { Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimatedNumber } from "@/src/hooks/streak";
import { STREAK_LOCALE } from "@/src/constants/streak";
import { cn } from "@/src/lib/utils";
import { FireIcon, SnowflakeIcon, XpStarIcon } from "../icons";

type ChipTone = "fire" | "xp" | "ice";

const CHIP_TONE_CLASSES: Record<ChipTone, string> = {
  fire: cn(
    "bg-gradient-to-b from-[rgba(255,107,53,0.20)] to-[rgba(255,107,53,0.06)]",
    "border-[rgba(255,107,53,0.45)] shadow-[0_4px_0_0_rgba(124,39,8,0.40)]",
    "text-white [&_[data-chip-num]]:text-[#FF6B35] [&_[data-chip-icon]]:text-[#FF6B35]"
  ),
  xp: cn(
    "bg-gradient-to-b from-[rgba(79,67,202,0.25)] to-[rgba(79,67,202,0.08)]",
    "border-[rgba(124,109,255,0.45)] shadow-[0_4px_0_0_rgba(30,27,75,0.55)]",
    "text-white [&_[data-chip-num]]:text-[#C7B9FF] [&_[data-chip-icon]]:text-[#C7B9FF]"
  ),
  ice: cn(
    "bg-gradient-to-b from-[rgba(79,195,247,0.18)] to-[rgba(79,195,247,0.05)]",
    "border-[rgba(79,195,247,0.40)] shadow-[0_4px_0_0_rgba(7,47,75,0.60)]",
    "text-white [&_[data-chip-num]]:text-[#9AE0FF] [&_[data-chip-icon]]:text-[#9AE0FF]"
  ),
};

interface TopBarChipProps {
  tone: ChipTone;
  value: number;
  icon: React.ReactNode;
  ariaLabel: string;
  burst?: number | null;
  withSeparators?: boolean;
}

const TopBarChip = memo<TopBarChipProps>(
  ({ tone, value, icon, ariaLabel, burst, withSeparators }) => {
    const animatedValue = useAnimatedNumber(value);
    const displayValue = withSeparators
      ? animatedValue.toLocaleString(STREAK_LOCALE)
      : String(animatedValue);
    const showBurst = burst !== null && burst !== undefined && burst > 0;
    return (
      <motion.div
        className={cn(
          "relative inline-flex items-center gap-2 px-3 py-2 rounded-full border-[1.5px]",
          "font-black text-sm tabular-nums tracking-wide select-none",
          "transition-transform duration-150",
          CHIP_TONE_CLASSES[tone]
        )}
        animate={showBurst ? { scale: [1, 1.18, 1] } : undefined}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        aria-label={ariaLabel}
        title={ariaLabel}
      >
        <span
          data-chip-icon
          className="inline-flex h-[18px] w-[18px] items-center justify-center"
        >
          {icon}
        </span>
        <span data-chip-num>{displayValue}</span>
        <AnimatePresence>
          {showBurst && (
            <motion.span
              key={burst}
              className="pointer-events-none absolute left-1/2 -top-1 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#FF6B35] px-2 py-1 text-[10px] font-black text-white shadow-[0_3px_0_0_rgba(124,39,8,0.6)]"
              initial={{ y: 4, opacity: 0, scale: 0.7 }}
              animate={{ y: -28, opacity: 1, scale: 1 }}
              exit={{ y: -36, opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              +{burst} XP
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }
);
TopBarChip.displayName = "TopBarChip";

interface DashboardTopBarProps {
  currentStreak: number;
  totalXp: number;
  streakFreezeCount: number;
  xpBurst?: number | null;
  onOpenSettings?: () => void;
  className?: string;
}

const TopBarComponent: React.FC<DashboardTopBarProps> = ({
  currentStreak,
  totalXp,
  streakFreezeCount,
  xpBurst,
  onOpenSettings,
  className,
}) => {
  return (
    <header className={cn("flex items-center gap-2.5", className)}>
      <TopBarChip
        tone="fire"
        value={currentStreak}
        ariaLabel="Güncel seri"
        icon={<FireIcon className="h-4 w-4" />}
      />
      <TopBarChip
        tone="xp"
        value={totalXp}
        ariaLabel="Toplam XP"
        withSeparators
        burst={xpBurst}
        icon={<XpStarIcon className="h-[14px] w-[14px]" />}
      />
      <TopBarChip
        tone="ice"
        value={streakFreezeCount}
        ariaLabel="Seri dondurma"
        icon={<SnowflakeIcon className="h-[14px] w-[14px]" />}
      />
      <div className="flex-1" />
      {onOpenSettings && (
        <button
          type="button"
          aria-label="Ayarlar"
          onClick={onOpenSettings}
          className={cn(
            "grid h-10 w-10 place-items-center rounded-full",
            "border-[1.5px] border-white/[0.06] bg-[#1C2E35]",
            "text-white/55 transition-all duration-100",
            "hover:text-white active:translate-y-[2px]"
          )}
        >
          <Settings size={18} strokeWidth={2.5} />
        </button>
      )}
    </header>
  );
};

export const DashboardTopBar = memo(TopBarComponent);
