"use client";

import React from "react";
import { cn } from "@/src/lib/utils";

type CardTone = "plain" | "primary" | "ice" | "violet" | "gold" | "rose";

type CardElement = "section" | "div" | "article";

interface CardProps extends React.HTMLAttributes<HTMLElement> {
  tone?: CardTone;
  glow?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  as?: CardElement;
  children: React.ReactNode;
}

const TONE_SURFACE: Record<CardTone, string> = {
  plain: "border-white/[0.06] bg-[#1C2E35]",
  primary:
    "border-[rgba(37,180,154,0.30)] bg-gradient-to-br from-[rgba(37,180,154,0.18)] via-[#1C2E35] to-[#1C2E35] to-70%",
  ice: "border-[rgba(79,195,247,0.30)] bg-gradient-to-br from-[rgba(79,195,247,0.15)] via-[#1C2E35] to-[#1C2E35] to-70%",
  violet:
    "border-[rgba(124,109,255,0.28)] bg-gradient-to-br from-[rgba(124,109,255,0.16)] via-[#1C2E35] to-[#1C2E35] to-70%",
  gold: "border-[rgba(245,166,35,0.30)] bg-gradient-to-br from-[rgba(245,166,35,0.16)] via-[#1C2E35] to-[#1C2E35] to-70%",
  rose: "border-[rgba(225,29,72,0.28)] bg-gradient-to-br from-[rgba(225,29,72,0.15)] via-[#1C2E35] to-[#1C2E35] to-70%",
};

const TONE_GLOW: Record<CardTone, string> = {
  plain:
    "bg-[radial-gradient(closest-side,rgba(255,255,255,0.10),transparent_70%)]",
  primary:
    "bg-[radial-gradient(closest-side,rgba(37,180,154,0.22),transparent_70%)]",
  ice: "bg-[radial-gradient(closest-side,rgba(79,195,247,0.28),transparent_70%)]",
  violet:
    "bg-[radial-gradient(closest-side,rgba(124,109,255,0.24),transparent_70%)]",
  gold: "bg-[radial-gradient(closest-side,rgba(245,166,35,0.24),transparent_70%)]",
  rose: "bg-[radial-gradient(closest-side,rgba(225,29,72,0.22),transparent_70%)]",
};

const PADDING: Record<NonNullable<CardProps["padding"]>, string> = {
  none: "",
  sm: "p-4",
  md: "p-[18px]",
  lg: "p-5 sm:p-6",
};

export const Card = React.forwardRef<HTMLElement, CardProps>(
  (
    {
      tone = "plain",
      glow = false,
      padding = "md",
      as = "section",
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const Element = as as React.ElementType;
    return (
      <Element
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-3xl border",
          TONE_SURFACE[tone],
          PADDING[padding],
          className
        )}
        {...rest}
      >
        {glow && (
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full blur-xl",
              TONE_GLOW[tone]
            )}
          />
        )}
        {glow ? <div className="relative">{children}</div> : children}
      </Element>
    );
  }
);

Card.displayName = "Card";
