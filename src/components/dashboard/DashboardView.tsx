"use client";

import React, { useCallback, useMemo, useState } from "react";
import AppLayout from "@/src/components/layout/AppLayout";
import {
  pickHeroCharacter,
  resolveHeroVariant,
  resolveStreakMessage,
} from "@/src/lib/streak-utils";
import { useLeaderboard } from "@/src/hooks/streak/useLeaderboard";
import { LEADERBOARD_PREVIEW_LIMIT } from "@/src/constants/leaderboard";
import { useStreakController } from "@/src/hooks/streak/useStreakController";
import { getApiErrorMessage, getDomainErrorCode } from "@/src/lib/api-error";
import { LocationNotSetDialog } from "@/src/components/common/LocationNotSetDialog";
import { useWeekStrip } from "@/src/hooks/streak/useWeekStrip";
import { usePrayerHistory } from "@/src/hooks/streak/usePrayerHistory";
import { buildWeekRange } from "@/src/lib/dashboard-utils";
import {
  GamificationActionType,
  PrayerCardState,
} from "@/src/types/enums/streak.enums";
import type {
  PrayerCardViewModel,
  PrayerCompletionResult,
  PrayerHistoryDay,
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
import { FreezeConfirmDialog } from "@/src/components/dashboard/parts/FreezeConfirmDialog";
import { StreakBrokenDialog } from "@/src/components/dashboard/parts/StreakBrokenDialog";
import { useStreakRisk } from "@/src/hooks/streak/useStreakRisk";
import { useStreakBreakNotice } from "@/src/hooks/streak/useStreakBreakNotice";
import { formatFreezeUsageLabel } from "@/src/lib/dashboard-utils";
import { upperTr } from "@/src/lib/turkish";

const EMPTY_HISTORY: readonly PrayerHistoryDay[] = [];

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
  const leaderboardQuery = useLeaderboard({ limit: LEADERBOARD_PREVIEW_LIMIT });
  const locationNotSet =
    !!error && getDomainErrorCode(error) === "USER_LOCATION_NOT_SET";
  const [locationDialogDismissed, setLocationDialogDismissed] = useState(false);
  const [quizPrayer, setQuizPrayer] = useState<PrayerCardViewModel | null>(
    null
  );
  const [monthOpen, setMonthOpen] = useState<boolean>(false);
  const [freezeOpen, setFreezeOpen] = useState<boolean>(false);
  const [freezeError, setFreezeError] = useState<string | null>(null);
  const [breakError, setBreakError] = useState<string | null>(null);

  const streakRisk = useStreakRisk(!locationNotSet);
  const risk = streakRisk.data;
  const breakNotice = useStreakBreakNotice(risk);

  const handleOpenFreeze = useCallback(() => {
    setFreezeError(null);
    setFreezeOpen(true);
  }, []);

  const handleConfirmFreeze = useCallback(() => {
    setFreezeError(null);
    controller.action.mutate(
      { actionType: GamificationActionType.StreakFreeze },
      {
        onSuccess: () => {
          setFreezeOpen(false);
          controller.refresh();
        },
        onError: (err) =>
          setFreezeError(
            getApiErrorMessage(err) ?? "Seri dondurulamadı. Lütfen tekrar dene."
          ),
      }
    );
  }, [controller]);

  const handleRecoverStreak = useCallback(() => {
    setBreakError(null);
    controller.action.mutate(
      { actionType: GamificationActionType.StreakFreeze },
      {
        onSuccess: () => {
          breakNotice.dismiss();
          controller.refresh();
        },
        onError: (err) =>
          setBreakError(
            getApiErrorMessage(err) ?? "Seri kurtarılamadı. Lütfen tekrar dene."
          ),
      }
    );
  }, [breakNotice, controller]);

  const handleMarkPrayer = useCallback((prayer: PrayerCardViewModel) => {
    if (!prayer.canMarkAsCompleted) return;
    if (
      prayer.state !== PrayerCardState.Current &&
      prayer.state !== PrayerCardState.Eligible &&
      prayer.state !== PrayerCardState.Late
    ) {
      return;
    }
    setQuizPrayer(prayer);
  }, []);

  const handleQuizClose = useCallback(() => {
    setQuizPrayer(null);
  }, []);

  const handleQuizCompletion = useCallback(
    (completion: PrayerCompletionResult) => {
      controller.setCelebration(completion);
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
  const freezeUsageLabel = formatFreezeUsageLabel(
    risk?.lastFreezeUsedAt ?? null
  );
  const freezeWindowExpired = risk?.freezeWindowExpired ?? false;
  const canFreezeNow = risk?.canFreezeNow ?? false;
  const recoverableStreak = risk?.recoverableStreak ?? 0;
  const recoveredStreak =
    !risk?.isBroken && recoverableStreak > 0 ? recoverableStreak : 0;
  const freezeTargetStreak = risk?.isBroken
    ? risk.recoverableStreak
    : currentStreak;
  const totalXp = selfStats?.level.totalXp ?? 0;
  const level = selfStats?.level.level ?? 1;
  const levelBadgeKey = selfStats?.level.badgeKey ?? "";
  const currentLevelXp = selfStats?.level.currentLevelXp ?? 0;
  const xpToNextLevel = selfStats?.level.xpToNextLevel ?? 0;
  const totalXpForNextLevel = selfStats?.level.totalXpForNextLevel ?? 0;
  const levelProgressPercent = selfStats?.level.progressPercent ?? 0;

  const completedToday = viewModel?.completedToday ?? 0;
  const totalToday = viewModel?.totalToday ?? 0;

  const weekRange = useMemo(() => buildWeekRange(), []);
  const weekHistoryQuery = usePrayerHistory(weekRange);
  const weekHistory = weekHistoryQuery.data?.days ?? EMPTY_HISTORY;

  const weekDays = useWeekStrip({
    history: weekHistory,
    completedToday,
    totalToday,
  });

  const todayLabel = useMemo(
    () =>
      upperTr(new Date().toLocaleDateString("tr-TR", TODAY_LABEL_FORMAT)),
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
          onUseFreeze={handleOpenFreeze}
          isUsingFreeze={controller.action.isPending}
          freezeUsageLabel={freezeUsageLabel}
          freezeWindowExpired={freezeWindowExpired}
          canFreezeNow={canFreezeNow}
          recoverableStreak={recoverableStreak}
          leaderboard={leaderboardQuery.data ?? null}
          isLeaderboardLoading={leaderboardQuery.isPending}
          isLeaderboardError={leaderboardQuery.isError}
        />
      }
      mainClassName="px-4 pb-12 pt-6 lg:px-6 lg:pt-8"
    >
      <div className="flex flex-col gap-[18px] lg:gap-6">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-5">
          <div className="hidden lg:block">
            <h1 className="m-0 font-black text-[34px] leading-none tracking-[-0.035em] text-white">
              Serilerim
            </h1>
            <div className="mt-2 text-[13px] font-black uppercase tracking-[0.10em] text-[var(--ng-text-3)]">
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
          <FreezeCard
            streakFreezeCount={streakFreezeCount}
            onUseFreeze={handleOpenFreeze}
            isUsing={controller.action.isPending}
            lastUsedLabel={freezeUsageLabel}
            freezeWindowExpired={freezeWindowExpired}
            canFreezeNow={canFreezeNow}
            recoverableStreak={recoverableStreak}
          />
        </div>

        <DashboardFooterMascot character={heroCharacter} />
      </div>

      <PrayerQuizModal
        key={quizPrayer?.type ?? "none"}
        isOpen={!!quizPrayer}
        prayerType={quizPrayer?.type ?? null}
        quizQueryParams={quizQueryParams}
        onClose={handleQuizClose}
        onCompletion={handleQuizCompletion}
      />

      <StreakBrokenDialog
        isOpen={breakNotice.isOpen}
        onClose={() => {
          setBreakError(null);
          breakNotice.dismiss();
        }}
        onRecover={handleRecoverStreak}
        lostStreak={risk?.recoverableStreak ?? 0}
        daysSinceLastActive={risk?.daysSinceLastActive ?? 0}
        freezesAvailable={risk?.freezesAvailable ?? 0}
        canFreezeNow={risk?.canFreezeNow ?? false}
        freezeWindowExpired={risk?.freezeWindowExpired ?? false}
        isPending={controller.action.isPending}
        errorMessage={breakError}
      />

      <FreezeConfirmDialog
        isOpen={freezeOpen}
        onClose={() => setFreezeOpen(false)}
        onConfirm={handleConfirmFreeze}
        freezesRemaining={streakFreezeCount}
        currentStreak={freezeTargetStreak}
        recoveredStreak={recoveredStreak}
        isPending={controller.action.isPending}
        errorMessage={freezeError}
      />

      <MonthHeatmapSheet
        isOpen={monthOpen}
        onClose={() => setMonthOpen(false)}
        longestStreak={longestStreak}
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
  freezeUsageLabel: string | null;
  freezeWindowExpired: boolean;
  canFreezeNow: boolean;
  recoverableStreak: number;
  onUseFreeze: () => void;
  isUsingFreeze: boolean;
  leaderboard: Parameters<typeof LeaderboardCard>[0]["data"];
  isLeaderboardLoading: boolean;
  isLeaderboardError: boolean;
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
  onUseFreeze,
  isUsingFreeze,
  freezeUsageLabel,
  freezeWindowExpired,
  canFreezeNow,
  recoverableStreak,
  leaderboard,
  isLeaderboardLoading,
  isLeaderboardError,
}) => (
  <div className="flex h-full flex-col gap-[18px] overflow-y-auto pr-1 lg:pr-0">
    <LevelStatCard
      level={level}
      badgeKey={levelBadgeKey}
      progressPercent={levelProgressPercent}
      totalXp={levelTotalXp}
      currentLevelXp={currentLevelXp}
      xpToNextLevel={xpToNextLevel}
      totalXpForNextLevel={totalXpForNextLevel}
      className="min-h-fit"
    />
    <div className="hidden lg:block">
      <DailyGoalCard
        completedToday={completedToday}
        totalToday={totalToday}
        progressPercent={progressPercent}
        character={goalCharacter}
      />
    </div>
    <div className="hidden lg:block">
      <FreezeCard
        streakFreezeCount={streakFreezeCount}
        onUseFreeze={onUseFreeze}
        isUsing={isUsingFreeze}
        lastUsedLabel={freezeUsageLabel}
        freezeWindowExpired={freezeWindowExpired}
        canFreezeNow={canFreezeNow}
        recoverableStreak={recoverableStreak}
      />
    </div>
    <LeaderboardCard
      data={leaderboard}
      isLoading={isLeaderboardLoading}
      isError={isLeaderboardError}
    />
  </div>
);

const RightRailSkeleton: React.FC = () => (
  <div className="flex h-full flex-col gap-[18px]">
    <div className="h-[96px] w-full animate-[shimmer_2s_ease-in-out_infinite] rounded-[var(--ng-radius-lg)] bg-white/[0.07]" />
    <div className="h-[140px] w-full animate-[shimmer_2s_ease-in-out_infinite] rounded-[var(--ng-radius-lg)] bg-white/[0.07]" />
    <div className="h-[180px] w-full animate-[shimmer_2s_ease-in-out_infinite] rounded-[var(--ng-radius-lg)] bg-white/[0.07]" />
    <div className="h-[220px] w-full animate-[shimmer_2s_ease-in-out_infinite] rounded-[var(--ng-radius-lg)] bg-white/[0.07]" />
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
    className="pointer-events-none mx-auto mt-3 h-[92px] w-[136px] opacity-60 lg:hidden"
  >
    <CharacterIllustration character={character} animated shadow="soft" />
  </div>
);
