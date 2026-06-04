"use client";

import React, { useCallback, useMemo, useState } from "react";
import AppLayout from "@/src/components/layout/AppLayout";
import {
  pickHeroCharacter,
  resolveHeroVariant,
  resolveStreakMessage,
} from "@/src/lib/streak-utils";
import { useLeaderboardPreview } from "@/src/hooks/streak/useLeaderboardPreview";
import { useStreakController } from "@/src/hooks/streak/useStreakController";
import { getDomainErrorCode } from "@/src/lib/api-error";
import { LocationNotSetDialog } from "@/src/components/common/LocationNotSetDialog";
import { useWeekStrip } from "@/src/hooks/streak/useWeekStrip";
import { PrayerCardState } from "@/src/types/enums/streak.enums";
import type {
  PrayerCardViewModel,
  PrayerCompletionResult,
} from "@/src/types/streak.types";

import { CharacterIllustration } from "@/src/components/dashboard/parts/CharacterIllustration";
import { DashboardError } from "@/src/components/dashboard/parts/ErrorState";
import { DashboardSkeleton } from "@/src/components/dashboard/parts/Skeleton";
import { DashboardTopBar } from "@/src/components/dashboard/parts/TopBar";
import { DailyGoalCard } from "@/src/components/dashboard/parts/DailyGoalCard";
import { FreezeCard } from "@/src/components/dashboard/parts/FreezeCard";
import { Hero } from "@/src/components/dashboard/parts/Hero";
import { LeaderboardCard } from "@/src/components/dashboard/parts/LeaderboardCard";
import { PrayerList } from "@/src/components/dashboard/parts/PrayerList";
import { SectionHead } from "@/src/components/dashboard/parts/SectionHead";
import { WeekStrip } from "@/src/components/dashboard/parts/WeekStrip";
import { LevelStatCard } from "@/src/components/stats/LevelStatCard";
import { PrayerQuizModal } from "@/src/components/dashboard/quiz/PrayerQuizModal";
import { MonthHeatmapSheet } from "@/src/components/dashboard/month/MonthHeatmapSheet";

const TODAY_LABEL_FORMAT: Intl.DateTimeFormatOptions = {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
};

export const DashboardView: React.FC = () => {
  const controller = useStreakController();
  const { viewModel, stats, celebration, isLoading, error, action } =
    controller;
  const leaderboard = useLeaderboardPreview();
  const locationNotSet =
    !!error && getDomainErrorCode(error) === "USER_LOCATION_NOT_SET";
  const [locationDialogDismissed, setLocationDialogDismissed] =
    useState(false);
  const [quizPrayer, setQuizPrayer] = useState<PrayerCardViewModel | null>(
    null
  );
  const [monthOpen, setMonthOpen] = useState<boolean>(false);

  const handleMarkPrayer = useCallback((prayer: PrayerCardViewModel) => {
    if (!prayer.canMarkAsCompleted) return;
    if (
      prayer.state !== PrayerCardState.Current &&
      prayer.state !== PrayerCardState.Eligible
    ) {
      return;
    }
    setQuizPrayer(prayer);
  }, []);

  const handleQuizClose = useCallback(() => {
    setQuizPrayer(null);
  }, []);

  const handleQuizSubmit = useCallback(
    async (input: {
      prayerType: PrayerCardViewModel["type"];
      quizId: string;
      answers: { questionId: string; optionId: string }[];
    }): Promise<PrayerCompletionResult | undefined> => {
      const response = await controller.completePrayer(input);
      return response.prayerCompletion;
    },
    [controller]
  );

  const quizQueryParams = useMemo(() => {
    if (!quizPrayer) return null;
    return controller.buildQuizParams(quizPrayer.type);
  }, [controller, quizPrayer]);

  const selfStats = stats.data;
  const currentStreak = selfStats?.streak.current ?? 0;
  const longestStreak = selfStats?.streak.longest ?? 0;
  const streakFreezeCount = selfStats?.streak.freezeCount ?? 0;
  const lastActiveDate = selfStats?.streak.lastActiveDate ?? null;
  const totalXp = selfStats?.level.totalXp ?? 0;
  const level = selfStats?.level.level ?? 1;
  const levelBadgeKey = selfStats?.level.badgeKey ?? "";
  const currentLevelXp = selfStats?.level.currentLevelXp ?? 0;
  const xpToNextLevel = selfStats?.level.xpToNextLevel ?? 0;
  const totalXpForNextLevel = selfStats?.level.totalXpForNextLevel ?? 0;
  const levelProgressPercent = selfStats?.level.progressPercent ?? 0;

  const completedToday = viewModel?.completedToday ?? 0;
  const totalToday = viewModel?.totalToday ?? 0;

  const weekDays = useWeekStrip({
    currentStreak,
    lastActiveDate,
    protectedDates: [],
    completedToday,
    totalToday,
  });

  const todayLabel = useMemo(
    () =>
      new Date().toLocaleDateString("tr-TR", TODAY_LABEL_FORMAT).toUpperCase(),
    []
  );

  if (isLoading && !viewModel) {
    return (
      <AppLayout rightPanel={<RightRailSkeleton />} mainClassName="px-4 py-6">
        <DashboardSkeleton />
      </AppLayout>
    );
  }

  if (locationNotSet) {
    return (
      <AppLayout mainClassName="px-4 py-6">
        <DashboardError
          message="Konumun ayarlı değil. Namaz görevlerini görmek için ayarlardan konumunu belirle."
          onRetry={controller.refresh}
        />
        <LocationNotSetDialog
          isOpen={!locationDialogDismissed}
          onClose={() => setLocationDialogDismissed(true)}
        />
      </AppLayout>
    );
  }

  if (error && !viewModel) {
    return (
      <AppLayout mainClassName="px-4 py-6">
        <DashboardError message={error.message} onRetry={controller.refresh} />
      </AppLayout>
    );
  }

  if (!viewModel) {
    return (
      <AppLayout mainClassName="px-4 py-6">
        <DashboardSkeleton />
      </AppLayout>
    );
  }

  const heroVariant = resolveHeroVariant({
    isEidDay: viewModel.isEidDay,
    isFriday: viewModel.isFriday,
    isRamadan: viewModel.isRamadan,
  });

  const heroMessage = resolveStreakMessage({
    currentStreak,
    completedToday: viewModel.completedToday,
    totalToday: viewModel.totalToday,
  });

  const heroCharacter = pickHeroCharacter(currentStreak);
  const goalCharacter = pickHeroCharacter(currentStreak + 2);

  const sectionSubtitle = viewModel.isEidDay
    ? "Bayram günü · Sabahtan sonra bayram namazı"
    : viewModel.isFriday
    ? "Cuma · Öğle yerine cuma namazı"
    : viewModel.isRamadan
    ? "Ramazan · Yatsıdan sonra teravih"
    : "Her vakit bir adım. Hepsini tamamla.";

  const xpBurst = celebration?.xpAwarded ?? null;
  const isMutationInFlight = action.isPending;

  return (
    <AppLayout
      rightPanel={
        <RightRail
          level={level}
          levelBadgeKey={levelBadgeKey}
          levelTotalXp={totalXp}
          currentLevelXp={currentLevelXp}
          xpToNextLevel={xpToNextLevel}
          totalXpForNextLevel={totalXpForNextLevel}
          levelProgressPercent={levelProgressPercent}
          completedToday={viewModel.completedToday}
          totalToday={viewModel.totalToday}
          progressPercent={viewModel.progressPercent}
          goalCharacter={goalCharacter}
          streakFreezeCount={streakFreezeCount}
          leaderboard={leaderboard}
        />
      }
      mainClassName="px-4 pb-10 pt-6 lg:pt-8"
    >
      <div className="flex flex-col gap-4 lg:gap-5">
        <header className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
          <div className="hidden lg:block">
            <h1 className="m-0 text-2xl font-black tracking-[-0.01em] text-white">
              Serilerim
            </h1>
            <div className="mt-1 text-xs font-bold tracking-wide text-white/55">
              {todayLabel}
            </div>
          </div>
          <div className="lg:ml-auto">
            <DashboardTopBar
              currentStreak={currentStreak}
              totalXp={totalXp}
              streakFreezeCount={streakFreezeCount}
              xpBurst={xpBurst}
            />
          </div>
        </header>

        <Hero
          variant={heroVariant}
          currentStreak={currentStreak}
          longestStreak={longestStreak}
          message={heroMessage}
          character={heroCharacter}
          size="lg"
        />

        <WeekStrip days={weekDays} onOpen={() => setMonthOpen(true)} />

        <div className="lg:hidden">
          <DailyGoalCard
            completedToday={viewModel.completedToday}
            totalToday={viewModel.totalToday}
            progressPercent={viewModel.progressPercent}
            character={goalCharacter}
          />
        </div>

        <SectionHead
          title="Bugünün Vakitleri"
          subtitle={sectionSubtitle}
          pill={`${viewModel.completedToday}/${viewModel.totalToday} TAMAM`}
        />

        <PrayerList
          prayers={viewModel.prayers}
          onMarkPrayer={handleMarkPrayer}
          isSubmitting={isMutationInFlight}
          variant="chain"
        />

        <div className="lg:hidden">
          <FreezeCard streakFreezeCount={streakFreezeCount} />
        </div>

        <DashboardFooterMascot character={heroCharacter} />
      </div>

      <PrayerQuizModal
        key={quizPrayer?.type ?? "none"}
        isOpen={!!quizPrayer}
        prayerType={quizPrayer?.type ?? null}
        quizQueryParams={quizQueryParams}
        onClose={handleQuizClose}
        onSubmit={handleQuizSubmit}
      />

      <MonthHeatmapSheet
        isOpen={monthOpen}
        onClose={() => setMonthOpen(false)}
        currentStreak={currentStreak}
        longestStreak={longestStreak}
        lastActiveDate={lastActiveDate}
        protectedDates={[]}
        completedToday={viewModel.completedToday}
        totalToday={viewModel.totalToday}
      />
    </AppLayout>
  );
};

interface RightRailProps {
  level: number;
  levelBadgeKey: string;
  levelTotalXp: number;
  currentLevelXp: number;
  xpToNextLevel: number;
  totalXpForNextLevel: number;
  levelProgressPercent: number;
  completedToday: number;
  totalToday: number;
  progressPercent: number;
  goalCharacter: Parameters<typeof DailyGoalCard>[0]["character"];
  streakFreezeCount: number;
  leaderboard: Parameters<typeof LeaderboardCard>[0]["rows"];
}

const RightRail: React.FC<RightRailProps> = ({
  level,
  levelBadgeKey,
  levelTotalXp,
  currentLevelXp,
  xpToNextLevel,
  totalXpForNextLevel,
  levelProgressPercent,
  completedToday,
  totalToday,
  progressPercent,
  goalCharacter,
  streakFreezeCount,
  leaderboard,
}) => (
  <div className="flex h-full flex-col gap-4 overflow-y-auto pr-1 lg:pr-0">
    <LevelStatCard
      level={level}
      badgeKey={levelBadgeKey}
      progressPercent={levelProgressPercent}
      totalXp={levelTotalXp}
      currentLevelXp={currentLevelXp}
      xpToNextLevel={xpToNextLevel}
      totalXpForNextLevel={totalXpForNextLevel}
    />
    <DailyGoalCard
      completedToday={completedToday}
      totalToday={totalToday}
      progressPercent={progressPercent}
      character={goalCharacter}
    />
    <FreezeCard streakFreezeCount={streakFreezeCount} />
    <LeaderboardCard rows={leaderboard} />
  </div>
);

const RightRailSkeleton: React.FC = () => (
  <div className="flex h-full flex-col gap-4">
    <div className="h-[96px] w-full animate-[shimmer_2s_ease-in-out_infinite] rounded-3xl bg-white/[0.06]" />
    <div className="h-[140px] w-full animate-[shimmer_2s_ease-in-out_infinite] rounded-3xl bg-white/[0.06]" />
    <div className="h-[180px] w-full animate-[shimmer_2s_ease-in-out_infinite] rounded-3xl bg-white/[0.06]" />
    <div className="h-[220px] w-full animate-[shimmer_2s_ease-in-out_infinite] rounded-3xl bg-white/[0.06]" />
  </div>
);

interface DashboardFooterMascotProps {
  character: Parameters<typeof CharacterIllustration>[0]["character"];
}

const DashboardFooterMascot: React.FC<DashboardFooterMascotProps> = ({
  character,
}) => (
  <div
    aria-hidden="true"
    className="pointer-events-none mx-auto mt-2 h-[80px] w-[120px] opacity-50 lg:hidden"
  >
    <CharacterIllustration character={character} animated shadow="soft" />
  </div>
);
