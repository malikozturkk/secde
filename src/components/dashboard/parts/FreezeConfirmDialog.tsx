"use client";

import React, { memo } from "react";
import { Dialog } from "@/src/components/ui/Dialog";
import { Button } from "@/src/components/ui/Button";
import { CharacterIllustration } from "./CharacterIllustration";

interface FreezeConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  freezesRemaining: number;
  currentStreak: number;
  recoveredStreak?: number;
  isPending: boolean;
  errorMessage?: string | null;
}

const FreezeConfirmDialogComponent: React.FC<FreezeConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  freezesRemaining,
  currentStreak,
  recoveredStreak = 0,
  isPending,
  errorMessage,
}) => (
  <Dialog isOpen={isOpen} onClose={onClose} maxWidth="sm">
    <div className="flex flex-col items-center gap-3 text-center p-8">
      <div className="h-[128px] w-[104px] animate-[floatBounce_3.2s_ease-in-out_infinite]">
        <CharacterIllustration character="ay" shadow="none" />
      </div>

      <h2 className="m-0 text-xl font-black tracking-[-0.01em] text-white">
        Seriyi dondur
      </h2>

      {recoveredStreak > 0 ? (
        <p className="m-0 max-w-[36ch] text-[13px] font-bold leading-snug text-[var(--ng-text-2)]">
          Kaybettiğin{" "}
          <strong className="font-black text-[#7DD3FC]">
            {recoveredStreak} günlük
          </strong>{" "}
          serin geri gelir ve bugünkü serinle birleşerek{" "}
          <strong className="font-black text-[#7DD3FC]">
            {recoveredStreak + currentStreak} gün
          </strong>{" "}
          olur. Bir dondurma hakkın harcanır.
        </p>
      ) : (
        <p className="m-0 max-w-[36ch] text-[13px] font-bold leading-snug text-[var(--ng-text-2)]">
          Kaçırdığın günler korunur ve{" "}
          <strong className="font-black text-[#7DD3FC]">
            {currentStreak} günlük
          </strong>{" "}
          serin devam eder. Bir dondurma hakkın harcanır.
        </p>
      )}

      <div className="mt-1 rounded-[var(--ng-radius)] border border-[rgba(44,200,255,0.30)] bg-[rgba(44,200,255,0.10)] px-3.5 py-2 text-[11px] font-black uppercase tracking-[0.08em] text-[#7DD3FC]">
        {freezesRemaining} hakkın kaldı
      </div>

      {errorMessage && (
        <div
          role="alert"
          className="mt-1 w-full rounded-[var(--ng-radius)] border border-[rgba(239,68,68,0.30)] bg-[rgba(239,68,68,0.10)] px-3 py-2.5 text-[12px] font-black text-rose-300"
        >
          {errorMessage}
        </div>
      )}

      <div className="mt-2 flex w-full flex-col gap-4">
        <Button
          variant="primary"
          size="md"
          className="w-full"
          onClick={onConfirm}
          disabled={isPending || freezesRemaining <= 0}
        >
          {isPending ? "Donduruluyor…" : "Evet, dondur"}
        </Button>
        <Button
          variant="ghost"
          size="md"
          className="w-full"
          onClick={onClose}
          disabled={isPending}
        >
          Vazgeç
        </Button>
      </div>
    </div>
  </Dialog>
);

export const FreezeConfirmDialog = memo(FreezeConfirmDialogComponent);
