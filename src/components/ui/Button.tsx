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
      "relative cursor-pointer inline-flex items-center justify-center font-bold tracking-wide uppercase transition-all duration-100 active:translate-y-[4px] disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-[var(--color-primary)] text-white shadow-[0_6px_0px_#0F5048] active:shadow-[0_0px_0px_#0F5048] rounded-[var(--radius-md)] hover:brightness-110",
      ghost:
        "bg-transparent text-white border-2 border-[rgba(255,255,255,0.2)] shadow-[0_6px_0px_rgba(255,255,255,0.1)] active:shadow-[0_0px_0px_rgba(255,255,255,0.1)] rounded-[var(--radius-md)] hover:bg-[rgba(255,255,255,0.05)]",
      cyan: "bg-cyan-500 text-cyan-950 shadow-[0_6px_0px_#083344] active:shadow-[0_0px_0px_#083344] rounded-[var(--radius-md)] hover:brightness-110",
      blue: "bg-blue-500 text-blue-950 shadow-[0_6px_0px_#1e3a8a] active:shadow-[0_0px_0px_#1e3a8a] rounded-[var(--radius-md)] hover:brightness-110",
      lightBlue:
        "bg-[#3EBBFF] text-[#00283D] shadow-[0_6px_0px_#133b56] active:shadow-[0_0px_0px_#133b56] rounded-[var(--radius-md)] hover:brightness-110",
      amber:
        "bg-amber-500 text-amber-950 shadow-[0_6px_0px_#451a03] active:shadow-[0_0px_0px_#451a03] rounded-[var(--radius-md)] hover:brightness-110",
      yellow:
        "bg-yellow-400 text-yellow-950 shadow-[0_6px_0px_#713f12] active:shadow-[0_0px_0px_#713f12] rounded-[var(--radius-md)] hover:brightness-110",
      orange:
        "bg-orange-500 text-orange-950 shadow-[0_6px_0px_#7c2d12] active:shadow-[0_0px_0px_#7c2d12] rounded-[var(--radius-md)] hover:brightness-110",
      rose: "bg-rose-600 text-white shadow-[0_6px_0px_#4c0519] active:shadow-[0_0px_0px_#4c0519] rounded-[var(--radius-md)] hover:brightness-110",
      indigo:
        "bg-indigo-700 text-indigo-50 shadow-[0_6px_0px_#1e1b4b] active:shadow-[0_0px_0px_#1e1b4b] rounded-[var(--radius-md)] hover:brightness-110",
      emerald:
        "bg-emerald-600 text-white shadow-[0_6px_0px_#022c22] active:shadow-[0_0px_0px_#022c22] rounded-[var(--radius-md)] hover:brightness-110",
      gray: "bg-[#1C272C] text-white shadow-[0_6px_0px_#111c1e] active:shadow-[0_0px_0px_#111c1e] rounded-[var(--radius-md)] hover:brightness-110",
    };

    const sizes = {
      xs: "px-2 py-1 text-xs",
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
      xl: "px-10 py-5 text-xl",
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
          "font-display font-sans",
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
