"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";
import { Card } from "@/src/components/ui/Card";
import { Button } from "@/src/components/ui/Button";
import { SkeletonBox } from "@/src/components/ui/SkeletonBox";

interface StatsErrorProps {
  message?: string;
  onRetry?: () => void;
}

export const StatsError: React.FC<StatsErrorProps> = ({ message, onRetry }) => (
  <Card
    tone="plain"
    padding="lg"
    role="alert"
    className="border-dashed border-white/[0.12]"
  >
    <div className="flex items-center gap-3.5">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[var(--ng-radius)] bg-[rgba(239,68,68,0.12)] text-[var(--ng-rose)]">
        <AlertTriangle size={22} strokeWidth={2.4} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-black text-white">
          İstatistikler yüklenemedi
        </div>
        <div className="mt-0.5 text-[13px] font-bold leading-snug text-[var(--ng-text-2)]">
          {message ?? "Veriler şu an alınamadı. Birazdan tekrar dene."}
        </div>
      </div>
      {onRetry && (
        <Button variant="primary" size="sm" onClick={onRetry}>
          Tekrar dene
        </Button>
      )}
    </div>
  </Card>
);

export const StatsGridSkeleton: React.FC<{ count?: number }> = ({
  count = 4,
}) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2" aria-hidden="true">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonBox key={i} className="h-[148px] w-full" />
    ))}
  </div>
);
