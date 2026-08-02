"use client";

import React, { memo } from "react";
import { STREAK_LOCALE } from "@/src/constants/streak";
import { cn } from "@/src/lib/utils";
import type { LeaderboardRow } from "@/src/types/dashboard.types";
import Fire from "@/src/icons/tsx/dashboard/Fire";

interface LeaderboardCardProps {
  title?: string;
  rows: readonly LeaderboardRow[];
  onSeeAll?: () => void;
  isLoading?: boolean;
}

const RANK_COLOR_CLASS: Record<number, string> = {
  1: "text-yellow-400",
  2: "text-zinc-200",
  3: "text-orange-400",
};

const AVATAR_BG_CLASS: Record<string, string> = {
  "#F59E0B": "bg-amber-500",
  "#4F46E5": "bg-indigo-600",
  "#059669": "bg-emerald-600",
  "#FF6B35": "bg-[#FF6B35]",
  "#9333EA": "bg-purple-600",
  "#0EA5E9": "bg-sky-500",
  "#10B981": "bg-emerald-500",
  "#EF4444": "bg-red-500",
};

const LeaderboardCardComponent: React.FC<LeaderboardCardProps> = ({
  title = "Haftalık Lider",
  rows,
  onSeeAll,
  isLoading = false,
}) => {
  return (
    <section
      className={cn(
        "rounded-3xl border border-white/[0.06] bg-[#1C2E35] p-[18px]",
        "flex flex-col gap-3 overflow-scroll"
      )}
      aria-label="Haftalık lider tablosu"
    >
      <header className="flex items-baseline justify-between">
        <h3 className="text-base font-black tracking-[-0.01em] text-white">
          {title}
        </h3>
        {onSeeAll && (
          <button
            type="button"
            onClick={onSeeAll}
            className="text-[10px] font-black uppercase tracking-[0.10em] text-[var(--color-accent)] hover:brightness-110"
          >
            TÜMÜ →
          </button>
        )}
      </header>
      {isLoading
        ? Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={`lb-skel-${idx}`}
              className="grid grid-cols-[24px_36px_1fr_auto] items-center gap-2.5 border-b border-white/[0.06] py-2 last:border-b-0"
              aria-hidden="true"
            >
              <span className="font-display text-base text-white/15">·</span>
              <span className="h-8 w-8 rounded-full bg-white/[0.06]" />
              <span>
                <span className="block h-3 w-24 rounded bg-white/[0.08]" />
                <span className="mt-1 block h-2 w-16 rounded bg-white/[0.06]" />
              </span>
              <span className="h-3 w-12 rounded bg-white/[0.06]" />
            </div>
          ))
        : rows.map((row) => {
            const isTop3 = RANK_COLOR_CLASS[row.rank];
            const avatarBg = AVATAR_BG_CLASS[row.avatarColor] ?? "bg-zinc-500";
            return (
              <div
                key={row.rank}
                className={cn(
                  "grid grid-cols-[24px_36px_1fr_auto] items-center gap-2.5 border-b border-white/[0.06] py-2 last:border-b-0",
                  row.isCurrentUser &&
                    "rounded-2xl border border-[rgba(255,107,53,0.25)] bg-[rgba(255,107,53,0.06)] -mx-2 px-2"
                )}
              >
                <span
                  className={cn(
                    "font-display text-base tabular-nums",
                    isTop3 ?? "text-white/55",
                    row.isCurrentUser && "text-[#FF6B35]"
                  )}
                >
                  {row.rank}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "grid h-8 w-8 place-items-center rounded-full text-[13px] font-black text-white",
                    avatarBg
                  )}
                >
                  {row.avatarInitial}
                </span>
                <span
                  className={cn(
                    "text-[13px] font-black",
                    row.isCurrentUser ? "text-[#FF6B35]" : "text-white"
                  )}
                >
                  {row.name}
                  <small className="block text-[10px] font-bold uppercase tracking-wide text-white/35">
                    {row.city}
                  </small>
                </span>
                <span className="font-display text-[13px] tabular-nums text-white/55 flex items-center gap-1">
                  {row.currentStreak.toLocaleString(STREAK_LOCALE)} <Fire className="h-4 w-4 fill-[var(--color-streak)]" />
                </span>
              </div>
            );
          })}
    </section>
  );
};

export const LeaderboardCard = memo(LeaderboardCardComponent);
