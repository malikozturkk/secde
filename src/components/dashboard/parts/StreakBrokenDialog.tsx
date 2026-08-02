"use client";

import React, { memo } from "react";
import { Dialog } from "@/src/components/ui/Dialog";
import { Button } from "@/src/components/ui/Button";
import { CharacterIllustration } from "./CharacterIllustration";
import { cn } from "@/src/lib/utils";

interface StreakBrokenDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onRecover: () => void;
  lostStreak: number;
  daysSinceLastActive: number;
  freezesAvailable: number;
  canFreezeNow: boolean;
  freezeWindowExpired: boolean;
  isPending: boolean;
  errorMessage?: string | null;
}

const StreakBrokenDialogComponent: React.FC<StreakBrokenDialogProps> = ({
  isOpen,
  onClose,
  onRecover,
  lostStreak,
  daysSinceLastActive,
  freezesAvailable,
  canFreezeNow,
  freezeWindowExpired,
  isPending,
  errorMessage,
}) => {
  const reason = freezeWindowExpired
    ? "Dondurma için geç kaldın, bu seri geri alınamıyor."
    : freezesAvailable <= 0
    ? "Dondurma hakkın kalmadı, bu seri geri alınamıyor."
    : null;

  return (
    <Dialog isOpen={isOpen} onClose={onClose} maxWidth="sm">
      <div className="flex flex-col items-center gap-3 text-center p-8">
        <div className="h-[128px] w-[104px]">
          <CharacterIllustration character="nura_sitting" shadow="none" />
        </div>

        <h2 className="m-0 text-xl font-black tracking-[-0.01em] text-white">
          Serini kaybettin!
        </h2>

        <p className="m-0 max-w-[36ch] text-[13px] font-bold leading-snug text-white/55">
          {daysSinceLastActive > 2
            ? `${daysSinceLastActive - 1} gündür namaz işaretlemedin ve `
            : "Dün hiç namaz işaretlemedin ve "}
          <strong className="font-black text-[#FF9600]">
            {lostStreak} günlük
          </strong>{" "}
          serin sıfırlandı.
          {canFreezeNow
            ? " Bir dondurma hakkı harcayarak serini geri alabilirsin."
            : ""}
        </p>

        <div
          className={cn(
            "mt-1 rounded-2xl border px-3.5 py-2 text-[11px] font-black uppercase tracking-[0.08em]",
            canFreezeNow
              ? "border-[rgba(79,195,247,0.30)] bg-[rgba(79,195,247,0.10)] text-[#7DD3FC]"
              : "border-[rgba(255,150,0,0.30)] bg-[rgba(255,150,0,0.10)] text-[#FFB74D]"
          )}
        >
          {canFreezeNow ? `${freezesAvailable} dondurma hakkın var` : reason}
        </div>

        {errorMessage && (
          <div
            role="alert"
            className="mt-1 w-full rounded-2xl border border-[rgba(239,68,68,0.30)] bg-[rgba(239,68,68,0.10)] px-3 py-2.5 text-[12px] font-black text-rose-300"
          >
            {errorMessage}
          </div>
        )}

        <div className="mt-2 flex w-full flex-col gap-4">
          {canFreezeNow && (
            <Button
              variant="primary"
              size="md"
              className="w-full"
              onClick={onRecover}
              disabled={isPending}
            >
              {isPending
                ? "Kurtarılıyor…"
                : `Serimi kurtar (${lostStreak} gün)`}
            </Button>
          )}
          <Button
            variant="ghost"
            size="md"
            className="w-full"
            onClick={onClose}
            disabled={isPending}
          >
            {canFreezeNow ? "Şimdi değil" : "Yeniden başla"}
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export const StreakBrokenDialog = memo(StreakBrokenDialogComponent);
