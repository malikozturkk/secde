import type {
  GamificationActionType,
  PrayerCardState,
  PrayerCategory,
  PrayerType,
} from "./enums/streak.enums";

export interface DailyPrayersQuery {
  lat: number;
  lng: number;
  date: string;
  tz: string;
  method?: string;
  madhab?: string;
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
  lat: number;
  lng: number;
  tz: string;
  method?: string;
  madhab?: string;
}

interface QuestionOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: QuestionOption[];
}

export interface PrayerQuestionsResponse {
  quizId: string;
  expiresAt: string;
  questions: QuizQuestion[];
}

export interface QuizAnswer {
  questionId: string;
  optionId: string;
}

export interface GamificationActionRequest {
  actionType: GamificationActionType;
  lat: number;
  lng: number;
  tz: string;
  method?: string;
  madhab?: string;
  quizId?: string;
  prayerType?: PrayerType;
  answers?: QuizAnswer[];
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
  prayerCompletion?: PrayerCompletionResult;
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
