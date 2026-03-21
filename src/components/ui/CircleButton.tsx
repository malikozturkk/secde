import { ComponentType } from "react";
import { cn } from "@/src/lib/utils";

interface CircleButtonProps {
  size?: number;
  bgDark?: string;
  bgColor?: string;
  shadowColor?: string;
  iconColor?: string;
  Icon: ComponentType<{ className?: string }>;
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
  Icon,
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
        !disabled &&
          "hover:-translate-y-2 active:translate-y-2 active:shadow-none cursor-pointer",
        disabled && "opacity-50 cursor-not-allowed",
        bgDark,
        className
      )}
      style={{
        width: size,
        height: size,
        boxShadow: `0 20px 0 0 ${shadowColor}`,
      }}
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
          <Icon />
        </span>
      </div>
    </button>
  );
}
