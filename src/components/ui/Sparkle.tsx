import { cn } from "@/src/lib/utils";
import { SvgIcon } from "@/src/types/learn.types";

interface SparkleProps {
  Icon: SvgIcon;
  colorClass: string;
  position: string;
}

export function Sparkle({ Icon, colorClass, position }: SparkleProps) {
  return (
    <span
      className={cn(
        "material-symbols-outlined absolute sparkle",
        colorClass,
        position
      )}
    >
      <Icon />
    </span>
  );
}
