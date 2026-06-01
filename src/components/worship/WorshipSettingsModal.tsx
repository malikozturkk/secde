"use client";

import React, { useState } from "react";
import { Dialog } from "@/src/components/ui/Dialog";
import { Button } from "@/src/components/ui/Button";
import { Radio, RadioGroup } from "@/src/components/ui/Radio";
import { useWorshipOptions } from "@/src/hooks/worship/useWorshipOptions";
import type {
  WorshipOption,
  WorshipOptionsData,
  WorshipSettings,
} from "@/src/types/worship.types";

interface WorshipSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeMethod?: string;
  activeMadhab?: string;
  onSave: (next: WorshipSettings) => void;
}

interface SettingsFormProps {
  options: WorshipOptionsData;
  activeMethod: string;
  activeMadhab: string;
  onSave: (next: WorshipSettings) => void;
  onClose: () => void;
}

interface OptionSectionProps {
  title: string;
  caption: string;
  name: string;
  options: WorshipOption[];
  value: string;
  onChange: (next: string) => void;
}

const DefaultBadge: React.FC = () => (
  <span className="rounded-full border border-white/15 bg-white/[0.05] px-1.5 py-0.5 text-[9px] font-black uppercase tracking-[0.12em] text-white/60">
    Varsayılan
  </span>
);

const OptionSection: React.FC<OptionSectionProps> = ({
  title,
  caption,
  name,
  options,
  value,
  onChange,
}) => (
  <section className="flex flex-col gap-3">
    <header className="flex items-baseline justify-between">
      <h3 className="text-sm font-black uppercase tracking-[0.14em] text-[var(--color-primary-light)]">
        {title}
      </h3>
      <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/40">
        {caption}
      </span>
    </header>
    <RadioGroup
      name={name}
      value={value}
      onChange={onChange}
      orientation="grid"
      columns={2}
      variant="card"
      size="md"
    >
      {options.map((option) => (
        <Radio
          key={option.key}
          value={option.key}
          label={option.key}
          trailing={option.isDefault ? <DefaultBadge /> : undefined}
        />
      ))}
    </RadioGroup>
  </section>
);

const SettingsForm: React.FC<SettingsFormProps> = ({
  options,
  activeMethod,
  activeMadhab,
  onSave,
  onClose,
}) => {
  const [draftMethod, setDraftMethod] = useState<string>(activeMethod);
  const [draftMadhab, setDraftMadhab] = useState<string>(activeMadhab);

  const isDirty = draftMethod !== activeMethod || draftMadhab !== activeMadhab;

  const handleSave = () => {
    if (!isDirty) {
      onClose();
      return;
    }
    onSave({ method: draftMethod, madhab: draftMadhab });
    onClose();
  };

  const handleReset = () => {
    setDraftMethod(options.defaults.method);
    setDraftMadhab(options.defaults.madhab);
  };

  return (
    <div className="flex flex-col gap-6 p-5 sm:p-6">
      <OptionSection
        title="Yöntem"
        caption="Hesaplama yöntemi"
        name="worship-method"
        options={options.calculationMethods}
        value={draftMethod}
        onChange={setDraftMethod}
      />

      <OptionSection
        title="Mezhep"
        caption="İkindi hesabı"
        name="worship-madhab"
        options={options.madhabs}
        value={draftMadhab}
        onChange={setDraftMadhab}
      />

      <div className="flex flex-col-reverse items-stretch gap-3 border-t border-white/5 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={handleReset}
          className="cursor-pointer text-xs font-black uppercase tracking-[0.12em] text-white/50 transition hover:text-white"
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

interface ErrorBodyProps {
  onRetry: () => void;
  onClose: () => void;
}

const ErrorBody: React.FC<ErrorBodyProps> = ({ onRetry, onClose }) => (
  <div className="flex flex-col gap-4 p-6 text-center">
    <h3 className="text-base font-black text-white">Seçenekler yüklenemedi</h3>
    <p className="text-sm font-semibold text-white/60">
      Hesaplama yöntemi ve mezhep seçenekleri alınırken bir sorun oluştu. Lütfen
      tekrar dene.
    </p>
    <div className="flex justify-center gap-2 pt-2">
      <Button type="button" variant="ghost" size="sm" onClick={onClose}>
        Kapat
      </Button>
      <Button type="button" size="sm" onClick={onRetry}>
        Tekrar dene
      </Button>
    </div>
  </div>
);

export const WorshipSettingsModal: React.FC<WorshipSettingsModalProps> = ({
  isOpen,
  onClose,
  activeMethod,
  activeMadhab,
  onSave,
}) => {
  const { data, isError, refetch } = useWorshipOptions({ enabled: isOpen });

  const renderBody = () => {
    if (isError) {
      return <ErrorBody onRetry={() => refetch()} onClose={onClose} />;
    }
    if (!data) return null;

    const resolvedMethod = activeMethod ?? data.defaults.method;
    const resolvedMadhab = activeMadhab ?? data.defaults.madhab;

    return (
      <SettingsForm
        options={data}
        activeMethod={resolvedMethod}
        activeMadhab={resolvedMadhab}
        onSave={onSave}
        onClose={onClose}
      />
    );
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="xl"
      header={
        <h2 className="text-lg font-extrabold tracking-wide text-white">
          Ayarları Değiştir
        </h2>
      }
    >
      {renderBody()}
    </Dialog>
  );
};
