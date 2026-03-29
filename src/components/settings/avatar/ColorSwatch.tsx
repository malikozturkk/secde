import { getContrastColor } from "@/src/lib/avatar-utils";
import { ACTIVE_COLOR } from "@/src/types/settings/avatar.types";
import { Check } from "lucide-react";

interface ColorSwatchProps {
  color: string;
  isSelected: boolean;
  onClick: () => void;
}

function ColorSwatch({ color, isSelected, onClick }: ColorSwatchProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={color}
      className="relative w-11 h-11 rounded-xl border-2 transition-all duration-150 flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95"
      style={{
        backgroundColor: color,
        borderColor: isSelected ? ACTIVE_COLOR : "rgba(255,255,255,0.1)",
        boxShadow: isSelected ? `0 0 0 2px rgba(79,195,247,0.35)` : "none",
      }}
    >
      {isSelected && (
        <Check
          size={14}
          strokeWidth={3}
          style={{ color: getContrastColor(color) }}
        />
      )}
    </button>
  );
}
export default ColorSwatch;
