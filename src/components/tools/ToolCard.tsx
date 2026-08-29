"use client";

import React, { memo } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Dhikr, Qibla, Zakat } from "@/src/icons/tsx/tools";
import { ToolId } from "@/src/types/enums/tools.enums";
import { ACCENT, ELEVATION, TEXT } from "@/src/constants/surface";
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
  const accent = ACCENT[tool.accent];

  return (
    <Link
      href={tool.href}
      aria-label={`${tool.label} — ${tool.description}`}
      className={cn(
        "group flex h-full w-full flex-col gap-3 p-4",
        ELEVATION.surface,
        "transition-[transform,border-color] duration-[var(--motion-fast)] ease-[var(--ease-out)]",
        "hover:-translate-y-0.5 hover:border-[var(--ng-edge-strong)] active:translate-y-0",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ng-edge-strong)]"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className={cn(
            "grid h-[54px] w-[54px] shrink-0 place-items-center rounded-[var(--ng-radius)]",
            "border-[length:var(--ng-stroke)] border-[var(--ng-edge)] bg-[var(--ng-surface-deep)]"
          )}
        >
          <Icon className="h-8 w-8" />
        </span>
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-1",
            accent.chip,
            TEXT.eyebrow,
            "text-[10px] tracking-[0.14em]"
          )}
        >
          {tool.eyebrow}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-1.5">
        <h3 className={TEXT.h3}>{tool.label}</h3>
        <p className={cn(TEXT.body, "text-[13px]")}>{tool.description}</p>
      </div>

      {hint && (
        <div className="flex items-center justify-between gap-2 border-t-[length:var(--ng-stroke)] border-[var(--ng-edge)] pt-3">
          <span
            className={cn(
              "min-w-0 truncate text-[11px] font-black uppercase tracking-[0.08em]",
              accent.text
            )}
          >
            {hint}
          </span>
          <ArrowRight
            size={16}
            strokeWidth={3}
            aria-hidden="true"
            className={cn(
              "shrink-0 transition-transform duration-[var(--motion-fast)] ease-[var(--ease-out)] group-hover:translate-x-1",
              accent.text
            )}
          />
        </div>
      )}
    </Link>
  );
};

export const ToolCard = memo(ToolCardComponent);
