import { cn } from "@/src/lib/utils";
import { SvgIcon } from "@/src/types/learn.types";
import { ReactElement } from "react";

interface SparkleProps {
  icon: ReactElement;
  colorClass: string;
  position: string;
}

export function Sparkle({ icon, colorClass, position }: SparkleProps) {
  return (
    <span
      className={cn(
        "material-symbols-outlined absolute sparkle",
        colorClass,
        position
      )}
    >
      {icon}
    </span>
  );
}
