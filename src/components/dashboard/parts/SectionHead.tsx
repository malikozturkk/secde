"use client";

import React, { memo } from "react";
import { Pill } from "@/src/components/ui/Pill";

interface SectionHeadProps {
  title: string;
  subtitle?: string;
  pill?: React.ReactNode;
  as?: "h1" | "h2";
}

const SectionHeadComponent: React.FC<SectionHeadProps> = ({
  title,
  subtitle,
  pill,
  as: Heading = "h2",
}) => {
  return (
    <div className="mt-1.5 flex items-end justify-between gap-3 px-1">
      <div>
        <Heading className="text-[22px] font-black leading-[1.1] tracking-[-0.01em] text-white">
          {title}
        </Heading>
        {subtitle && (
          <p className="mt-1 text-xs font-bold tracking-wide text-white/55">
            {subtitle}
          </p>
        )}
      </div>
      {pill && (
        <Pill tone="primary" size="sm" isCounter>
          {pill}
        </Pill>
      )}
    </div>
  );
};

export const SectionHead = memo(SectionHeadComponent);
