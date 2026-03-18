"use client";

import React from "react";
import { cn } from "@/src/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  size?: "xs" | "sm" | "md" | "lg";
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", children, ...props },
    ref
  ) => {
    const baseStyles =
      "relative cursor-pointer inline-flex items-center justify-center font-bold tracking-wide uppercase transition-all duration-100 active:translate-y-[4px] disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-[var(--color-primary)] text-white shadow-[0_4px_0px_#0F5048] active:shadow-[0_0px_0px_#0F5048] rounded-[var(--radius-md)] hover:bg-[var(--color-primary-light)]",
      ghost:
        "bg-transparent text-white border-2 border-[rgba(255,255,255,0.2)] shadow-[0_4px_0px_rgba(255,255,255,0.1)] active:shadow-[0_0px_0px_rgba(255,255,255,0.1)] rounded-[var(--radius-md)] hover:bg-[rgba(255,255,255,0.05)]",
    };

    const sizes = {
      xs: "px-2 py-1 text-xs",
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          "font-display font-sans",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
