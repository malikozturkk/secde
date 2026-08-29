import type { ReactNode } from "react";
import AppLayout from "@/src/components/layout/AppLayout";
import { Breadcrumbs } from "@/src/components/seo/Breadcrumbs";
import { JsonLd } from "@/src/components/seo/JsonLd";
import { breadcrumbJsonLd, type BreadcrumbEntry } from "@/src/lib/jsonld";
import type { JsonLdObject } from "@/src/lib/jsonld";
import { ACCENT, SECTION_GAP, TEXT } from "@/src/constants/surface";
import { cn } from "@/src/lib/utils";

interface SeoPageShellProps {
  breadcrumbs: readonly BreadcrumbEntry[];
  title: string;
  lede: string;
  eyebrow?: string;
  jsonLd?: JsonLdObject | JsonLdObject[];
  publicShell?: boolean;
  className?: string;
  children: ReactNode;
}

export function SeoPageShell({
  breadcrumbs,
  title,
  lede,
  eyebrow,
  jsonLd,
  publicShell,
  className,
  children,
}: SeoPageShellProps) {
  const schemas = [
    breadcrumbJsonLd(breadcrumbs),
    ...(Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : []),
  ];

  return (
    <AppLayout
      forcePublicShell={publicShell}
      mainClassName="px-4 pb-16 pt-6 lg:pt-8"
    >
      <JsonLd data={schemas} />

      <div
        className={cn("mx-auto w-full max-w-[860px]", SECTION_GAP, className)}
      >
        <Breadcrumbs items={breadcrumbs} />

        <header className="px-1">
          {eyebrow && (
            <span
              className={cn(
                "mb-3.5 inline-flex items-center rounded-full px-3 py-1.5",
                ACCENT.green.chip,
                TEXT.eyebrow
              )}
            >
              {eyebrow}
            </span>
          )}
          <h1 className={TEXT.h1}>{title}</h1>
          <p className={cn("mt-3.5 max-w-[62ch]", TEXT.lede)}>{lede}</p>
        </header>

        {children}
      </div>
    </AppLayout>
  );
}
