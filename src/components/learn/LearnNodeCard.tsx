import { Sparkle } from "@/src/components/ui/Sparkle";
import type { LearnNode } from "@/src/types/learn.types";
import { CircleButton } from "../ui/CircleButton";
import Link from "next/link";
import { Button } from "../ui/Button";

interface LearnNodeCardProps {
  node: LearnNode;
}

export function LearnNodeCard({ node }: LearnNodeCardProps) {
  const {
    title,
    href,
    icon,
    bgColor,
    bgDark,
    shadowColor,
    iconColor,
    variant,
    innerGradient,
    sparkle,
  } = node;
  return (
    <div className="group relative flex flex-col items-center gap-5 z-5" data-path-node={node.id}>
      <Link href={href}>
        <CircleButton
          Icon={icon}
          iconColor={iconColor}
          innerGradient={innerGradient}
          shadowColor={shadowColor}
          bgDark={bgDark}
          bgColor={bgColor}
        />
      </Link>

      <div className="text-center">
        <h3 className="text-2xl font-black text-on-surface mb-3 tracking-tight">
          {title}
        </h3>
        <Link href={href}>
          <Button size="md" variant={variant}>
            ÖĞREN
          </Button>
        </Link>
      </div>
      {sparkle && (
        <Sparkle
          Icon={sparkle.icon}
          colorClass={sparkle.colorClass}
          position={sparkle.position}
        />
      )}
    </div>
  );
}
