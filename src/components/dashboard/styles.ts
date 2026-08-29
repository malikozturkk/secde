import { PrayerType } from "@/src/types/enums/streak.enums";

interface PrayerColorway {
  nodeBg: string;
  nodeShadow: string;
  nodeHalo: string;
  nodeGlow: string;
  rowBg: string;
  rowBorder: string;
  rowTime: string;
  textAccent: string;
}

const FAJR: PrayerColorway = {
  nodeBg: "bg-[#FFB020]",
  nodeShadow: "shadow-[0_8px_0_0_#8A5300]",
  nodeHalo: "ring-[#FFB020]",
  nodeGlow: "shadow-[0_0_34px_rgba(255,176,32,0.55)]",
  rowBg: "bg-[linear-gradient(180deg,rgba(255,176,32,0.16)_0%,var(--ng-surface)_62%)]",
  rowBorder: "border-[rgba(255,176,32,0.45)]",
  rowTime: "text-[#FFC85C]",
  textAccent: "text-[#FFC85C]",
};

const DHUHR: PrayerColorway = {
  nodeBg: "bg-[var(--ng-gold)]",
  nodeShadow: "shadow-[0_8px_0_0_var(--ng-gold-deep)]",
  nodeHalo: "ring-[var(--ng-gold)]",
  nodeGlow: "shadow-[0_0_34px_rgba(255,199,44,0.55)]",
  rowBg: "bg-[linear-gradient(180deg,rgba(255,199,44,0.16)_0%,var(--ng-surface)_62%)]",
  rowBorder: "border-[rgba(255,199,44,0.45)]",
  rowTime: "text-[var(--ng-gold)]",
  textAccent: "text-[var(--ng-gold)]",
};

const ASR: PrayerColorway = {
  nodeBg: "bg-[var(--ng-flame)]",
  nodeShadow: "shadow-[0_8px_0_0_var(--ng-flame-deep)]",
  nodeHalo: "ring-[var(--ng-flame)]",
  nodeGlow: "shadow-[0_0_34px_rgba(255,122,41,0.60)]",
  rowBg: "bg-[linear-gradient(180deg,rgba(255,122,41,0.18)_0%,var(--ng-surface)_62%)]",
  rowBorder: "border-[rgba(255,122,41,0.50)]",
  rowTime: "text-[var(--ng-flame)]",
  textAccent: "text-[var(--ng-flame)]",
};

const MAGHRIB: PrayerColorway = {
  nodeBg: "bg-[var(--ng-rose)]",
  nodeShadow: "shadow-[0_8px_0_0_var(--ng-rose-deep)]",
  nodeHalo: "ring-[var(--ng-rose)]",
  nodeGlow: "shadow-[0_0_34px_rgba(255,84,112,0.55)]",
  rowBg: "bg-[linear-gradient(180deg,rgba(255,84,112,0.16)_0%,var(--ng-surface)_62%)]",
  rowBorder: "border-[rgba(255,84,112,0.45)]",
  rowTime: "text-[var(--ng-rose)]",
  textAccent: "text-[var(--ng-rose)]",
};

const ISHA: PrayerColorway = {
  nodeBg: "bg-[#6C5CE7]",
  nodeShadow: "shadow-[0_8px_0_0_#2C1E78]",
  nodeHalo: "ring-[#8E7BFF]",
  nodeGlow: "shadow-[0_0_34px_rgba(108,92,231,0.60)]",
  rowBg: "bg-[linear-gradient(180deg,rgba(108,92,231,0.20)_0%,var(--ng-surface)_62%)]",
  rowBorder: "border-[rgba(142,123,255,0.45)]",
  rowTime: "text-[var(--ng-violet)]",
  textAccent: "text-[var(--ng-violet)]",
};

const JUMUAH: PrayerColorway = {
  nodeBg: "bg-[var(--ng-green)]",
  nodeShadow: "shadow-[0_8px_0_0_var(--ng-green-deep)]",
  nodeHalo: "ring-[var(--ng-green)]",
  nodeGlow: "shadow-[0_0_34px_rgba(23,217,160,0.55)]",
  rowBg: "bg-[linear-gradient(180deg,rgba(23,217,160,0.18)_0%,var(--ng-surface)_62%)]",
  rowBorder: "border-[rgba(23,217,160,0.50)]",
  rowTime: "text-[var(--ng-green)]",
  textAccent: "text-[var(--ng-green)]",
};

const TARAWIH: PrayerColorway = {
  nodeBg: "bg-[#9B59F6]",
  nodeShadow: "shadow-[0_8px_0_0_var(--ng-violet-deep)]",
  nodeHalo: "ring-[var(--ng-violet)]",
  nodeGlow: "shadow-[0_0_34px_rgba(155,89,246,0.55)]",
  rowBg: "bg-[linear-gradient(180deg,rgba(155,89,246,0.20)_0%,var(--ng-surface)_62%)]",
  rowBorder: "border-[rgba(169,139,255,0.45)]",
  rowTime: "text-[var(--ng-violet)]",
  textAccent: "text-[var(--ng-violet)]",
};

const EID: PrayerColorway = {
  nodeBg: "bg-[var(--ng-gold)]",
  nodeShadow: "shadow-[0_8px_0_0_var(--ng-gold-deep)]",
  nodeHalo: "ring-[var(--ng-gold)]",
  nodeGlow: "shadow-[0_0_34px_rgba(255,199,44,0.60)]",
  rowBg: "bg-[linear-gradient(180deg,rgba(255,199,44,0.20)_0%,var(--ng-surface)_62%)]",
  rowBorder: "border-[rgba(255,199,44,0.50)]",
  rowTime: "text-[var(--ng-gold)]",
  textAccent: "text-[var(--ng-gold)]",
};

export const PRAYER_COLORWAY: Record<PrayerType, PrayerColorway> = {
  [PrayerType.Fajr]: FAJR,
  [PrayerType.Dhuhr]: DHUHR,
  [PrayerType.Asr]: ASR,
  [PrayerType.Maghrib]: MAGHRIB,
  [PrayerType.Isha]: ISHA,
  [PrayerType.Jumuah]: JUMUAH,
  [PrayerType.Tarawih]: TARAWIH,
  [PrayerType.EidFitr]: EID,
  [PrayerType.EidAdha]: EID,
};

export const NG_CARD =
  "rounded-[var(--ng-radius-lg)] border-[length:var(--ng-stroke)] border-[var(--ng-edge)] bg-[var(--ng-surface)]";

export const NG_CARD_HIGH =
  "rounded-[var(--ng-radius-lg)] border-[length:var(--ng-stroke)] border-[var(--ng-edge-strong)] bg-[var(--ng-surface-high)]";

export const NG_CARD_GREEN =
  "rounded-[var(--ng-radius-lg)] border-[length:var(--ng-stroke)] border-[rgba(23,217,160,0.45)] bg-[linear-gradient(180deg,rgba(23,217,160,0.20)_0%,var(--ng-surface)_65%)]";

export const NG_EYEBROW =
  "text-[11px] font-black uppercase tracking-[0.16em] leading-none";

export const NG_TITLE =
  "font-display leading-[1.05] tracking-[-0.02em] text-[var(--ng-text)]";

export const NG_PRESS =
  "transition-[transform,box-shadow] duration-[var(--motion-press)] ease-[var(--ease-out)] active:translate-y-[4px]";

export const SURFACE_CARD_GRADIENT_PRIMARY = NG_CARD_GREEN;

export const MONTH_LEVEL_CLASS: Record<0 | 1 | 2 | 3 | 4 | 5, string> = {
  0: "bg-white/[0.05] border-2 border-white/[0.10] text-[var(--ng-text-3)]",
  1: "bg-[rgba(255,122,41,0.18)] border-2 border-[rgba(255,122,41,0.30)] text-[rgba(255,199,44,0.75)]",
  2: "bg-[rgba(255,122,41,0.34)] border-2 border-[rgba(255,122,41,0.45)] text-[var(--ng-text-2)]",
  3: "bg-[rgba(255,122,41,0.55)] border-2 border-[rgba(255,122,41,0.70)] text-white",
  4: "bg-[var(--ng-flame)] border-2 border-[rgba(255,122,41,0.80)] text-white shadow-[0_4px_0_0_var(--ng-flame-deep)]",
  5: "bg-[linear-gradient(180deg,#FFA05C_0%,var(--ng-flame)_100%)] border-2 border-[var(--ng-gold)] text-white shadow-[0_5px_0_0_var(--ng-flame-deep)]",
};
