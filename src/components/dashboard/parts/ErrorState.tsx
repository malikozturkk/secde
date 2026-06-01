"use client";

import React from "react";
import { Button } from "@/src/components/ui/Button";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const DashboardError: React.FC<ErrorStateProps> = ({
  message,
  onRetry,
}) => {
  return (
    <div
      role="alert"
      className="mx-auto my-12 flex max-w-[420px] items-center gap-3.5 rounded-3xl border-[1.5px] border-dashed border-white/[0.12] bg-[#1C2E35] p-6 text-left"
    >
      <div className="h-[72px] w-[72px] shrink-0" aria-hidden="true" />
      <div>
        <div className="text-base font-black tracking-[-0.01em] text-white">
          Bir şeyler ters gitti
        </div>
        <div className="mt-1 text-[13px] font-bold leading-snug text-white/55">
          {message ?? "Veriler şu an alınamadı. Lütfen birazdan tekrar dene."}
        </div>
        {onRetry && (
          <div className="mt-4">
            <Button variant="primary" size="sm" onClick={onRetry}>
              Tekrar dene
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
