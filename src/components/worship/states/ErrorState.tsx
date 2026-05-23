"use client";

import React from "react";
import { TEXTS } from "@/src/constants/worship";
import { InfoIcon } from "../icons/ControlIcons";
import { InfoState } from "./InfoState";

interface ErrorStateProps {
  onRetry: () => void;
  onSecondary?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  onRetry,
  onSecondary,
}) => (
  <InfoState
    tone="error"
    icon={<InfoIcon width={32} height={32} />}
    title={TEXTS.errorTitle}
    body={TEXTS.errorBody}
    primaryAction={{ label: TEXTS.errorRetry, onClick: onRetry }}
    secondaryAction={
      onSecondary
        ? { label: TEXTS.errorSecondary, onClick: onSecondary }
        : undefined
    }
  />
);
