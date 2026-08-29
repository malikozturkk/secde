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
    <div className="flex flex-col gap-3 rounded-[22px] border-[length:var(--ng-stroke)] border-[var(--ng-edge)] bg-[var(--ng-surface)] p-[18px]">
      <div className="flex items-center justify-between">
        <h3 className="m-0 text-base font-black text-[var(--ng-text)]">
          Hesaplama
        </h3>
      </div>
      <div className="flex items-center justify-between px-1 py-2 text-[13px]">
        <span className="font-extrabold text-[var(--ng-text-3)]">
          Yöntem
        </span>
        <span className="font-black text-[var(--ng-text)]">
          <span className="inline-block rounded-full border border-[rgba(44,200,255,0.28)] bg-[rgba(44,200,255,0.12)] px-2.5 py-[3px] text-[10px] font-black uppercase tracking-[0.1em] text-[var(--ng-sky)]">
            {methodLabel}
          </span>
        </span>
      </div>
      <div className="flex items-center justify-between border-t border-dashed border-[var(--ng-edge)] px-1 py-2 text-[13px]">
        <span className="font-extrabold text-[var(--ng-text-3)]">
          Mezhep
        </span>
        <span className="font-black text-[var(--ng-text)]">
          {madhabLabel}
        </span>
      </div>
    </div>
  );
};

export const MethodCard = memo(MethodCardComponent);
