import { ComponentType, SVGProps } from "react";

export type SvgIcon = ComponentType<SVGProps<SVGSVGElement>>;
export type NodeAlignment = "left" | "center" | "right" | "center-left";

export type ButtonVariant =
  | "primary"
  | "ghost"
  | "cyan"
  | "blue"
  | "lightBlue"
  | "amber"
  | "yellow"
  | "orange"
  | "rose"
  | "indigo"
  | "emerald"
  | "gray";

export interface LearnNode {
  id: string;
  title: string;
  icon: React.ReactElement;
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
    icon: React.ReactElement;
    colorClass: string;
    position: string;
  };
}

export interface RandomQuestion {
  id: string;
  question: string;
  options: string[];
}

export interface GuideStep {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  recitation?: string;
  tips?: string[];
  rekat?: number;
  bodyPart?: string;
  repeat?: string;
  isFard?: boolean;
  step: number;
  totalSteps: number;
  type: StepType;
  randomQuestion?: RandomQuestion;
}

export interface GuideData {
  id: string;
  title: string;
  description: string;
  steps: GuideStep[];
}

export interface GuideCheckQuestionPayload {
  questionId: string;
  answer: string;
}

export interface GuideCheckQuestionResponse {
  isCorrect: boolean;
  correctAnswer: string;
}

export type StepType =
  // Namaz
  | "takbir"
  | "standing"
  | "ruku"
  | "after_standing"
  | "prostration"
  | "salutation"

  // Cuma
  | "khutbah"

  // Abdest
  | "wash_hands"
  | "wash_mouth"
  | "wash_nose"
  | "wash_face"
  | "wash_arms"
  | "anoint_head"
  | "wash_ears"
  | "wash_feet"

  // Gusül Abdesti
  | "intend"
  | "wash_private"
  | "full_ablution"
  | "wash_head"
  | "wash_body"
  | "control";
