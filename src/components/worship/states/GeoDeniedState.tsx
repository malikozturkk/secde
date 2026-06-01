"use client";

import React from "react";
import { Pin } from "@/src/icons/tsx/worship";
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
    icon={<Pin width={32} height={32} />}
    title="Konum izni gerekli"
    body="Yaşadığın yerin namaz vakitlerini gösterebilmemiz için tarayıcı konum iznini açman gerekiyor."
    primaryAction={{ label: "Tekrar izin iste", onClick: onRetry }}
    secondaryAction={{
      label: "Konumu elle seç",
      onClick: onManualSelect,
    }}
  />
);
