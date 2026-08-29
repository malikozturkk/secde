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
import { ELEVATION, TEXT } from "@/src/constants/surface";
import { cn } from "@/src/lib/utils";

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
      className="ng-calm"
      breadcrumbs={BREADCRUMBS}
      eyebrow={TOOLS_PAGE_TITLE}
      title="İbadetinde işine yarayacak yardımcılar"
      lede={TOOLS_PAGE_SUBTITLE}
    >
      <ul className="grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-3">
        {TOOLS.map((tool) => (
          <li key={tool.id} className="flex">
            <ToolCard tool={tool} hint={hints[tool.id]} />
          </li>
        ))}
      </ul>

      <section className={cn(ELEVATION.surface, "flex flex-col gap-1.5 p-4")}>
        <h2 className={cn(TEXT.eyebrow, "text-[var(--ng-text-3)]")}>
          NASIL ÇALIŞIR?
        </h2>
        <p className={TEXT.body}>
          Üç araç da tamamen tarayıcında çalışır: girdiğin rakamlar, seçtiğin
          şehir ve zikir sayacın sunucuya gönderilmez. Seri veya XP
          kazandırmazlar, namaz takibinden bağımsızdırlar.
        </p>
      </section>

    </SeoPageShell>
  );
};
