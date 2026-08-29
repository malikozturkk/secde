import { createMetadata } from "@/src/lib/metadata";
import PrayerTimesHubContent from "./PrayerTimesHubContent";

export const metadata = createMetadata({
  title: "Namaz Vakitleri — 81 İl",
  description:
    "Türkiye'nin 81 ili için bugünün imsak, güneş, öğle, ikindi, akşam ve yatsı vakitleri. İlini seç, haftalık namaz vakti takvimini ve kıble yönünü gör.",
  path: "/prayer-times",
});

export const revalidate = 3600;

export default function PrayerTimesHubPage() {
  return <PrayerTimesHubContent />;
}
