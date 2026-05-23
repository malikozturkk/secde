"use client";

import React from "react";
import { CalendarIcon } from "../icons/ControlIcons";
import { InfoState } from "./InfoState";

interface EmptyStateProps {
  onChangeDate: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onChangeDate }) => (
  <InfoState
    icon={<CalendarIcon width={32} height={32} />}
    title="Bu tarih için vakit bulunmuyor"
    body="Seçili gün için kayıt bulamadık. Başka bir gün ya da konum dene."
    primaryAction={{ label: "Bugüne dön", onClick: onChangeDate }}
  />
);
