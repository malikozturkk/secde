import type { ComponentType, SVGProps } from "react";
import { PrayerKey } from "@/src/types/enums/worship.enums";
import {
  Asr,
  Dhuhr,
  Fajr,
  Isha,
  Maghrib,
  Sunrise,
} from "@/src/icons/tsx/worship/prayer";

interface PrayerIconProps extends SVGProps<SVGSVGElement> {
  prayer: PrayerKey;
}

const ICON_MAP: Record<PrayerKey, ComponentType<SVGProps<SVGSVGElement>>> = {
  [PrayerKey.Fajr]: Fajr,
  [PrayerKey.Sunrise]: Sunrise,
  [PrayerKey.Dhuhr]: Dhuhr,
  [PrayerKey.Asr]: Asr,
  [PrayerKey.Maghrib]: Maghrib,
  [PrayerKey.Isha]: Isha,
};

export const PrayerIcon = ({ prayer, ...rest }: PrayerIconProps) => {
  const Icon = ICON_MAP[prayer];
  return <Icon {...rest} />;
};
