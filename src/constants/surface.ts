export const ELEVATION = {
  flat: "rounded-[var(--ng-radius-lg)] bg-[var(--ng-surface)]",

  surface:
    "rounded-[var(--ng-radius-lg)] border-[length:var(--ng-stroke)] border-[var(--ng-edge)] bg-[var(--ng-surface)]",

  surfaceHigh:
    "rounded-[var(--ng-radius-lg)] border-[length:var(--ng-stroke)] border-[var(--ng-edge-strong)] bg-[var(--ng-surface-high)]",

  raised:
    "rounded-[var(--ng-radius-lg)] border-[length:var(--ng-stroke)] border-[var(--ng-edge)] bg-[var(--ng-surface)] shadow-[0_6px_0_0_var(--ng-surface-deep)] transition-[transform,box-shadow] duration-[var(--motion-press)] ease-[var(--ease-out)] active:translate-y-[4px] active:shadow-[0_2px_0_0_var(--ng-surface-deep)]",

  banner:
    "rounded-[var(--ng-radius-lg)] border-[length:var(--ng-stroke-thick)] shadow-[0_20px_44px_rgba(0,0,0,0.55)]",

  floating:
    "rounded-[var(--ng-radius-lg)] border-[length:var(--ng-stroke)] border-[var(--ng-edge-strong)] bg-[var(--ng-surface-high)] shadow-[0_24px_60px_rgba(0,0,0,0.60)]",

  inset:
    "rounded-[var(--ng-radius)] border-[length:var(--ng-stroke)] border-[var(--ng-edge)] bg-[var(--ng-surface-deep)]",
} as const;

export const PRESS =
  "transition-[transform,box-shadow,filter] duration-[var(--motion-press)] ease-[var(--ease-out)] active:translate-y-[4px]";

export const PRESS_SM =
  "transition-[transform,box-shadow,filter] duration-[var(--motion-press)] ease-[var(--ease-out)] active:translate-y-[2px]";

export const TEXT = {
  display:
    "font-display text-[38px] leading-[1.02] tracking-[-0.02em] text-white sm:text-[46px]",
  h1: "font-display text-[30px] leading-[1.05] tracking-[-0.02em] text-white sm:text-[38px]",
  h2: "font-display text-[24px] leading-[1.08] tracking-[-0.02em] text-white sm:text-[28px]",
  h3: "font-display text-[19px] leading-[1.15] tracking-[-0.015em] text-white sm:text-[21px]",
  eyebrow: "text-[11px] font-black uppercase tracking-[0.16em] leading-none",
  lede: "text-[15px] font-bold leading-[1.6] text-[var(--ng-text-2)] sm:text-[16px]",
  body: "text-[14px] font-bold leading-[1.6] text-[var(--ng-text-2)]",
  muted: "text-[12px] font-bold leading-snug text-[var(--ng-text-3)]",
  num: "font-display tabular-nums leading-none tracking-[0.02em] text-white",
} as const;

export const STAT_TILE =
  "flex flex-col items-center gap-1.5 rounded-[var(--ng-radius)] border-[length:var(--ng-stroke)] border-[var(--ng-edge)] bg-[var(--ng-surface-high)] px-3 py-3.5 text-center";

export const LINK_CARD =
  "block rounded-[var(--ng-radius)] border-[length:var(--ng-stroke)] border-[var(--ng-edge)] bg-[var(--ng-surface-high)] transition-[transform,border-color,background-color] duration-[var(--motion-fast)] ease-[var(--ease-out)] hover:-translate-y-0.5 hover:border-[var(--ng-green)] active:translate-y-0";

export const SECTION_GAP = "flex flex-col gap-[18px] lg:gap-6";

export type AccentName = "green" | "flame" | "gold" | "sky" | "violet" | "rose";

interface AccentSpec {
  fill: string;
  press: string;
  text: string;
  tintedCard: string;
  chip: string;
}

const spec = (name: AccentName, ink: string): AccentSpec => ({
  fill: `bg-[var(--ng-${name})] text-[${ink}] shadow-[0_5px_0_0_var(--ng-${name}-deep)] active:shadow-[0_1px_0_0_var(--ng-${name}-deep)]`,
  press: `shadow-[0_5px_0_0_var(--ng-${name}-deep)] active:shadow-[0_1px_0_0_var(--ng-${name}-deep)]`,
  text: `text-[var(--ng-${name})]`,
  tintedCard: `rounded-[var(--ng-radius-lg)] border-[length:var(--ng-stroke)] border-[color-mix(in_srgb,var(--ng-${name})_45%,transparent)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--ng-${name})_20%,transparent)_0%,var(--ng-surface)_65%)]`,
  chip: `border-[length:var(--ng-stroke)] border-[var(--ng-${name})] bg-[color-mix(in_srgb,var(--ng-${name})_18%,transparent)] text-[var(--ng-${name})]`,
});

export const ACCENT: Record<AccentName, AccentSpec> = {
  green: spec("green", "#04241B"),
  flame: spec("flame", "#2A1006"),
  gold: spec("gold", "#2A1D06"),
  sky: spec("sky", "#04303F"),
  violet: spec("violet", "#180A3D"),
  rose: spec("rose", "#2C0410"),
};
