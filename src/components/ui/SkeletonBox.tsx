"use client";

import React from "react";
import { cn } from "@/src/lib/utils";

interface SkeletonBoxProps {
  className?: string;
  shape?: "default" | "pill" | "circle";
  flat?: boolean;
}

export const SkeletonBox: React.FC<SkeletonBoxProps> = ({
  className,
  shape = "default",
  flat = false,
}) => {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "bg-white/[0.06]",
        shape === "circle" && "rounded-full",
        shape === "pill" && "rounded-full",
        shape === "default" && "rounded-2xl",
        !flat && "animate-[shimmer_2s_ease-in-out_infinite]",
        className
      )}
    />
  );
};
