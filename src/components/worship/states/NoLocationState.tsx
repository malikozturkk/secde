"use client";

import React from "react";
import { LocationDenied } from "@/src/icons/tsx/worship";
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
    icon={<LocationDenied width={32} height={32} />}
    title="Konum bilgisi alınamadı"
    body="Konum servislerine ulaşamıyoruz. İstanbul varsayılan olarak kullanılabilir ya da konumunu kendin seçebilirsin."
    primaryAction={{ label: "Konum seç", onClick: onManualSelect }}
    secondaryAction={{
      label: "Varsayılan kullan",
      onClick: onUseDefault,
    }}
  />
);
