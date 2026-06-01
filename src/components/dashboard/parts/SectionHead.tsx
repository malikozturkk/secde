"use client";

import React, { memo } from "react";
import { Pill } from "@/src/components/ui/Pill";

interface SectionHeadProps {
  title: string;
  subtitle?: string;
  pill?: React.ReactNode;
}

const SectionHeadComponent: React.FC<SectionHeadProps> = ({
  title,
  subtitle,
  pill,
}) => {
  return (
    <div className="mt-1.5 flex items-end justify-between gap-3 px-1">
      <div>
        <h2 className="text-[22px] font-black leading-[1.1] tracking-[-0.01em] text-white">
          {title}
        </h2>
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
