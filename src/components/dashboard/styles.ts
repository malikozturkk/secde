import { PrayerType } from "@/src/types/enums/streak.enums";

export interface PrayerColorway {
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
  nodeBg: "bg-amber-500",
  nodeShadow: "shadow-[0_7px_0_0_#7C2D12]",
  nodeHalo: "ring-amber-500",
  nodeGlow: "shadow-[0_0_28px_rgba(245,158,11,0.45)]",
  rowBg: "bg-gradient-to-b from-amber-500/10 to-[#1C2E35] to-60%",
  rowBorder: "border-amber-500/30",
  rowTime: "text-amber-300",
  textAccent: "text-amber-300",
};

const DHUHR: PrayerColorway = {
  nodeBg: "bg-yellow-400",
  nodeShadow: "shadow-[0_7px_0_0_#7C5300]",
  nodeHalo: "ring-yellow-400",
  nodeGlow: "shadow-[0_0_28px_rgba(250,204,21,0.45)]",
  rowBg: "bg-gradient-to-b from-yellow-400/10 to-[#1C2E35] to-60%",
  rowBorder: "border-yellow-400/30",
  rowTime: "text-yellow-300",
  textAccent: "text-yellow-300",
};

const ASR: PrayerColorway = {
  nodeBg: "bg-orange-500",
  nodeShadow: "shadow-[0_7px_0_0_#7C2D12]",
  nodeHalo: "ring-orange-500",
  nodeGlow: "shadow-[0_0_28px_rgba(249,115,22,0.55)]",
  rowBg: "bg-gradient-to-b from-orange-500/15 to-[#1C2E35] to-60%",
  rowBorder: "border-orange-500/35",
  rowTime: "text-orange-400",
  textAccent: "text-orange-400",
};

const MAGHRIB: PrayerColorway = {
  nodeBg: "bg-rose-600",
  nodeShadow: "shadow-[0_7px_0_0_#4C0519]",
  nodeHalo: "ring-rose-600",
  nodeGlow: "shadow-[0_0_28px_rgba(225,29,72,0.45)]",
  rowBg: "bg-gradient-to-b from-rose-600/10 to-[#1C2E35] to-60%",
  rowBorder: "border-rose-600/30",
  rowTime: "text-rose-300",
  textAccent: "text-rose-300",
};

const ISHA: PrayerColorway = {
  nodeBg: "bg-indigo-700",
  nodeShadow: "shadow-[0_7px_0_0_#1E1B4B]",
  nodeHalo: "ring-indigo-500",
  nodeGlow: "shadow-[0_0_28px_rgba(67,56,202,0.45)]",
  rowBg: "bg-gradient-to-b from-indigo-700/10 to-[#1C2E35] to-60%",
  rowBorder: "border-indigo-700/30",
  rowTime: "text-indigo-200",
  textAccent: "text-indigo-200",
};

const JUMUAH: PrayerColorway = {
  nodeBg: "bg-emerald-600",
  nodeShadow: "shadow-[0_7px_0_0_#022C22]",
  nodeHalo: "ring-emerald-500",
  nodeGlow: "shadow-[0_0_28px_rgba(5,150,105,0.45)]",
  rowBg: "bg-gradient-to-b from-emerald-600/15 to-[#1C2E35] to-60%",
  rowBorder: "border-emerald-600/40",
  rowTime: "text-emerald-300",
  textAccent: "text-emerald-300",
};

const TERAVIH: PrayerColorway = {
  nodeBg: "bg-violet-600",
  nodeShadow: "shadow-[0_7px_0_0_#3B0764]",
  nodeHalo: "ring-violet-500",
  nodeGlow: "shadow-[0_0_28px_rgba(124,58,237,0.45)]",
  rowBg: "bg-gradient-to-b from-violet-600/15 to-[#1C2E35] to-60%",
  rowBorder: "border-violet-600/35",
  rowTime: "text-violet-300",
  textAccent: "text-violet-300",
};

const BAYRAM: PrayerColorway = {
  nodeBg: "bg-yellow-500",
  nodeShadow: "shadow-[0_7px_0_0_#713F12]",
  nodeHalo: "ring-yellow-400",
  nodeGlow: "shadow-[0_0_28px_rgba(234,179,8,0.5)]",
  rowBg: "bg-gradient-to-b from-yellow-500/15 to-[#1C2E35] to-60%",
  rowBorder: "border-yellow-500/40",
  rowTime: "text-yellow-300",
  textAccent: "text-yellow-300",
};

export const PRAYER_COLORWAY: Record<PrayerType, PrayerColorway> = {
  [PrayerType.Fajr]: FAJR,
  [PrayerType.Dhuhr]: DHUHR,
  [PrayerType.Asr]: ASR,
  [PrayerType.Maghrib]: MAGHRIB,
  [PrayerType.Isha]: ISHA,
  [PrayerType.Jumuah]: JUMUAH,
  [PrayerType.Teravih]: TERAVIH,
  [PrayerType.Bayram]: BAYRAM,
};

export const SURFACE_CARD =
  "rounded-3xl border border-white/[0.06] bg-[#1C2E35]";

export const SURFACE_CARD_GRADIENT_PRIMARY =
  "rounded-3xl border border-[rgba(37,180,154,0.30)] bg-gradient-to-br from-[rgba(37,180,154,0.18)] via-[#1C2E35] to-[#1C2E35] to-70% overflow-hidden";

export const SURFACE_CARD_GRADIENT_VIOLET =
  "rounded-3xl border border-white/[0.06] bg-[#1C2E35] overflow-hidden relative";

export const SURFACE_CARD_GRADIENT_ICE =
  "rounded-3xl border border-[rgba(79,195,247,0.30)] bg-gradient-to-br from-[rgba(79,195,247,0.15)] via-[#1C2E35] to-[#1C2E35] to-70% overflow-hidden relative";

export const MONTH_LEVEL_CLASS: Record<0 | 1 | 2 | 3 | 4 | 5, string> = {
  0: "bg-white/[0.04] border border-white/[0.08] text-white/30",
  1: "bg-[rgba(255,107,53,0.14)] border border-[rgba(255,107,53,0.20)] text-[rgba(255,202,107,0.65)]",
  2: "bg-[rgba(255,107,53,0.26)] border border-[rgba(255,107,53,0.32)] text-white/75",
  3: "bg-[rgba(255,107,53,0.45)] border border-[rgba(255,107,53,0.55)] text-white",
  4: "bg-[#FF6B35] border border-[rgba(255,107,53,0.65)] text-white shadow-[0_3px_0_0_rgba(124,39,8,0.4)]",
  5: "bg-gradient-to-br from-[#FF8A5C] to-[#FF6B35] border border-[rgba(255,107,53,0.65)] text-white shadow-[0_4px_0_0_rgba(124,39,8,0.6)] [box-shadow:inset_0_0_12px_rgba(255,255,255,0.25)]",
};
