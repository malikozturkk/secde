export enum WeekDayState {
  Done = "done",
  Partial = "partial",
  Frozen = "frozen",
  Miss = "miss",
  TodayPending = "today-pending",
  TodayDone = "today-done",
  Future = "future",
}

export interface WeekDay {
  date: string;
  label: string;
  dayOfMonth: number;
  state: WeekDayState;
  isToday: boolean;
  completedCount: number;
  totalCount: number;
}

export enum MonthCellKind {
  Empty = "empty",
  Past = "past",
  Today = "today",
  Frozen = "frozen",
  Future = "future",
}

export interface MonthCell {
  kind: MonthCellKind;
  day: number | null;
  level: number;
  perfect: boolean;
  date: string;
}

export interface MonthCalendar {
  year: number;
  month: number;
  cells: MonthCell[];
  perfectDays: number;
  successPercent: number;
  totalCompletedPrayers: number;
}

export interface LeaderboardRow {
  rank: number;
  name: string;
  city: string;
  xp: number;
  avatarColor: string;
  avatarInitial: string;
  isCurrentUser?: boolean;
}
