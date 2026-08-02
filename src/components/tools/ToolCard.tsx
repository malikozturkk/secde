"use client";

import React, { memo } from "react";
import Link from "next/link";
import { ChevronRight } from "@/src/icons/tsx/dashboard";
import { Dhikr, Qibla, Zakat } from "@/src/icons/tsx/tools";
import { ToolId } from "@/src/types/enums/tools.enums";
import { cn } from "@/src/lib/utils";
import type { ToolMeta } from "@/src/types/tools.types";

const TOOL_ICON: Record<ToolId, React.FC<React.SVGProps<SVGSVGElement>>> = {
  [ToolId.Qibla]: Qibla as React.FC<React.SVGProps<SVGSVGElement>>,
  [ToolId.Dhikr]: Dhikr as React.FC<React.SVGProps<SVGSVGElement>>,
  [ToolId.Zakat]: Zakat as React.FC<React.SVGProps<SVGSVGElement>>,
};

interface ToolCardProps {
  tool: ToolMeta;
  hint?: React.ReactNode;
}

const ToolCardComponent: React.FC<ToolCardProps> = ({ tool, hint }) => {
  const Icon = TOOL_ICON[tool.id];

  return (
    <Link
      href={tool.href}
      aria-label={`${tool.label} — ${tool.description}`}
      className="group flex items-stretch gap-3.5 rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary-light)]"
    >
      <div className="relative flex w-[86px] shrink-0 items-center justify-center">
        <div
          className={cn(
            "grid h-[86px] w-[86px] place-items-center rounded-full",
            "transition-transform duration-100 ease-out",
            "group-active:translate-y-1 group-active:shadow-[0_2px_0_0_currentColor]",
            "motion-reduce:transition-none",
            tool.nodeBg,
            tool.nodeShadow
          )}
        >
          <Icon className="h-[38px] w-[38px] [filter:drop-shadow(0_2px_0_rgba(0,0,0,0.25))]" />
        </div>
      </div>

      <div
        className={cn(
          "flex min-w-0 flex-1 flex-col justify-center gap-1 rounded-3xl border p-4",
          "transition-transform duration-100 ease-out group-active:translate-y-1 motion-reduce:transition-none",
          tool.ring,
          tool.surface
        )}
      >
        <div className="flex items-center justify-between gap-2">
          <span
            className="text-[10px] font-black uppercase tracking-[0.16em]"
            style={{ color: tool.accent }}
          >
            {tool.eyebrow}
          </span>
          <ChevronRight className="h-3 w-3 shrink-0 text-white/30" />
        </div>

        <h3 className="text-[17px] font-black tracking-[-0.01em] text-white">{tool.label}</h3>
        <p className="text-[13px] font-bold leading-snug text-white/55">{tool.description}</p>

        {hint && (
          <div className="mt-1.5 text-[11px] font-black uppercase tracking-[0.08em] text-white/40">
            {hint}
          </div>
        )}
      </div>
    </Link>
  );
};

export const ToolCard = memo(ToolCardComponent);
