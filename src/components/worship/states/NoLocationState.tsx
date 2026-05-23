"use client";

import React from "react";
import { TEXTS } from "@/src/constants/worship";
import { LocationDeniedIcon } from "../icons/ControlIcons";
import { InfoState } from "./InfoState";

interface NoLocationStateProps {
  onManualSelect: () => void;
  onUseDefault: () => void;
}

export const NoLocationState: React.FC<NoLocationStateProps> = ({
  onManualSelect,
  onUseDefault,
}) => (
  <InfoState
    icon={<LocationDeniedIcon width={32} height={32} />}
    title={TEXTS.noLocationTitle}
    body={TEXTS.noLocationBody}
    primaryAction={{ label: TEXTS.noLocationAction, onClick: onManualSelect }}
    secondaryAction={{
      label: TEXTS.noLocationSecondary,
      onClick: onUseDefault,
    }}
  />
);
