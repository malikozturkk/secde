"use client";

import React from "react";
import { TEXTS } from "@/src/constants/worship";
import { CalendarIcon } from "../icons/ControlIcons";
import { InfoState } from "./InfoState";

interface EmptyStateProps {
  onChangeDate: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onChangeDate }) => (
  <InfoState
    icon={<CalendarIcon width={32} height={32} />}
    title={TEXTS.emptyTitle}
    body={TEXTS.emptyBody}
    primaryAction={{ label: TEXTS.emptyAction, onClick: onChangeDate }}
  />
);
