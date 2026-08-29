import type { ApiResponse } from "@/src/types/api.types";
import type { PublicPrayerTimes } from "@/src/types/prayer-times.types";

export const PRAYER_TIMES_REVALIDATE_SECONDS = 3600;
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export interface FetchPublicPrayerTimesParams {
  city: string;
  days?: number;
}

export async function fetchPublicPrayerTimes({
  city,
  days = 7,
}: FetchPublicPrayerTimesParams): Promise<PublicPrayerTimes | null> {
  if (!API_URL) return null;

  const url = new URL(`${API_URL}/worship/public/prayer-times`);
  url.searchParams.set("city", city);
  url.searchParams.set("days", String(days));

  try {
    const response = await fetch(url, {
      next: { revalidate: PRAYER_TIMES_REVALIDATE_SECONDS },
      headers: { Accept: "application/json" },
    });

    if (!response.ok) return null;

    const payload = (await response.json()) as ApiResponse<PublicPrayerTimes>;
    return payload.data ?? null;
  } catch {
    return null;
  }
}
