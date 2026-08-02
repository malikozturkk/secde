import { NISAB_GRAMS, ZAKAT_RATE } from "@/src/constants/tools";
import { NisabBasis } from "@/src/types/enums/tools.enums";
import type {
  ZakatAssets,
  ZakatPrices,
  ZakatResult,
} from "@/src/types/tools.types";

export const EMPTY_ASSETS: ZakatAssets = {
  cash: 0,
  goldGrams: 0,
  silverGrams: 0,
  receivables: 0,
  investments: 0,
  debts: 0,
};

export const EMPTY_PRICES: ZakatPrices = { goldPerGram: 0, silverPerGram: 0 };

const safe = (n: number): number => (Number.isFinite(n) && n > 0 ? n : 0);

export function parseAmount(raw: string): number {
  if (!raw.trim()) return 0;
  const normalized = raw
    .replace(/\s/g, "")
    .replace(/\./g, "")
    .replace(",", ".");
  const value = Number(normalized);
  return Number.isFinite(value) && value > 0 ? value : 0;
}

export function formatCurrency(value: number): string {
  return value.toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function calculateZakat(
  assets: ZakatAssets,
  prices: ZakatPrices,
  basis: NisabBasis
): ZakatResult {
  const goldValue = safe(assets.goldGrams) * safe(prices.goldPerGram);
  const silverValue = safe(assets.silverGrams) * safe(prices.silverPerGram);

  const totalAssets =
    safe(assets.cash) +
    safe(assets.receivables) +
    safe(assets.investments) +
    goldValue +
    silverValue;

  const netWealth = Math.max(0, totalAssets - safe(assets.debts));

  const pricePerGram =
    basis === NisabBasis.Gold
      ? safe(prices.goldPerGram)
      : safe(prices.silverPerGram);
  const nisabValue = NISAB_GRAMS[basis] * pricePerGram;

  const nisabKnown = nisabValue > 0;
  const isLiable = nisabKnown && netWealth >= nisabValue;

  return {
    totalAssets,
    netWealth,
    nisabValue,
    basis,
    isLiable,
    zakatDue: isLiable ? netWealth * ZAKAT_RATE : 0,
    remainingToNisab: nisabKnown && !isLiable ? nisabValue - netWealth : 0,
    hasInput: totalAssets > 0 || safe(assets.debts) > 0,
  };
}
