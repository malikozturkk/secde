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
