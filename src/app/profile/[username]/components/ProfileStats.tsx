"use client";

import React from "react";
import {
  LevelStatCard,
  StreakStatCard,
  PrayerBreakdownCard,
  QuizAccuracyCard,
  StatsError,
  StatsGridSkeleton,
} from "@/src/components/stats";
import { SectionHead } from "@/src/components/dashboard/parts";
import type { PublicStats, SelfStats } from "@/src/types/user-stats.types";

interface ProfileStatsProps {
  stats: PublicStats | undefined;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  selfLevel?: SelfStats["level"];
  selfQuiz?: SelfStats["prayers"]["quiz"];
}

export const ProfileStats: React.FC<ProfileStatsProps> = ({
  stats,
  isLoading,
  isError,
  onRetry,
  selfLevel,
  selfQuiz,
}) => {
  return (
    <section className="mt-3 flex flex-col gap-4">
      <SectionHead title="İstatistikler" />

      {isLoading && !stats ? (
        <StatsGridSkeleton count={4} />
      ) : isError && !stats ? (
        <StatsError onRetry={onRetry} />
      ) : stats ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <LevelStatCard
            level={stats.level.level}
            badgeKey={stats.level.badgeKey}
            progressPercent={
              selfLevel?.progressPercent ?? stats.level.progressPercent
            }
            totalXp={selfLevel?.totalXp}
            currentLevelXp={selfLevel?.currentLevelXp}
            xpToNextLevel={selfLevel?.xpToNextLevel}
            totalXpForNextLevel={selfLevel?.totalXpForNextLevel}
          />
          <StreakStatCard
            current={stats.streak.current}
            longest={stats.streak.longest}
          />
          <PrayerBreakdownCard
            className="sm:col-span-2"
            breakdown={stats.prayers.breakdown}
            totalCompleted={stats.prayers.totalCompleted}
          />
          {selfQuiz && (
            <QuizAccuracyCard
              className="sm:col-span-2"
              accuracyPercent={selfQuiz.accuracyPercent}
              passed={selfQuiz.passed}
              failed={selfQuiz.failed}
              totalAttempts={selfQuiz.totalAttempts}
            />
          )}
        </div>
      ) : null}
    </section>
  );
};
