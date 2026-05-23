"use client";

import React, { useState } from "react";
import { Dialog } from "@/src/components/ui/Dialog";
import { Button } from "@/src/components/ui/Button";
import {
  CALCULATION_METHOD_LABEL,
  MADHAB_LABEL,
} from "@/src/constants/worship";
import { CalculationMethod, Madhab } from "@/src/types/enums/worship.enums";
import type { WorshipSettings } from "@/src/types/worship.types";
import { cn } from "@/src/lib/utils";

interface WorshipSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  value: WorshipSettings;
  onSave: (next: WorshipSettings) => void;
}

interface SettingsFormProps {
  initialValue: WorshipSettings;
  onSave: (next: WorshipSettings) => void;
  onClose: () => void;
}

const METHOD_OPTIONS: CalculationMethod[] = [
  CalculationMethod.Turkey,
  CalculationMethod.MuslimWorldLeague,
  CalculationMethod.Egyptian,
  CalculationMethod.Karachi,
  CalculationMethod.UmmAlQura,
  CalculationMethod.Tehran,
  CalculationMethod.Singapore,
];

const MADHAB_OPTIONS: Madhab[] = [Madhab.Shafi, Madhab.Hanafi];

const SettingsForm: React.FC<SettingsFormProps> = ({
  initialValue,
  onSave,
  onClose,
}) => {
  const [draft, setDraft] = useState<WorshipSettings>(initialValue);

  const handleSave = () => {
    onSave(draft);
    onClose();
  };

  const handleReset = () => setDraft({});

  return (
    <div className="flex flex-col gap-6 p-5 sm:p-6">
      <section className="flex flex-col gap-3">
        <header className="flex items-baseline justify-between">
          <h3 className="text-sm font-black uppercase tracking-[0.14em] text-[var(--color-primary-light)]">
            Yöntem
          </h3>
          <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/40">
            Hesaplama yöntemi
          </span>
        </header>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {METHOD_OPTIONS.map((method) => {
            const isActive = draft.method === method;
            return (
              <button
                key={method}
                type="button"
                onClick={() => setDraft((prev) => ({ ...prev, method }))}
                className={cn(
                  "flex items-center justify-between rounded-2xl border-2 px-4 py-3 text-left text-sm font-bold transition-all duration-100 active:translate-y-0.5",
                  isActive
                    ? "border-[var(--color-primary-light)] bg-[var(--color-primary)]/15 text-white shadow-[0_4px_0_0_var(--color-primary-dark)]"
                    : "border-white/10 bg-[#1a2b2a] text-white/80 hover:border-white/25 hover:bg-white/5"
                )}
                aria-pressed={isActive}
              >
                <span>{CALCULATION_METHOD_LABEL[method] ?? method}</span>
                <span
                  className={cn(
                    "grid h-5 w-5 place-items-center rounded-full border-2 transition",
                    isActive
                      ? "border-[var(--color-primary-light)] bg-[var(--color-primary-light)]"
                      : "border-white/25"
                  )}
                  aria-hidden="true"
                >
                  {isActive && (
                    <span className="h-2 w-2 rounded-full bg-[#070F12]" />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <header className="flex items-baseline justify-between">
          <h3 className="text-sm font-black uppercase tracking-[0.14em] text-[var(--color-primary-light)]">
            Mezhep
          </h3>
          <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/40">
            İkindi hesabı
          </span>
        </header>
        <div className="grid grid-cols-2 gap-2">
          {MADHAB_OPTIONS.map((madhab) => {
            const isActive = draft.madhab === madhab;
            return (
              <button
                key={madhab}
                type="button"
                onClick={() => setDraft((prev) => ({ ...prev, madhab }))}
                className={cn(
                  "rounded-2xl border-2 px-4 py-3 text-center text-sm font-bold transition-all duration-100 active:translate-y-0.5",
                  isActive
                    ? "border-[var(--color-primary-light)] bg-[var(--color-primary)]/15 text-white shadow-[0_4px_0_0_var(--color-primary-dark)]"
                    : "border-white/10 bg-[#1a2b2a] text-white/80 hover:border-white/25 hover:bg-white/5"
                )}
                aria-pressed={isActive}
              >
                {MADHAB_LABEL[madhab] ?? madhab}
              </button>
            );
          })}
        </div>
      </section>

      <div className="flex flex-col-reverse items-stretch gap-3 border-t border-white/5 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={handleReset}
          className="text-xs font-black uppercase tracking-[0.12em] text-white/50 transition hover:text-white"
        >
          Varsayılana dön
        </button>
        <div className="flex gap-2">
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Vazgeç
          </Button>
          <Button type="button" size="sm" onClick={handleSave}>
            Kaydet
          </Button>
        </div>
      </div>
    </div>
  );
};

export const WorshipSettingsModal: React.FC<WorshipSettingsModalProps> = ({
  isOpen,
  onClose,
  value,
  onSave,
}) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="md"
      header={
        <h2 className="text-lg font-extrabold tracking-wide text-white">
          Ayarları Değiştir
        </h2>
      }
    >
      <SettingsForm initialValue={value} onSave={onSave} onClose={onClose} />
    </Dialog>
  );
};
