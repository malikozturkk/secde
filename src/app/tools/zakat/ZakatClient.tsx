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
      breadcrumbs={BREADCRUMBS}
      eyebrow="Zekât hesaplayıcı"
      title="Nisabı aşıyor musun, ne kadar zekât düşüyor?"
      lede="Nakit, altın, gümüş ve borçlarını gir; nisap eşiğini altın veya gümüş üzerinden seç. Hesap tarayıcında kalır, hiçbir veri sunucuya gönderilmez."
    >
        <section
          className={cn(
            "flex flex-col items-center gap-3 rounded-3xl border p-5 transition-colors duration-300",
            showResult && result.isLiable
              ? "border-[rgba(37,180,154,0.45)] bg-gradient-to-b from-[rgba(37,180,154,0.14)] to-[#1C2E35] to-60%"
              : "border-[rgba(245,166,35,0.30)] bg-gradient-to-b from-[rgba(245,166,35,0.10)] to-[#1C2E35] to-60%"
          )}
        >
          <div className="grid h-[72px] w-[72px] place-items-center rounded-2xl border-2 border-[rgba(245,166,35,0.35)] bg-[#12222B] shadow-[0_5px_0_0_#7A5A0D]">
            <Zakat className="h-11 w-11" />
          </div>

          {!showResult ? (
            <>
              <span className="font-display text-[24px] leading-none tracking-[0.02em] text-white">
                Zekât Hesaplayıcı
              </span>
              <p className="m-0 max-w-[38ch] text-center text-[12px] font-bold leading-snug text-white/45">
                {result.hasInput
                  ? "Nisap eşiğini bulmak için seçtiğin madenin gram fiyatını gir."
                  : "Aşağıdaki alanları doldur, kırkta bir olarak ne düştüğünü gör."}
              </p>
            </>
          ) : result.isLiable ? (
            <>
              <span className="text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-primary-light)]">
                Ödenecek zekât
              </span>
              <span className="font-display text-[44px] leading-none tracking-[0.02em] text-white tabular-nums [text-shadow:0_4px_0_rgba(15,80,72,0.5)]">
                {formatCurrency(result.zakatDue)}
              </span>
              <span className="text-[12px] font-black text-white/45">
                TL · net varlığın %{(ZAKAT_RATE * 100).toLocaleString("tr-TR")}
                &apos;i
              </span>
            </>
          ) : (
            <>
              <span className="font-display text-[24px] leading-none tracking-[0.02em] text-white">
                Nisabın altındasın
              </span>
              <span className="text-[12px] font-bold text-white/45">
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
              <div className="mt-1.5 flex justify-between text-[10px] font-black uppercase tracking-[0.1em] text-white/35">
                <span>Net {formatCurrency(result.netWealth)}</span>
                <span>Nisap {formatCurrency(result.nisabValue)}</span>
              </div>
            </div>
          )}
        </section>

        <section className="flex flex-col gap-3 rounded-3xl border border-white/[0.07] bg-[#1C2E35] p-4">
          <h2 className="m-0 text-sm font-black text-white">Nisap ölçüsü</h2>
          <div className="grid grid-cols-2 gap-2">
            {(Object.values(NisabBasis) as NisabBasis[]).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setChosenBasis(option)}
                aria-pressed={basis === option}
                className={cn(
                  "rounded-2xl border px-3 py-2.5 text-left transition-transform duration-100",
                  "active:translate-y-[3px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-secondary)]",
                  basis === option
                    ? "border-[rgba(245,166,35,0.6)] bg-[rgba(245,166,35,0.16)] shadow-[0_4px_0_0_#7A5A0D] active:shadow-[0_1px_0_0_#7A5A0D]"
                    : "border-white/[0.08] bg-[#16252C] shadow-[0_4px_0_0_rgba(0,0,0,0.3)] active:shadow-[0_1px_0_0_rgba(0,0,0,0.3)]"
                )}
              >
                <span className="block text-[13px] font-black text-white">
                  {NISAB_LABELS[option]}
                </span>
                <span className="mt-0.5 block text-[11px] font-bold text-white/40">
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
          <p className="m-0 text-[11px] font-bold leading-relaxed text-white/35">
            Fiyatlar kaydedilmez; hesap gününün güncel değerlerini gir.
          </p>
        </section>

        <section className="flex flex-col gap-3 rounded-3xl border border-white/[0.07] bg-[#1C2E35] p-4">
          <h2 className="m-0 text-sm font-black text-white">Varlıkların</h2>
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

        <p className="px-1 text-[11px] font-bold leading-relaxed text-white/35">
          {ZAKAT_DISCLAIMER}
        </p>
    </SeoPageShell>
  );
};
