"use client";

import React, { memo } from "react";
import { Pill, type PillTone } from "@/src/components/ui/Pill";
import {
  PrayerCardState,
  PrayerCategory,
} from "@/src/types/enums/streak.enums";

interface StatusChipProps {
  state: PrayerCardState;
  category: PrayerCategory;
}

interface ChipDescriptor {
  tone: PillTone;
  label: string;
}

const STATE_DESCRIPTOR: Record<PrayerCardState, ChipDescriptor> = {
  [PrayerCardState.Completed]: { tone: "primary", label: "Tamamlandı" },
  [PrayerCardState.Current]: { tone: "streak", label: "Şimdi" },
  [PrayerCardState.Eligible]: { tone: "secondary", label: "İşaretlenebilir" },
  [PrayerCardState.Missed]: { tone: "danger", label: "Kaçırıldı" },
  [PrayerCardState.Locked]: { tone: "neutral", label: "Sırada" },
  [PrayerCardState.MarkingLocked]: { tone: "danger", label: "Kilitli" },
};

const CATEGORY_DESCRIPTOR: Partial<Record<PrayerCategory, ChipDescriptor>> = {
  [PrayerCategory.Friday]: { tone: "success", label: "Cuma" },
  [PrayerCategory.Taraweeh]: { tone: "violet", label: "Teravih" },
  [PrayerCategory.Eid]: { tone: "secondary", label: "Bayram" },
};

const StatusChipComponent: React.FC<StatusChipProps> = ({
  state,
  category,
}) => {
  const fromCategory = CATEGORY_DESCRIPTOR[category];
  const descriptor = fromCategory ?? STATE_DESCRIPTOR[state];
  return (
    <Pill tone={descriptor.tone} size="sm">
      {descriptor.label}
    </Pill>
  );
};

export const StatusChip = memo(StatusChipComponent);
