"use client";

import React, { memo } from "react";
import { Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimatedNumber } from "@/src/hooks/streak/useAnimatedNumber";
import { STREAK_LOCALE } from "@/src/constants/streak";
import { cn } from "@/src/lib/utils";
import { Fire, Snowflake, XpStar } from "@/src/icons/tsx/dashboard";

type ChipTone = "fire" | "xp" | "ice";

const CHIP_TONE_CLASSES: Record<ChipTone, string> = {
  fire: cn(
    "bg-[linear-gradient(180deg,rgba(255,122,41,0.34)_0%,rgba(255,122,41,0.12)_100%)]",
    "border-[var(--ng-flame)] shadow-[0_5px_0_0_var(--ng-flame-deep)]",
    "text-white [&_[data-chip-num]]:text-[var(--ng-flame)] [&_[data-chip-icon]]:text-[var(--ng-flame)]"
  ),
  xp: cn(
    "bg-[linear-gradient(180deg,rgba(155,89,246,0.36)_0%,rgba(155,89,246,0.12)_100%)]",
    "border-[var(--ng-violet)] shadow-[0_5px_0_0_var(--ng-violet-deep)]",
    "text-white [&_[data-chip-num]]:text-[var(--ng-violet)] [&_[data-chip-icon]]:text-[var(--ng-violet)]"
  ),
  ice: cn(
    "bg-[linear-gradient(180deg,rgba(44,200,255,0.30)_0%,rgba(44,200,255,0.10)_100%)]",
    "border-[var(--ng-sky)] shadow-[0_5px_0_0_var(--ng-sky-deep)]",
    "text-white [&_[data-chip-num]]:text-[var(--ng-sky)] [&_[data-chip-icon]]:text-[var(--ng-sky)]"
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
          "relative inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full",
          "border-[length:var(--ng-stroke)]",
          "font-display text-[17px] tabular-nums tracking-[0.01em] select-none",
          "transition-transform duration-[var(--motion-press)] ease-[var(--ease-out)]",
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
              className="pointer-events-none absolute left-1/2 -top-1 -translate-x-1/2 whitespace-nowrap rounded-full bg-[var(--ng-flame)] px-2.5 py-1 text-[11px] font-black text-white shadow-[0_3px_0_0_var(--ng-flame-deep)]"
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
    <header className={cn("flex items-center gap-3", className)}>
      <TopBarChip
        tone="fire"
        value={currentStreak}
        ariaLabel="Güncel seri"
        icon={<Fire className="h-[18px] w-[18px]" />}
      />
      <TopBarChip
        tone="xp"
        value={totalXp}
        ariaLabel="Toplam XP"
        withSeparators
        burst={xpBurst}
        icon={<XpStar className="h-4 w-4" />}
      />
      <TopBarChip
        tone="ice"
        value={streakFreezeCount}
        ariaLabel="Seri dondurma"
        icon={<Snowflake className="h-4 w-4" />}
      />
      <div className="flex-1" />
      {onOpenSettings && (
        <button
          type="button"
          aria-label="Ayarlar"
          onClick={onOpenSettings}
          className={cn(
            "grid h-11 w-11 place-items-center rounded-full",
            "border-[length:var(--ng-stroke)] border-[var(--ng-edge)] bg-[var(--ng-surface)]",
            "shadow-[0_4px_0_0_var(--ng-surface-deep)] text-[var(--ng-text-2)]",
            "transition-[transform,box-shadow,color] duration-[var(--motion-press)] ease-[var(--ease-out)]",
            "hover:text-white active:translate-y-[3px] active:shadow-[0_1px_0_0_var(--ng-surface-deep)]"
          )}
        >
          <Settings size={18} strokeWidth={2.5} />
        </button>
      )}
    </header>
  );
};

export const DashboardTopBar = memo(TopBarComponent);
