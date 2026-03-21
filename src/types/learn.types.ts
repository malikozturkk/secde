import { ComponentType, SVGProps } from "react";

export type SvgIcon = ComponentType<SVGProps<SVGSVGElement>>;
export type NodeAlignment = "left" | "center" | "right" | "center-left";

export type ButtonVariant =
  | "primary"
  | "ghost"
  | "cyan"
  | "blue"
  | "amber"
  | "yellow"
  | "orange"
  | "rose"
  | "indigo"
  | "emerald";

export interface LearnNode {
  id: string;
  title: string;
  icon: SvgIcon;
  href: string;
  alignment: NodeAlignment;
  bgColor: string;
  bgDark: string;
  shadowColor: string;
  iconColor: string;
  innerGradient?: string;
  variant: ButtonVariant;
  isFeatured?: boolean;
  sparkle?: {
    icon: SvgIcon;
    colorClass: string;
    position: string;
  };
}
