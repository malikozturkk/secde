"use client";

import React from "react";
import { Info } from "@/src/icons/tsx/worship";
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
    icon={<Info width={32} height={32} />}
    title="Vakitler şu an yüklenemiyor"
    body="Bağlantını kontrol et ve tekrar dene. Sorun devam ederse biraz sonra tekrar baktığında çözülmüş olabilir."
    primaryAction={{ label: "Tekrar dene", onClick: onRetry }}
    secondaryAction={
      onSecondary
        ? { label: "Yardım merkezi", onClick: onSecondary }
        : undefined
    }
  />
);
