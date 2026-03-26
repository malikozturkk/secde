import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { StepType, SvgIcon } from "../types/learn.types";
import {
  AfterStanding,
  AnointTheHead,
  Control,
  FullAblution,
  Intend,
  Khutbah,
  Prostration,
  Ruku,
  Salutation,
  Standing,
  Takbir,
  WashingBody,
  WashingTheArms,
  WashingTheEars,
  WashingTheFace,
  WashingTheFeets,
  WashingTheHands,
  WashingTheHead,
  WashingTheMouth,
  WashingTheNose,
  WashingThePrivate,
} from "../icons/tsx/learn/guide";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const stepIconMap: Record<StepType, SvgIcon> = {
  // Namaz
  takbir: Takbir,
  standing: Standing,
  ruku: Ruku,
  after_standing: AfterStanding,
  prostration: Prostration,
  salutation: Salutation,

  // Cuma
  khutbah: Khutbah,

  // Abdest
  wash_hands: WashingTheHands,
  wash_mouth: WashingTheMouth,
  wash_nose: WashingTheNose,
  wash_face: WashingTheFace,
  wash_arms: WashingTheArms,
  anoint_head: AnointTheHead,
  wash_ears: WashingTheEars,
  wash_feet: WashingTheFeets,

  // Gusül Abdesti
  intend: Intend,
  wash_private: WashingThePrivate,
  full_ablution: FullAblution,
  wash_head: WashingTheHead,
  wash_body: WashingBody,
  control: Control,
};

export const stepImageMap: Record<StepType, string> = {
  // Namaz
  takbir: "/learn/takbir.png",
  standing: "/learn/standing.png",
  ruku: "/learn/ruku.png",
  after_standing: "/learn/after_standing.png",
  prostration: "/learn/prostration.png",
  salutation: "/learn/salutation.png",

  // Cuma
  khutbah: "/learn/khutbah.png",

  // Abdest
  wash_hands: "/learn/wash_hands.png",
  wash_mouth: "/learn/wash_mouth.png",
  wash_nose: "/learn/wash_nose.png",
  wash_face: "/learn/wash_face.png",
  wash_arms: "/learn/wash_arms.png",
  anoint_head: "/learn/anoint_head.png",
  wash_ears: "/learn/wash_ears.png",
  wash_feet: "/learn/wash_feet.png",

  // Gusül Abdesti
  intend: "/learn/intend.png",
  wash_private: "/learn/wash_private.png",
  full_ablution: "/learn/full_ablution.png",
  wash_head: "/learn/wash_head.png",
  wash_body: "/learn/wash_body.png",
  control: "/learn/control.png",
};
