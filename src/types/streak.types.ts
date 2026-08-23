import type {
  GamificationActionType,
  PrayerAnswerResult,
  PrayerCardState,
  PrayerCategory,
  PrayerCompletionStatus,
  PrayerQuestionStatus,
  PrayerQuizStatus,
  PrayerType,
} from "./enums/streak.enums";

export interface DailyPrayersQuery {
  date: string;
}

export interface PrayerCardDto {
  type: PrayerType;
  category: PrayerCategory;
  isObligatory: boolean;
  scheduledAt: string;
  windowStartsAt: string;
  windowEndsAt: string;
  markWindowEndsAt: string;
  xpReward: number;
  lateXpReward: number;
  isCompleted: boolean;
  canMarkAsCompleted: boolean;
  isLateWindow: boolean;
  completionStatus: PrayerCompletionStatus | null;
  completedAt: string | null;
  streakContribution: boolean;
  pendingQuizId: string | null;
  isLocked: boolean;
  xpAwarded: number | null;
}

export interface DailyPrayersResponse {
  date: string;
  timezone: string;
  firstOfDayBonusXp: number;
  firstOfDayBonusAvailable: boolean;
  isFriday: boolean;
  isRamadan: boolean;
  isEidDay: boolean;
  prayers: PrayerCardDto[];
}

export interface PrayerHistoryQuery {
  from: string;
  to: string;
}

export interface PrayerHistoryDay {
  date: string;
  completedCount: number;
  totalCount: number;
  isComplete: boolean;
  isFrozen: boolean;
}

export interface PrayerHistoryResponse {
  from: string;
  to: string;
  timezone: string;
  days: PrayerHistoryDay[];
}

export interface PrayerQuestionsQuery {
  prayerType: PrayerType;
}

interface QuestionOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: QuestionOption[];
  orderIndex: number;
  timeLimitSeconds: number;
  status: PrayerQuestionStatus;
  shownAt: string | null;
  deadlineAt: string | null;
  answeredAt: string | null;
  selectedOptionId: string | null;
  isCorrect: boolean | null;
  isAnswerable: boolean;
  canBeAnsweredAgain: boolean;
  isExpired: boolean;
}

export interface PrayerQuestionsResponse {
  quizId: string;
  expiresAt: string;
  quizStatus: PrayerQuizStatus;
  isLocked: boolean;
  questions: QuizQuestion[];
}

export interface StartPrayerQuestionResponse {
  quizId: string;
  quizStatus: PrayerQuizStatus;
  question: QuizQuestion;
}

export interface AnswerPrayerQuestionRequest {
  optionId: string;
}

export interface AnswerPrayerQuestionResponse {
  quizId: string;
  quizStatus: PrayerQuizStatus;
  result: PrayerAnswerResult;
  isLocked: boolean;
  question: QuizQuestion;
  prayerCompletion?: PrayerCompletionResult;
}

export interface GamificationActionRequest {
  actionType: GamificationActionType;
  clientRequestId?: string;
}

export interface PrayerCompletionResult {
  prayerCompletionId: string;
  prayerType: PrayerType;
  prayerDate: string;
  completedAt: string;
  status: PrayerCompletionStatus;
  xpAwarded: number;
  xpBeforePenalty: number;
  xpAfter: number;
  level: number;
  leveledUp: boolean;
  streakAdvanced: boolean;
  streakReset: boolean;
  currentStreak: number;
  longestStreak: number;
  isFirstOfDay: boolean;
}

export interface StreakRiskAssessment {
  currentStreak: number;
  longestStreak: number;
  freezesAvailable: number;
  lastActiveDate: string | null;
  daysSinceLastActive: number | null;
  isBroken: boolean;
  recoverableStreak: number;
  atRisk: boolean;
  canFreezeNow: boolean;
  freezeWindowExpired: boolean;
  lastFreezeUsedAt: string | null;
}

export interface StreakFreezeUsageResult {
  currentStreak: number;
  longestStreak: number;
  freezesRemaining: number;
  protectedDates: string[];
  alreadyApplied: boolean;
}

export interface GamificationActionResponse {
  actionType: GamificationActionType;
  streakFreezeUsage?: StreakFreezeUsageResult;
}

export interface PrayerCardViewModel {
  type: PrayerType;
  category: PrayerCategory;
  isObligatory: boolean;
  scheduledAt: string;
  scheduledTimeLabel: string;
  windowStartsAt: string;
  windowEndsAt: string;
  markWindowEndsAt: string;
  xpReward: number;
  lateXpReward: number;
  effectiveXpReward: number;
  isCompleted: boolean;
  canMarkAsCompleted: boolean;
  isLateWindow: boolean;
  completionStatus: PrayerCompletionStatus | null;
  completedAt: string | null;
  completedAtLabel: string | null;
  streakContribution: boolean;
  pendingQuizId: string | null;
  isLocked: boolean;
  totalXpOnCompletion: number;
  hasFirstOfDayBonus: boolean;
  xpAwarded: number | null;
  state: PrayerCardState;
  secondsUntilOpens: number;
  secondsUntilCloses: number;
  secondsUntilMarkCloses: number;
  windowProgressPercent: number;
}

export interface DailyPrayersViewModel {
  date: string;
  timezone: string;
  isFriday: boolean;
  isRamadan: boolean;
  isEidDay: boolean;
  prayers: PrayerCardViewModel[];
  totalToday: number;
  completedToday: number;
  remainingToday: number;
  progressPercent: number;
  allCompleted: boolean;
  activePrayer: PrayerCardViewModel | null;
}
