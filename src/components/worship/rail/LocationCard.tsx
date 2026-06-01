"use client";

import React, { memo } from "react";
import { COORDINATE_PRECISION } from "@/src/constants/worship";
import { formatCoordinate } from "@/src/lib/worship-utils";
import type { WorshipMeta } from "@/src/types/worship.types";
import { Globe } from "@/src/icons/tsx/worship";

interface LocationCardProps {
  meta: WorshipMeta;
  locationName: string;
}

const LocationCardComponent: React.FC<LocationCardProps> = ({
  meta,
  locationName,
}) => {
  return (
    <div className="flex flex-col gap-3 rounded-[22px] border border-white/[0.06] bg-[#1c2e35] p-[18px]">
      <div className="flex items-center justify-between">
        <h3 className="m-0 text-base font-black text-[var(--color-text)]">
          Konum
        </h3>
        <span className="text-[10px] font-black uppercase tracking-[0.12em] text-white/35">
          {locationName}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-0.5 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2.5">
          <span className="text-[10px] font-black uppercase tracking-[0.1em] text-white/35">
            Enlem
          </span>
          <span className="font-display text-sm tabular-nums text-[var(--color-text)]">
            {formatCoordinate(meta.latitude, COORDINATE_PRECISION)}
          </span>
        </div>
        <div className="flex flex-col gap-0.5 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2.5">
          <span className="text-[10px] font-black uppercase tracking-[0.1em] text-white/35">
            Boylam
          </span>
          <span className="font-display text-sm tabular-nums text-[var(--color-text)]">
            {formatCoordinate(meta.longitude, COORDINATE_PRECISION)}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-xs font-extrabold text-[var(--color-text-muted)] [&_svg]:text-[var(--color-primary-light)]">
        <Globe width={14} height={14} />
        {meta.timezone}
      </div>
    </div>
  );
};

export const LocationCard = memo(LocationCardComponent);
