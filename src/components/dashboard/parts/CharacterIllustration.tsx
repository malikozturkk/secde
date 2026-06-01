"use client";

import React, { memo } from "react";
import type { SVGProps } from "react";
import { Ataman } from "@/src/icons/tsx/characters/ataman";
import { Ay } from "@/src/icons/tsx/characters/ay";
import { Nura, NuraSitting } from "@/src/icons/tsx/characters/nura";
import { Zeyd } from "@/src/icons/tsx/characters/zeyd";
import type { StreakCharacterName } from "@/src/constants/streak";
import { cn } from "@/src/lib/utils";

interface CharacterIllustrationProps extends SVGProps<SVGSVGElement> {
  character: StreakCharacterName;
  animated?: boolean;
  shadow?: "none" | "soft" | "strong";
}

const CHARACTER_COMPONENT: Record<
  StreakCharacterName,
  React.FC<SVGProps<SVGSVGElement>>
> = {
  ataman: Ataman as React.FC<SVGProps<SVGSVGElement>>,
  zeyd: Zeyd as React.FC<SVGProps<SVGSVGElement>>,
  nura: Nura as React.FC<SVGProps<SVGSVGElement>>,
  nura_sitting: NuraSitting as React.FC<SVGProps<SVGSVGElement>>,
  ay: Ay as React.FC<SVGProps<SVGSVGElement>>,
};

const SHADOW_CLASS: Record<
  NonNullable<CharacterIllustrationProps["shadow"]>,
  string
> = {
  none: "",
  soft: "drop-shadow-[0_6px_8px_rgba(0,0,0,0.40)]",
  strong: "drop-shadow-[0_12px_18px_rgba(0,0,0,0.50)]",
};

const CharacterIllustrationComponent: React.FC<CharacterIllustrationProps> = ({
  character,
  animated = false,
  shadow = "soft",
  className,
  ...rest
}) => {
  const Component = CHARACTER_COMPONENT[character];
  return (
    <Component
      className={cn(
        "h-full w-full object-contain object-bottom",
        animated && "animate-[floatBounce_4.2s_ease-in-out_infinite]",
        SHADOW_CLASS[shadow],
        className
      )}
      preserveAspectRatio="xMidYMax meet"
      {...rest}
    />
  );
};

export const CharacterIllustration = memo(CharacterIllustrationComponent);
