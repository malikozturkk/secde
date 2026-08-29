"use client";

import React, { useCallback, useMemo, useState } from "react";
import { SeoPageShell } from "@/src/components/seo/SeoPageShell";
import { Input } from "@/src/components/ui/Input";
import { ProgressBar } from "@/src/components/ui/ProgressBar";
import { Zakat } from "@/src/icons/tsx/tools";
import { useAuthStore } from "@/src/store/auth.store";
import {
  calculateZakat,
  formatCurrency,
  parseAmount,
} from "@/src/lib/zakat-utils";
import {
  NISAB_GRAMS,
  NISAB_LABELS,
  ZAKAT_DISCLAIMER,
  ZAKAT_RATE,
} from "@/src/constants/tools";
import { NisabBasis } from "@/src/types/enums/tools.enums";
import { cn } from "@/src/lib/utils";
import { ACCENT, ELEVATION, TEXT } from "@/src/constants/surface";

type FieldKey =
  | "cash"
  | "goldGrams"
  | "silverGrams"
  | "receivables"
  | "investments"
  | "debts"
  | "goldPerGram"
  | "silverPerGram";

const ASSET_FIELDS: ReadonlyArray<{
  key: FieldKey;
  label: string;
  suffix: string;
}> = [
  { key: "cash", label: "Nakit ve banka", suffix: "TL" },
  { key: "receivables", label: "Alacaklar", suffix: "TL" },
  { key: "investments", label: "Yatırım ve ticaret malı", suffix: "TL" },
  { key: "goldGrams", label: "Altın", suffix: "gr" },
  { key: "silverGrams", label: "Gümüş", suffix: "gr" },
  { key: "debts", label: "Borçların", suffix: "TL" },
];

const EMPTY_VALUES: Record<FieldKey, string> = {
  cash: "",
  goldGrams: "",
  silverGrams: "",
  receivables: "",
  investments: "",
  debts: "",
  goldPerGram: "",
  silverPerGram: "",
};

const BREADCRUMBS = [
  { name: "Ana sayfa", path: "/" },
  { name: "Araçlar", path: "/tools" },
  { name: "Zekât Hesaplayıcı", path: "/tools/zakat" },
];

export const ZakatClient: React.FC = () => {
  const { user } = useAuthStore();
  const [values, setValues] = useState<Record<FieldKey, string>>(EMPTY_VALUES);
  const [chosenBasis, setChosenBasis] = useState<NisabBasis | null>(null);

  const basis =
    chosenBasis ??
    (user?.madhab === "HANAFI" ? NisabBasis.Silver : NisabBasis.Gold);

  const setField = useCallback((key: FieldKey, raw: string) => {
    if (raw && !/^[\d.,\s]*$/.test(raw)) return;
    setValues((current) => ({ ...current, [key]: raw }));
  }, []);

  const result = useMemo(
    () =>
      calculateZakat(
        {
          cash: parseAmount(values.cash),
          goldGrams: parseAmount(values.goldGrams),
          silverGrams: parseAmount(values.silverGrams),
          receivables: parseAmount(values.receivables),
          investments: parseAmount(values.investments),
          debts: parseAmount(values.debts),
        },
        {
          goldPerGram: parseAmount(values.goldPerGram),
          silverPerGram: parseAmount(values.silverPerGram),
        },
        basis
      ),
    [values, basis]
  );

  const missingPrice =
    basis === NisabBasis.Gold
      ? !parseAmount(values.goldPerGram)
      : !parseAmount(values.silverPerGram);

  const nisabProgress =
    result.nisabValue > 0
      ? Math.min(100, Math.round((result.netWealth / result.nisabValue) * 100))
      : 0;

  const showResult = result.hasInput && !missingPrice;

  return (
    <SeoPageShell
      publicShell
      className="ng-calm"
      breadcrumbs={BREADCRUMBS}
      eyebrow="Zekât hesaplayıcı"
      title="Nisabı aşıyor musun, ne kadar zekât düşüyor?"
      lede="Nakit, altın, gümüş ve borçlarını gir; nisap eşiğini altın veya gümüş üzerinden seç. Hesap tarayıcında kalır, hiçbir veri sunucuya gönderilmez."
    >
        <section
          className={cn(
            ELEVATION.surface,
            "flex flex-col items-center gap-3 p-5 transition-colors duration-[var(--motion-base)] sm:p-6",
            showResult &&
              result.isLiable &&
              "border-[color-mix(in_srgb,var(--ng-green)_55%,transparent)]"
          )}
        >
          <div className="grid h-[68px] w-[68px] place-items-center rounded-[var(--ng-radius)] border-[length:var(--ng-stroke)] border-[var(--ng-edge)] bg-[var(--ng-surface-deep)]">
            <Zakat className="h-11 w-11" />
          </div>

          {!showResult ? (
            <>
              <span className={TEXT.h2}>Zekât Hesaplayıcı</span>
              <p className={cn(TEXT.muted, "m-0 max-w-[38ch] text-center")}>
                {result.hasInput
                  ? "Nisap eşiğini bulmak için seçtiğin madenin gram fiyatını gir."
                  : "Aşağıdaki alanları doldur, kırkta bir olarak ne düştüğünü gör."}
              </p>
            </>
          ) : result.isLiable ? (
            <>
              <span
                className={cn(
                  "inline-flex items-center rounded-full px-3 py-1.5",
                  ACCENT.green.chip,
                  TEXT.eyebrow
                )}
              >
                ÖDENECEK ZEKÂT
              </span>
              <span className={cn(TEXT.num, "text-[52px]")}>
                {formatCurrency(result.zakatDue)}
              </span>
              <span className={TEXT.muted}>
                TL · net varlığın %{(ZAKAT_RATE * 100).toLocaleString("tr-TR")}
                &apos;i
              </span>
            </>
          ) : (
            <>
              <span className={TEXT.h2}>Nisabın altındasın</span>
              <span className={TEXT.muted}>
                Nisaba {formatCurrency(result.remainingToNisab)} TL kaldı
              </span>
            </>
          )}

          {showResult && (
            <div className="mt-1 w-full max-w-[320px]">
              <ProgressBar
                value={nisabProgress}
                tone={result.isLiable ? "primary" : "secondary"}
                size="sm"
                aria-label="Nisaba göre durum"
              />
              <div className="mt-2 flex justify-between text-[10px] font-black uppercase tracking-[0.1em] text-[var(--ng-text-3)]">
                <span>Net {formatCurrency(result.netWealth)}</span>
                <span>Nisap {formatCurrency(result.nisabValue)}</span>
              </div>
            </div>
          )}
        </section>

        <section className={cn(ELEVATION.surface, "flex flex-col gap-3.5 p-4 sm:p-5")}>
          <h2 className={cn(TEXT.h3, "m-0")}>Nisap ölçüsü</h2>
          <div className="grid grid-cols-2 gap-2">
            {(Object.values(NisabBasis) as NisabBasis[]).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setChosenBasis(option)}
                aria-pressed={basis === option}
                className={cn(
                  "rounded-[var(--ng-radius)] border-[length:var(--ng-stroke)] px-3.5 py-3 text-left",
                  "transition-colors duration-[var(--motion-fast)] ease-[var(--ease-out)]",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ng-gold)]",
                  basis === option
                    ? "border-[var(--ng-gold)] bg-[color-mix(in_srgb,var(--ng-gold)_14%,transparent)]"
                    : "border-[var(--ng-edge)] bg-[var(--ng-surface-high)] hover:border-[var(--ng-edge-strong)]"
                )}
              >
                <span className="block text-[14px] font-black text-white">
                  {NISAB_LABELS[option]}
                </span>
                <span className={cn(TEXT.muted, "mt-0.5 block")}>
                  {NISAB_GRAMS[option].toLocaleString("tr-TR")} gr karşılığı
                </span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Gram altın"
              inputMode="decimal"
              placeholder="0,00"
              suffix="TL"
              value={values.goldPerGram}
              onChange={(e) => setField("goldPerGram", e.target.value)}
            />
            <Input
              label="Gram gümüş"
              inputMode="decimal"
              placeholder="0,00"
              suffix="TL"
              value={values.silverPerGram}
              onChange={(e) => setField("silverPerGram", e.target.value)}
            />
          </div>
          <p className={cn(TEXT.muted, "m-0")}>
            Fiyatlar kaydedilmez; hesap gününün güncel değerlerini gir.
          </p>
        </section>

        <section className={cn(ELEVATION.surface, "flex flex-col gap-3.5 p-4 sm:p-5")}>
          <h2 className={cn(TEXT.h3, "m-0")}>Varlıkların</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {ASSET_FIELDS.map((field) => (
              <Input
                key={field.key}
                label={field.label}
                inputMode="decimal"
                placeholder="0"
                suffix={field.suffix}
                value={values[field.key]}
                onChange={(e) => setField(field.key, e.target.value)}
              />
            ))}
          </div>
        </section>

        <p className={cn(TEXT.muted, "px-1")}>{ZAKAT_DISCLAIMER}</p>
    </SeoPageShell>
  );
};
