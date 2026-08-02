import type { NisabBasis, ToolId } from "./enums/tools.enums";

export interface ToolMeta {
  id: ToolId;
  href: string;
  label: string;
  description: string;
  eyebrow: string;
  nodeBg: string;
  nodeShadow: string;
  ring: string;
  surface: string;
  accent: string;
}

export interface QiblaReading {
  bearing: number;
  distanceKm: number;
}

export interface DhikrPreset {
  id: string;
  label: string;
  meaning: string;
  target: number;
}

export interface DhikrState {
  presetId: string;
  count: number;
  completedRounds: number;
  date: string;
}

export interface ZakatAssets {
  cash: number;
  goldGrams: number;
  silverGrams: number;
  receivables: number;
  investments: number;
  debts: number;
}

export interface ZakatPrices {
  goldPerGram: number;
  silverPerGram: number;
}

export interface ZakatResult {
  totalAssets: number;
  netWealth: number;
  nisabValue: number;
  basis: NisabBasis;
  isLiable: boolean;
  zakatDue: number;
  remainingToNisab: number;
  hasInput: boolean;
}
