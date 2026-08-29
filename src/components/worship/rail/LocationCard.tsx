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
    <div className="flex flex-col gap-3 rounded-[22px] border-[length:var(--ng-stroke)] border-[var(--ng-edge)] bg-[var(--ng-surface)] p-[18px]">
      <div className="flex items-center justify-between">
        <h3 className="m-0 text-base font-black text-[var(--ng-text)]">
          Konum
        </h3>
        <span className="text-[10px] font-black uppercase tracking-[0.12em] text-[var(--ng-text-3)]">
          {locationName}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-0.5 rounded-xl border-[length:var(--ng-stroke)] border-[var(--ng-edge)] bg-white/[0.03] px-3 py-2.5">
          <span className="text-[10px] font-black uppercase tracking-[0.1em] text-[var(--ng-text-3)]">
            Enlem
          </span>
          <span className="font-display text-sm tabular-nums text-[var(--ng-text)]">
            {formatCoordinate(meta.latitude, COORDINATE_PRECISION)}
          </span>
        </div>
        <div className="flex flex-col gap-0.5 rounded-xl border-[length:var(--ng-stroke)] border-[var(--ng-edge)] bg-white/[0.03] px-3 py-2.5">
          <span className="text-[10px] font-black uppercase tracking-[0.1em] text-[var(--ng-text-3)]">
            Boylam
          </span>
          <span className="font-display text-sm tabular-nums text-[var(--ng-text)]">
            {formatCoordinate(meta.longitude, COORDINATE_PRECISION)}
          </span>
        </div>
      </div>
      <p className="m-0 text-[10px] font-bold leading-snug text-[var(--ng-text-3)]">
        Bu koordinatlar seçtiğin ilin merkez noktasıdır; cihazının GPS konumu
        kullanılmaz.
      </p>
      <div className="flex items-center gap-1.5 text-xs font-extrabold text-[var(--ng-text-3)] [&_svg]:text-[var(--ng-green)]">
        <Globe width={14} height={14} />
        {meta.timezone}
      </div>
    </div>
  );
};

export const LocationCard = memo(LocationCardComponent);
