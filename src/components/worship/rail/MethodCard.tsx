"use client";

import React, { memo } from "react";
import { MADHAB_LABEL } from "@/src/constants/worship";
import type { WorshipMeta } from "@/src/types/worship.types";

interface MethodCardProps {
  meta: WorshipMeta;
}

const MethodCardComponent: React.FC<MethodCardProps> = ({ meta }) => {
  const methodLabel = String(meta.calculationMethod);
  const madhabLabel = MADHAB_LABEL[meta.madhab] ?? String(meta.madhab);

  return (
    <div className="flex flex-col gap-3 rounded-[22px] border border-white/[0.06] bg-[#1c2e35] p-[18px]">
      <div className="flex items-center justify-between">
        <h3 className="m-0 text-base font-black text-[var(--color-text)]">
          Hesaplama
        </h3>
      </div>
      <div className="flex items-center justify-between px-1 py-2 text-[13px]">
        <span className="font-extrabold text-[var(--color-text-muted)]">
          Yöntem
        </span>
        <span className="font-black text-[var(--color-text)]">
          <span className="inline-block rounded-full border border-[rgba(79,195,247,0.28)] bg-[rgba(79,195,247,0.12)] px-2.5 py-[3px] text-[10px] font-black uppercase tracking-[0.1em] text-[var(--color-accent)]">
            {methodLabel}
          </span>
        </span>
      </div>
      <div className="flex items-center justify-between border-t border-dashed border-white/[0.08] px-1 py-2 text-[13px]">
        <span className="font-extrabold text-[var(--color-text-muted)]">
          Mezhep
        </span>
        <span className="font-black text-[var(--color-text)]">
          {madhabLabel}
        </span>
      </div>
    </div>
  );
};

export const MethodCard = memo(MethodCardComponent);
