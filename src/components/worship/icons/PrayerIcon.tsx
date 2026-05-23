"use client";

import React from "react";
import type { SVGProps } from "react";
import { PrayerKey } from "@/src/types/enums/worship.enums";

interface PrayerIconProps extends SVGProps<SVGSVGElement> {
  prayer: PrayerKey;
}

const FajrIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 32 32"
    aria-hidden="true"
    {...props}
  >
    <path
      fill="currentColor"
      d="M16 4c4 4.8 8 9.2 8 14a8 8 0 0 1-16 0c0-4.8 4-9.2 8-14Z"
      opacity={0.95}
    />
    <path
      fill="#fff"
      opacity={0.35}
      d="M16 9c2 2.4 4.5 5.4 4.5 8.5a4.5 4.5 0 1 1-9 0c0-3.1 2.5-6.1 4.5-8.5Z"
    />
    <circle cx={13} cy={20} r={1.2} fill="#fff" opacity={0.6} />
  </svg>
);

const SunriseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 32 32"
    aria-hidden="true"
    {...props}
  >
    <circle cx={16} cy={18} r={6} fill="currentColor" />
    <circle cx={16} cy={18} r={6} fill="#fff" opacity={0.18} />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={2.4}
      d="M5 27h22M8 23l-2 2M24 23l2 2M16 9V5M8 12 6 10M24 12l2-2"
    />
  </svg>
);

const DhuhrIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 32 32"
    aria-hidden="true"
    {...props}
  >
    <circle cx={16} cy={16} r={6.5} fill="currentColor" />
    <circle cx={16} cy={16} r={6.5} fill="#fff" opacity={0.18} />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={2.6}
      d="M16 4v3M16 25v3M4 16h3M25 16h3M7.5 7.5l2 2M22.5 7.5l-2 2M7.5 24.5l2-2M22.5 24.5l-2-2"
    />
  </svg>
);

const AsrIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 32 32"
    aria-hidden="true"
    {...props}
  >
    <circle cx={16} cy={17} r={6} fill="currentColor" />
    <circle cx={16} cy={17} r={6} fill="#fff" opacity={0.16} />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={2.4}
      d="M16 6v3M16 26v2M6 17h3M23 17h3M9 10l2 2M23 10l-2 2M9 24l2-2M23 24l-2-2"
    />
  </svg>
);

const MaghribIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 32 32"
    aria-hidden="true"
    {...props}
  >
    <path
      fill="currentColor"
      d="M5 22a11 11 0 0 1 22 0Z"
    />
    <path fill="#fff" opacity={0.18} d="M9 22a7 7 0 0 1 14 0Z" />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={2.4}
      d="M3 26h26M16 6v3M8 10l2 2M24 10l-2 2"
    />
  </svg>
);

const IshaIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 32 32"
    aria-hidden="true"
    {...props}
  >
    <path
      fill="currentColor"
      d="M22 6a10 10 0 1 0 4 12c-3 1.4-7.4-.4-8.8-3.6C15.7 11 17.6 7 22 6Z"
    />
    <circle cx={22.5} cy={9} r={0.9} fill="#fff" opacity={0.9} />
    <circle cx={25} cy={13} r={0.6} fill="#fff" opacity={0.7} />
  </svg>
);

const ICON_MAP: Record<PrayerKey, React.FC<SVGProps<SVGSVGElement>>> = {
  [PrayerKey.Fajr]: FajrIcon,
  [PrayerKey.Sunrise]: SunriseIcon,
  [PrayerKey.Dhuhr]: DhuhrIcon,
  [PrayerKey.Asr]: AsrIcon,
  [PrayerKey.Maghrib]: MaghribIcon,
  [PrayerKey.Isha]: IshaIcon,
};

export const PrayerIcon: React.FC<PrayerIconProps> = ({ prayer, ...rest }) => {
  const Icon = ICON_MAP[prayer];
  return <Icon {...rest} />;
};
