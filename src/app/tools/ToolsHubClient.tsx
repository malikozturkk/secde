"use client";

import React, { useMemo } from "react";
import { SeoPageShell } from "@/src/components/seo/SeoPageShell";
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

const BREADCRUMBS = [
  { name: "Ana sayfa", path: "/" },
  { name: "Araçlar", path: "/tools" },
];

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
    <SeoPageShell
      publicShell
      breadcrumbs={BREADCRUMBS}
      eyebrow={TOOLS_PAGE_TITLE}
      title="İbadetinde işine yarayacak yardımcılar"
      lede={TOOLS_PAGE_SUBTITLE}
    >
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
    </SeoPageShell>
  );
};
