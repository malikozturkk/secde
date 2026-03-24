import type { LearnNode } from "@/src/types/learn.types";
import { CircleButton } from "../ui/CircleButton";
import { Button } from "../ui/Button";
import Link from "next/link";

interface FeaturedLearnNodeProps {
  node: LearnNode;
}

export function FeaturedLearnNode({ node }: FeaturedLearnNodeProps) {
  const {
    title,
    href,
    bgDark,
    shadowColor,
    bgColor,
    iconColor,
    variant,
    innerGradient,
    icon,
  } = node;

  return (
    <div
      className="group relative flex flex-col items-center gap-8 pt-24 z-5"
      data-path-node={node.id}
    >
      <Link href={href}>
        <CircleButton
          icon={icon}
          iconColor={iconColor}
          bgColor={bgColor}
          innerGradient={innerGradient}
          shadowColor={shadowColor}
          bgDark={bgDark}
          size={256}
        />
      </Link>

      <div className="text-center z-10">
        <h3 className="text-4xl font-black text-on-surface mb-6 tracking-tight drop-shadow-lg">
          {title}
        </h3>
        <Link href={href}>
          <Button size="xl" variant={variant}>
            ÖĞREN
          </Button>
        </Link>
      </div>
    </div>
  );
}
