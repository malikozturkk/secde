"use client";

import React from "react";
import { cn } from "@/src/lib/utils";
import { ButtonVariant } from "@/src/types/learn.types";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right" | "top" | "bottom";
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      icon,
      iconPosition = "left",
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "relative cursor-pointer inline-flex items-center justify-center font-black uppercase transition-[transform,box-shadow,filter,opacity] duration-[var(--motion-press)] ease-[var(--ease-out)] active:translate-y-[4px] disabled:opacity-50 disabled:cursor-not-allowed";

    const variants: Record<ButtonVariant, string> = {
      primary:
        "bg-[var(--ng-green)] text-[#04241B] shadow-[0_6px_0_0_var(--ng-green-deep)] active:shadow-[0_0px_0px_var(--ng-green-deep)] rounded-[var(--ng-radius)] hover:brightness-110",
      ghost:
        "bg-transparent text-white shadow-[inset_0_0_0_2px_var(--ng-edge-strong),0_6px_0_0_var(--ng-surface-deep)] active:shadow-[inset_0_0_0_2px_var(--ng-edge-strong),0_0px_0px_var(--ng-surface-deep)] rounded-[var(--ng-radius)] hover:bg-white/[0.07]",
      cyan: "bg-[var(--ng-sky)] text-[#04303F] shadow-[0_6px_0_0_var(--ng-sky-deep)] active:shadow-[0_0px_0px_var(--ng-sky-deep)] rounded-[var(--ng-radius)] hover:brightness-110",
      blue: "bg-[#3D8BFF] text-[#041C42] shadow-[0_6px_0_0_#0F3C86] active:shadow-[0_0px_0px_#0F3C86] rounded-[var(--ng-radius)] hover:brightness-110",
      lightBlue:
        "bg-[#5AD3FF] text-[#032F42] shadow-[0_6px_0_0_#0A6E96] active:shadow-[0_0px_0px_#0A6E96] rounded-[var(--ng-radius)] hover:brightness-110",
      amber:
        "bg-[#FFA51F] text-[#2A1A03] shadow-[0_6px_0_0_#8A5300] active:shadow-[0_0px_0px_#8A5300] rounded-[var(--ng-radius)] hover:brightness-110",
      yellow:
        "bg-[var(--ng-gold)] text-[#2A1D06] shadow-[0_6px_0_0_var(--ng-gold-deep)] active:shadow-[0_0px_0px_var(--ng-gold-deep)] rounded-[var(--ng-radius)] hover:brightness-110",
      orange:
        "bg-[var(--ng-flame)] text-[#2A1006] shadow-[0_6px_0_0_var(--ng-flame-deep)] active:shadow-[0_0px_0px_var(--ng-flame-deep)] rounded-[var(--ng-radius)] hover:brightness-110",
      rose: "bg-[var(--ng-rose)] text-[#2C0410] shadow-[0_6px_0_0_var(--ng-rose-deep)] active:shadow-[0_0px_0px_var(--ng-rose-deep)] rounded-[var(--ng-radius)] hover:brightness-110",
      indigo:
        "bg-[#7C5CF0] text-[#160A3A] shadow-[0_6px_0_0_var(--ng-violet-deep)] active:shadow-[0_0px_0px_var(--ng-violet-deep)] rounded-[var(--ng-radius)] hover:brightness-110",
      emerald:
        "bg-[var(--ng-green)] text-[#04241B] shadow-[0_6px_0_0_var(--ng-green-deep)] active:shadow-[0_0px_0px_var(--ng-green-deep)] rounded-[var(--ng-radius)] hover:brightness-110",
      gray: "bg-[var(--ng-surface-high)] text-white shadow-[0_6px_0_0_var(--ng-surface-deep)] active:shadow-[0_0px_0px_var(--ng-surface-deep)] rounded-[var(--ng-radius)] hover:brightness-125",
    };

    const sizes = {
      xs: "px-2.5 py-1.5 text-[11px] tracking-[0.08em]",
      sm: "px-4 py-2.5 text-[13px] tracking-[0.08em]",
      md: "px-6 py-3.5 text-[15px] tracking-[0.08em]",
      lg: "px-8 py-4 text-[17px] tracking-[0.06em]",
      xl: "px-10 py-5 text-[20px] tracking-[0.04em]",
    };

    const iconPositionStyles = {
      left: "flex-row gap-2",
      right: "flex-row-reverse gap-2",
      top: "flex-col gap-1",
      bottom: "flex-col-reverse gap-1",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          icon && iconPositionStyles[iconPosition],
          "font-display",
          className
        )}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
