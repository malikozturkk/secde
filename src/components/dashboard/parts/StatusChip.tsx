"use client";

import React, { memo } from "react";
import { Pill, type PillTone } from "@/src/components/ui/Pill";
import {
  PrayerCardState,
  PrayerCategory,
  PrayerCompletionStatus,
} from "@/src/types/enums/streak.enums";

interface StatusChipProps {
  state: PrayerCardState;
  category: PrayerCategory;
  completionStatus?: PrayerCompletionStatus | null;
}

interface ChipDescriptor {
  tone: PillTone;
  label: string;
}

const STATE_DESCRIPTOR: Record<PrayerCardState, ChipDescriptor> = {
  [PrayerCardState.Completed]: { tone: "primary", label: "Tamamlandı" },
  [PrayerCardState.Current]: { tone: "streak", label: "Şimdi" },
  [PrayerCardState.Eligible]: { tone: "secondary", label: "İşaretlenebilir" },
  [PrayerCardState.Late]: { tone: "secondary", label: "Kaza vakti" },
  [PrayerCardState.Missed]: { tone: "danger", label: "Kaçırıldı" },
  [PrayerCardState.Locked]: { tone: "neutral", label: "Sırada" },
  [PrayerCardState.MarkingLocked]: { tone: "danger", label: "Kilitli" },
};

const COMPLETION_DESCRIPTOR: Record<PrayerCompletionStatus, ChipDescriptor> = {
  [PrayerCompletionStatus.OnTime]: { tone: "primary", label: "Vaktinde" },
  [PrayerCompletionStatus.Late]: { tone: "secondary", label: "Geç (Kaza)" },
};

const CATEGORY_DESCRIPTOR: Partial<Record<PrayerCategory, ChipDescriptor>> = {
  [PrayerCategory.Weekly]: { tone: "success", label: "Cuma" },
  [PrayerCategory.Ramadan]: { tone: "violet", label: "Teravih" },
  [PrayerCategory.Eid]: { tone: "secondary", label: "Bayram" },
};

const StatusChipComponent: React.FC<StatusChipProps> = ({
  state,
  category,
  completionStatus = null,
}) => {
  const stateDescriptor =
    state === PrayerCardState.Completed && completionStatus
      ? COMPLETION_DESCRIPTOR[completionStatus]
      : STATE_DESCRIPTOR[state];
  const categoryDescriptor = CATEGORY_DESCRIPTOR[category];
  return (
    <>
      <Pill tone={stateDescriptor.tone} size="sm">
        {stateDescriptor.label}
      </Pill>
      {categoryDescriptor && (
        <Pill tone={categoryDescriptor.tone} size="sm">
          {categoryDescriptor.label}
        </Pill>
      )}
    </>
  );
};

export const StatusChip = memo(StatusChipComponent);
