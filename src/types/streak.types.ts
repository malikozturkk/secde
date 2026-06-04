import type {
  GamificationActionType,
  PrayerAnswerResult,
  PrayerCardState,
  PrayerCategory,
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
  xpReward: number;
  isCompleted: boolean;
  canMarkAsCompleted: boolean;
  completedAt: string | null;
  streakContribution: boolean;
  pendingQuizId: string | null;
  isLocked: boolean;
}

export interface DailyPrayersResponse {
  date: string;
  timezone: string;
  isFriday: boolean;
  isRamadan: boolean;
  isEidDay: boolean;
  prayers: PrayerCardDto[];
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
  xpAwarded: number;
  xpAfter: number;
  level: number;
  leveledUp: boolean;
  streakAdvanced: boolean;
  currentStreak: number;
  longestStreak: number;
  isFirstOfDay: boolean;
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
  xpReward: number;
  isCompleted: boolean;
  canMarkAsCompleted: boolean;
  completedAt: string | null;
  completedAtLabel: string | null;
  streakContribution: boolean;
  pendingQuizId: string | null;
  isLocked: boolean;
  state: PrayerCardState;
  secondsUntilOpens: number;
  secondsUntilCloses: number;
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
