"use client";
import React from "react";
import { cn } from "@/src/lib/utils";

export type SpeechBubbleTone =
  | "primary"
  | "neutral"
  | "accent"
  | "warning"
  | "white";
export type SpeechBubblePlacement =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-start"
  | "top-end"
  | "bottom-start"
  | "bottom-end";
export type SpeechBubbleSize = "sm" | "md" | "lg";

export interface SpeechBubbleProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  children: React.ReactNode;
  tone?: SpeechBubbleTone;
  size?: SpeechBubbleSize;
  placement?: SpeechBubblePlacement;
  pulse?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

const TONE_STYLES: Record<SpeechBubbleTone, string> = {
  primary:
    "bg-[#1c2e35] border-[var(--color-primary-light)]/40 text-white shadow-[0_8px_24px_rgba(0,0,0,0.45)]",
  neutral:
    "bg-[#1c2e35] border-white/10 text-white shadow-[0_8px_24px_rgba(0,0,0,0.4)]",
  accent:
    "bg-[#1c2e35] border-[var(--color-accent)]/45 text-white shadow-[0_8px_22px_rgba(79,195,247,0.18)]",
  warning:
    "bg-[#2a1f0f] border-amber-400/50 text-amber-50 shadow-[0_8px_24px_rgba(0,0,0,0.45)]",
  white:
    "bg-white border-white text-[#1c2e35] shadow-[0_10px_28px_rgba(0,0,0,0.45),0_3px_10px_rgba(0,0,0,0.25)]",
};

const TAIL_TONE: Record<SpeechBubbleTone, string> = {
  primary: "bg-[#1c2e35] border-[var(--color-primary-light)]/40",
  neutral: "bg-[#1c2e35] border-white/10",
  accent: "bg-[#1c2e35] border-[var(--color-accent)]/45",
  warning: "bg-[#2a1f0f] border-amber-400/50",
  white: "bg-white border-white",
};

const SIZE_STYLES: Record<SpeechBubbleSize, string> = {
  sm: "px-3 py-1.5 text-[11px] rounded-xl",
  md: "px-4 py-2.5 text-[13px] rounded-2xl",
  lg: "px-5 py-3 text-[15px] rounded-2xl",
};

const TITLE_TONE: Record<SpeechBubbleTone, string> = {
  primary: "text-[var(--color-text-muted)]",
  neutral: "text-[var(--color-text-muted)]",
  accent: "text-[var(--color-text-muted)]",
  warning: "text-amber-200/80",
  white: "text-[#3d5158]",
};

const BODY_TONE: Record<SpeechBubbleTone, string> = {
  primary: "text-white",
  neutral: "text-white",
  accent: "text-white",
  warning: "text-amber-50",
  white: "text-[#1c2e35]",
};

const TAIL_BASE = "absolute h-3 w-3 rotate-45 border";
const TAIL_POSITION: Record<SpeechBubblePlacement, string> = {
  top: "-top-1.5 left-1/2 -translate-x-1/2 border-r-0 border-b-0",
  "top-start": "-top-1.5 left-5 border-r-0 border-b-0",
  "top-end": "-top-1.5 right-5 border-r-0 border-b-0",
  bottom: "-bottom-1.5 left-1/2 -translate-x-1/2 border-l-0 border-t-0",
  "bottom-start": "-bottom-1.5 left-5 border-l-0 border-t-0",
  "bottom-end": "-bottom-1.5 right-5 border-l-0 border-t-0",
  left: "-left-1.5 top-1/2 -translate-y-1/2 border-r-0 border-t-0",
  right: "-right-1.5 top-1/2 -translate-y-1/2 border-l-0 border-b-0",
};

export const SpeechBubble: React.FC<SpeechBubbleProps> = ({
  title,
  children,
  tone = "neutral",
  size = "md",
  placement = "bottom",
  pulse = false,
  icon,
  className,
  ...rest
}) => {
  return (
    <div
      className={cn(
        "relative inline-flex max-w-3xs items-start gap-2 border font-semibold leading-tight backdrop-blur-sm transition-transform duration-200",
        TONE_STYLES[tone],
        SIZE_STYLES[size],
        pulse && "wsh-bubble-pulse",
        className
      )}
      style={{ boxShadow: "0 6px 0 0 rgba(0,0,0,0.35)" }}
      {...rest}
    >
      {icon && (
        <span className="mt-0.5 shrink-0" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="flex min-w-0 flex-col gap-0.5">
        {title && (
          <span
            className={cn(
              "text-[10px] font-black uppercase tracking-[0.16em]",
              TITLE_TONE[tone]
            )}
          >
            {title}
          </span>
        )}
        <span className={cn("font-bold", BODY_TONE[tone])}>{children}</span>
      </span>
      <span
        aria-hidden="true"
        className={cn(TAIL_BASE, TAIL_TONE[tone], TAIL_POSITION[placement])}
      />
    </div>
  );
};

SpeechBubble.displayName = "SpeechBubble";
