export type AvatarColorKey =
  | "iris"
  | "pupil"
  | "hair"
  | "skin"
  | "lips"
  | "nose"
  | "earInner"
  | "eyebrow"
  | "outfit"
  | "background";

export type AvatarColors = Record<AvatarColorKey, string>;

export interface ColorFieldConfig {
  key: AvatarColorKey;
  label: string;
  palette: string[];
}

export const ACTIVE_COLOR = "#4fc3f7";
export const INACTIVE_COLOR = "rgba(255,255,255,0.35)";
