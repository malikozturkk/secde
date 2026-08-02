"use client";

import React, { useMemo } from "react";
import AppLayout from "@/src/components/layout/AppLayout";
import { SectionHead } from "@/src/components/dashboard/parts/SectionHead";
import { ToolCard } from "@/src/components/tools/ToolCard";
import { useAuthStore } from "@/src/store/auth.store";
import { useDhikrCounter } from "@/src/hooks/tools/useDhikrCounter";
import {
  TOOLS,
  TOOLS_PAGE_SUBTITLE,
  TOOLS_PAGE_TITLE,
} from "@/src/constants/tools";
import {
  buildQiblaReading,
  describeDirection,
  formatBearing,
} from "@/src/lib/qibla-utils";
import { matchTrCity } from "@/src/lib/geocode";
import { ToolId } from "@/src/types/enums/tools.enums";

export const ToolsHubClient: React.FC = () => {
  const { user } = useAuthStore();
  const dhikr = useDhikrCounter();

  const qiblaHint = useMemo(() => {
    const city = matchTrCity(user?.city);
    if (!city) return "Kâbe yönünü göster";
    const { bearing } = buildQiblaReading(city.latitude, city.longitude);
    return `${city.city} · ${formatBearing(bearing)} ${describeDirection(
      bearing
    )}`;
  }, [user?.city]);

  const hints: Record<ToolId, React.ReactNode> = {
    [ToolId.Qibla]: qiblaHint,
    [ToolId.Dhikr]:
      dhikr.completedRounds > 0
        ? `Bugün ${dhikr.completedRounds} tur · ${dhikr.preset.label}`
        : `${dhikr.preset.label} · hedef ${dhikr.preset.target}`,
    [ToolId.Zakat]: "Nisap ve zekât tutarını hesapla",
  };

  return (
    <AppLayout mainClassName="px-4 pb-10 pt-6 lg:pt-8">
      <div className="mx-auto flex w-full flex-col gap-4">
        <SectionHead title={TOOLS_PAGE_TITLE} subtitle={TOOLS_PAGE_SUBTITLE} />

        <ul className="flex list-none flex-col gap-3 p-0">
          {TOOLS.map((tool) => (
            <li key={tool.id}>
              <ToolCard tool={tool} hint={hints[tool.id]} />
            </li>
          ))}
        </ul>

        <p className="px-1 text-[11px] font-bold leading-relaxed text-white/35">
          Bu araçlar seri veya XP kazandırmaz; namaz takibinden bağımsız
          çalışırlar.
        </p>
      </div>
    </AppLayout>
  );
};
