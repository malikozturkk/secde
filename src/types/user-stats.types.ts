import type { AvatarCustomization } from "./auth.types";

export interface PrayerBreakdown {
  fajr: number;
  dhuhr: number;
  asr: number;
  maghrib: number;
  isha: number;
  jumuah: number;
  tarawih: number;
  eidFitr: number;
  eidAdha: number;
}

export interface PublicStats {
  username: string;
  avatarCustomization: AvatarCustomization;
  joinedAt: string;

  level: {
    level: number;
    badgeKey: string;
    progressPercent: number;
  };

  streak: {
    current: number;
    longest: number;
  };

  prayers: {
    totalCompleted: number;
    breakdown: PrayerBreakdown;
  };

  social: {
    followerCount: number;
    followingCount: number;
  };

  isSelf: boolean;
}

export interface SelfStats
  extends Omit<PublicStats, "level" | "streak" | "prayers" | "isSelf"> {
  level: PublicStats["level"] & {
    xp: number;
    totalXp: number;
    currentLevelXp: number;
    xpToNextLevel: number;
    totalXpForNextLevel: number;
  };

  streak: PublicStats["streak"] & {
    freezeCount: number;
    lastActiveDate: string | null;
  };

  prayers: PublicStats["prayers"] & {
    lastCompletedAt: string | null;

    quiz: {
      totalAttempts: number;
      passed: number;
      failed: number;
      accuracyPercent: number;
    };
  };
}

export type PrayerBreakdownKey = keyof PrayerBreakdown;
