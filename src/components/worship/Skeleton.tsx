"use client";

import React from "react";

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  radius?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  radius = 12,
  className,
  style,
}) => (
  <div
    className={`wsh-sk ${className ?? ""}`}
    style={{
      width: width,
      height: height,
      borderRadius: radius,
      ...style,
    }}
  />
);
