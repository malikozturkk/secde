"use client";

import React from "react";
import { SkeletonBox } from "@/src/components/ui/SkeletonBox";

export const DashboardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 px-1 pb-28" aria-hidden="true">
      <div className="flex items-center gap-2.5">
        <SkeletonBox className="h-9 w-20 rounded-full" shape="pill" />
        <SkeletonBox className="h-9 w-28 rounded-full" shape="pill" />
        <SkeletonBox className="h-9 w-20 rounded-full" shape="pill" />
        <div className="flex-1" />
        <SkeletonBox className="h-10 w-10" shape="circle" />
      </div>
      <SkeletonBox className="h-[220px] w-full" />
      <SkeletonBox className="h-[88px] w-full" />
      <SkeletonBox className="h-[96px] w-full" />
      <SkeletonBox className="h-6 w-40" shape="pill" />
      <div className="flex flex-col gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-stretch gap-3">
            <SkeletonBox className="h-[78px] w-[78px]" shape="circle" />
            <SkeletonBox className="h-[78px] flex-1" />
          </div>
        ))}
      </div>
      <SkeletonBox className="h-[120px] w-full" />
      <SkeletonBox className="h-[160px] w-full" />
    </div>
  );
};
