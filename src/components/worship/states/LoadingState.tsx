"use client";

import React from "react";
import { Skeleton } from "../Skeleton";

export const LoadingState: React.FC = () => {
  return (
    <div
      className="wsh-main"
      role="status"
      aria-live="polite"
      aria-label="Yükleniyor"
    >
      <div className="wsh-controls">
        <div className="wsh-controls-left">
          <Skeleton width={160} height={36} radius={9999} />
          <Skeleton width={210} height={36} radius={9999} />
        </div>
        <Skeleton width={40} height={36} radius={9999} />
      </div>
      <div className="wsh-page-head">
        <Skeleton width={120} height={12} />
        <Skeleton width={320} height={40} />
        <Skeleton width={260} height={14} />
      </div>
      <Skeleton
        height={280}
        radius={28}
        className="wsh-sk-card"
        width="100%"
      />
      <Skeleton
        height={240}
        radius={22}
        className="wsh-sk-card"
        width="100%"
      />
      <div className="wsh-pgrid">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <Skeleton
            key={index}
            height={160}
            radius={22}
            className="wsh-sk-card"
            width="100%"
          />
        ))}
      </div>
    </div>
  );
};
