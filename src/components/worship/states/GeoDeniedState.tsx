"use client";

import React from "react";
import { TEXTS } from "@/src/constants/worship";
import { PinIcon } from "../icons/ControlIcons";
import { InfoState } from "./InfoState";

interface GeoDeniedStateProps {
  onRetry: () => void;
  onManualSelect: () => void;
}

export const GeoDeniedState: React.FC<GeoDeniedStateProps> = ({
  onRetry,
  onManualSelect,
}) => (
  <InfoState
    icon={<PinIcon width={32} height={32} />}
    title={TEXTS.geoDeniedTitle}
    body={TEXTS.geoDeniedBody}
    primaryAction={{ label: TEXTS.geoDeniedAction, onClick: onRetry }}
    secondaryAction={{
      label: TEXTS.geoDeniedSecondary,
      onClick: onManualSelect,
    }}
  />
);
