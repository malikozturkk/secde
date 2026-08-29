import type { Transition } from "framer-motion";

export const MOTION_SPRING = {
  ui: { type: "spring", bounce: 0, visualDuration: 0.35 },
  press: { type: "spring", bounce: 0, visualDuration: 0.18 },
  surface: { type: "spring", bounce: 0, visualDuration: 0.3 },
  momentum: { type: "spring", bounce: 0.2, visualDuration: 0.4 },
} as const satisfies Record<string, Transition>;

export const MOTION_FADE: Transition = { duration: 0.2, ease: "easeOut" };

export const MOTION_REDUCED: Transition = { duration: 0.15, ease: "easeOut" };

export const MOTION_DECELERATION_RATE = 0.998;

export const projectMomentum = (
  velocity: number,
  decelerationRate: number = MOTION_DECELERATION_RATE
): number => (velocity / 1000) * (decelerationRate / (1 - decelerationRate));
