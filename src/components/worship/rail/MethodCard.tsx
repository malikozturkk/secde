"use client";

import React, { memo } from "react";
import {
  CALCULATION_METHOD_LABEL,
  MADHAB_LABEL,
} from "@/src/constants/worship";
import type { WorshipMeta } from "@/src/types/worship.types";

interface MethodCardProps {
  meta: WorshipMeta;
  onOpenSettings?: () => void;
}

const MethodCardComponent: React.FC<MethodCardProps> = ({
  meta,
  onOpenSettings,
}) => {
  const methodLabel =
    CALCULATION_METHOD_LABEL[meta.calculationMethod] ??
    String(meta.calculationMethod);
  const madhabLabel =
    MADHAB_LABEL[meta.madhab] ?? String(meta.madhab);

  return (
    <div className="wsh-rail-card">
      <div className="wsh-rail-head">
        <h3 className="wsh-rail-title">{TEXTS.methodTitle}</h3>
      </div>
      <div className="wsh-method-row">
        <span className="wsh-method-key">{TEXTS.methodKeyLabel}</span>
        <span className="wsh-method-val">
          <span className="wsh-method-pill">{methodLabel}</span>
        </span>
      </div>
      <div className="wsh-method-row">
        <span className="wsh-method-key">{TEXTS.madhabKeyLabel}</span>
        <span className="wsh-method-val">{madhabLabel}</span>
      </div>
      <button
        type="button"
        className="mt-2 cursor-pointer rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.1em] text-white transition-colors duration-100 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-[var(--color-primary-light)] focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        onClick={onOpenSettings}
        disabled={!onOpenSettings}
      >
        Ayarları Değiştir
      </button>
    </div>
  );
};

export const MethodCard = memo(MethodCardComponent);
