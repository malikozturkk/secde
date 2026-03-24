import { ReactElement } from "react";
import { cn } from "@/src/lib/utils";

interface CircleButtonProps {
  size?: number;
  bgDark?: string;
  bgColor?: string;
  shadowColor?: string;
  iconColor?: string;
  icon: ReactElement;
  iconSize?: string;
  innerGradient?: string;
  borderClass?: string;
  innerShadow?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function CircleButton({
  size = 176,
  bgDark,
  bgColor,
  shadowColor = "rgba(0,0,0,0.3)",
  iconColor = "text-white",
  icon,
  iconSize = "text-7xl",
  innerGradient,
  borderClass = "border-4 border-white/20",
  innerShadow = "shadow-[inset_0_-8px_0_0_rgba(0,0,0,0.15)]",
  onClick,
  disabled = false,
  className,
}: CircleButtonProps) {
  return (
    <button
      onClick={!disabled ? onClick : undefined}
      className={cn(
        "rounded-full p-3 transition-all",
        "shadow-[0_20px_0_0_var(--btn-shadow)]",
        !disabled &&
          "active:translate-y-[20px] active:shadow-none cursor-pointer",
        disabled && "opacity-50 cursor-not-allowed",
        bgDark,
        className
      )}
      style={
        {
          width: size,
          height: size,
          "--btn-shadow": shadowColor,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          "w-full h-full rounded-full flex items-center justify-center",
          "relative overflow-hidden",
          borderClass,
          innerShadow,
          bgColor
        )}
      >
        <div
          className={cn(
            "absolute inset-0",
            innerGradient ?? "bg-gradient-to-tr from-black/20 to-transparent"
          )}
        />
        <span
          className={cn(
            "material-symbols-outlined relative z-10",
            iconSize,
            iconColor
          )}
        >
          {icon}
        </span>
      </div>
    </button>
  );
}
