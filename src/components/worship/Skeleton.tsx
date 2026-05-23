"use client";

import React from "react";
import { cn } from "@/src/lib/utils";

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
    className={cn(
      "rounded-xl border border-white/5 bg-gradient-to-r from-white/[0.03] via-white/[0.08] to-white/[0.03] bg-[length:200%_100%] animate-[wshSk_1.4s_ease-in-out_infinite]",
      className
    )}
    style={{
      width: width,
      height: height,
      borderRadius: radius,
      ...style,
    }}
  />
);
