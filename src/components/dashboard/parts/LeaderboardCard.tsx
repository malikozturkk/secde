"use client";

import React, { memo } from "react";
import Link from "next/link";
import DefaultAvatar from "@/src/app/profile/[username]/DefaultAvatar";
import { STREAK_LOCALE } from "@/src/constants/streak";
import { cn } from "@/src/lib/utils";
import {
  LEADERBOARD_METRIC_LABELS,
  LEADERBOARD_METRIC_UNIT,
  LeaderboardMetric,
} from "@/src/types/enums/leaderboard.enums";
import type { LeaderboardData } from "@/src/types/leaderboard.types";
import Fire from "@/src/icons/tsx/dashboard/Fire";

interface LeaderboardCardProps {
  data: LeaderboardData | null;
  isLoading?: boolean;
  isError?: boolean;
  onSeeAll?: () => void;
}

const RANK_COLOR_CLASS: Record<number, string> = {
  1: "text-yellow-400",
  2: "text-zinc-200",
  3: "text-orange-400",
};

const LeaderboardCardComponent: React.FC<LeaderboardCardProps> = ({
  data,
  isLoading = false,
  isError = false,
  onSeeAll,
}) => {
  const metric = data?.metric ?? LeaderboardMetric.Streak;
  const title =
    data?.city != null
      ? `${data.city} · ${LEADERBOARD_METRIC_LABELS[metric]}`
      : LEADERBOARD_METRIC_LABELS[metric];
  const unit = LEADERBOARD_METRIC_UNIT[metric];
  const entries = data?.entries ?? [];
  const showStreakIcon = metric === LeaderboardMetric.Streak;

  return (
    <section
      className={cn(
        "rounded-3xl border border-white/[0.06] bg-[#1C2E35] p-[18px]",
        "flex flex-col gap-3"
      )}
      aria-label="Lider tablosu"
    >
      <header className="flex items-baseline justify-between gap-2">
        <h3 className="text-base font-black tracking-[-0.01em] text-white">
          {title}
        </h3>
        {onSeeAll && !isLoading && entries.length > 0 && (
          <button
            type="button"
            onClick={onSeeAll}
            className="text-[10px] font-black uppercase tracking-[0.10em] text-[var(--color-accent)] hover:brightness-110"
          >
            TÜMÜ →
          </button>
        )}
      </header>

      {isLoading &&
        Array.from({ length: 4 }).map((_, idx) => (
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
        ))}

      {!isLoading && isError && (
        <p className="py-3 text-center text-[13px] font-bold text-white/40">
          Lider tablosu şu an yüklenemedi.
        </p>
      )}

      {!isLoading && !isError && entries.length === 0 && (
        <p className="py-3 text-center text-[13px] font-bold text-white/40">
          Henüz kimse tabloya girmedi. İlk sen ol!
        </p>
      )}

      {!isLoading &&
        !isError &&
        entries.map((entry) => (
          <Link
            key={entry.username}
            href={`/profile/${entry.username}`}
            className={cn(
              "grid grid-cols-[24px_36px_1fr_auto] items-center gap-2.5 border-b border-white/[0.06] p-2 no-underline last:border-b-0",
              "transition-colors hover:bg-white/[0.03]",
              entry.isCurrentUser &&
                "rounded-2xl border border-[rgba(255,107,53,0.25)] bg-[rgba(255,107,53,0.06)] px-2"
            )}
          >
            <span
              className={cn(
                "font-display text-base tabular-nums",
                RANK_COLOR_CLASS[entry.rank] ?? "text-white/55",
                entry.isCurrentUser && "text-[#FF6B35]"
              )}
            >
              {entry.rank}
            </span>
            <span
              aria-hidden="true"
              className="h-8 w-8 overflow-hidden rounded-full border border-white/10"
              style={{
                backgroundColor: entry.avatarCustomization.colors.background,
              }}
            >
              <DefaultAvatar
                username={entry.username}
                config={entry.avatarCustomization}
              />
            </span>
            <span
              className={cn(
                "min-w-0 text-[13px] font-black",
                entry.isCurrentUser ? "text-[#FF6B35]" : "text-white"
              )}
            >
              <span className="block truncate">{entry.username}</span>
              {entry.city && (
                <small className="block truncate text-[10px] font-bold uppercase tracking-wide text-white/35">
                  {entry.city}
                </small>
              )}
            </span>
            <span className="flex items-center gap-1 font-display text-[13px] tabular-nums text-white/55">
              {entry.score.toLocaleString(STREAK_LOCALE)}
              {showStreakIcon ? (
                <Fire className="h-4 w-4 fill-[var(--color-streak)]" />
              ) : (
                <small className="text-[10px] font-bold uppercase text-white/35">
                  {unit}
                </small>
              )}
            </span>
          </Link>
        ))}

      {!isLoading &&
        !isError &&
        data &&
        entries.length > 0 &&
        !data.currentUser.inTopList && (
          <p className="pt-1 text-center text-[11px] font-bold text-white/40">
            {data.currentUser.rank
              ? `Sen ${
                  data.currentUser.rank
                }. sıradasın · ${data.currentUser.score.toLocaleString(
                  STREAK_LOCALE
                )} ${unit}`
              : "Henüz tabloya girmedin."}
          </p>
        )}
    </section>
  );
};

export const LeaderboardCard = memo(LeaderboardCardComponent);
