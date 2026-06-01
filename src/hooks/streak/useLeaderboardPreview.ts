"use client";

import { useMemo } from "react";
import { useAuthStore } from "@/src/store/auth.store";
import type { LeaderboardRow } from "@/src/types/dashboard.types";

const PREVIEW_ROWS: readonly Omit<LeaderboardRow, "isCurrentUser">[] = [
  {
    rank: 1,
    name: "Mehmet K.",
    city: "İstanbul",
    xp: 18420,
    avatarColor: "#F59E0B",
    avatarInitial: "M",
  },
  {
    rank: 2,
    name: "Ayşe D.",
    city: "Ankara",
    xp: 17150,
    avatarColor: "#4F46E5",
    avatarInitial: "A",
  },
  {
    rank: 3,
    name: "Yusuf B.",
    city: "İzmir",
    xp: 14990,
    avatarColor: "#059669",
    avatarInitial: "Y",
  },
  {
    rank: 4,
    name: "Sen",
    city: "İstanbul",
    xp: 12480,
    avatarColor: "#FF6B35",
    avatarInitial: "S",
  },
  {
    rank: 5,
    name: "Zeynep A.",
    city: "Bursa",
    xp: 11820,
    avatarColor: "#9333EA",
    avatarInitial: "Z",
  },
];

export const useLeaderboardPreview = (): readonly LeaderboardRow[] => {
  const username = useAuthStore((state) => state.user?.username);
  return useMemo<LeaderboardRow[]>(
    () =>
      PREVIEW_ROWS.map((row) => ({
        ...row,
        isCurrentUser:
          username !== undefined &&
          username !== null &&
          row.name.toLowerCase() === username.toLowerCase(),
      })),
    [username]
  );
};
