"use client";

import React from "react";
import { Skeleton } from "../Skeleton";

export const LoadingState: React.FC = () => {
  return (
    <div
      className="flex min-w-0 flex-col gap-6"
      role="status"
      aria-live="polite"
      aria-label="Yükleniyor"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <Skeleton width={160} height={36} radius={9999} />
          <Skeleton width={210} height={36} radius={9999} />
        </div>
        <Skeleton width={40} height={36} radius={9999} />
      </div>
      <div className="flex flex-col gap-1.5">
        <Skeleton width={120} height={12} />
        <Skeleton width={320} height={40} />
        <Skeleton width={260} height={14} />
      </div>
      <Skeleton height={280} radius={28} width="100%" />
      <Skeleton height={240} radius={22} width="100%" />
      <div className="grid grid-cols-1 gap-3.5 min-[520px]:grid-cols-2 min-[900px]:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <Skeleton key={index} height={160} radius={22} width="100%" />
        ))}
      </div>
    </div>
  );
};
