import type { ReactNode } from "react";
import AppLayout from "@/src/components/layout/AppLayout";
import { Breadcrumbs } from "@/src/components/seo/Breadcrumbs";
import { JsonLd } from "@/src/components/seo/JsonLd";
import { breadcrumbJsonLd, type BreadcrumbEntry } from "@/src/lib/jsonld";
import type { JsonLdObject } from "@/src/lib/jsonld";

interface SeoPageShellProps {
  breadcrumbs: readonly BreadcrumbEntry[];
  title: string;
  lede: string;
  eyebrow?: string;
  jsonLd?: JsonLdObject | JsonLdObject[];
  publicShell?: boolean;
  children: ReactNode;
}

export function SeoPageShell({
  breadcrumbs,
  title,
  lede,
  eyebrow,
  jsonLd,
  publicShell,
  children,
}: SeoPageShellProps) {
  const schemas = [
    breadcrumbJsonLd(breadcrumbs),
    ...(Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : []),
  ];

  return (
    <AppLayout forcePublicShell={publicShell} mainClassName="px-4 pb-16 pt-6 lg:pt-8">
      <JsonLd data={schemas} />

      <div className="mx-auto flex w-full max-w-[860px] flex-col gap-6">
        <Breadcrumbs items={breadcrumbs} />

        <header className="px-1">
          {eyebrow && (
            <p className="mb-2 text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-primary-light)]">
              {eyebrow}
            </p>
          )}
          <h1 className="text-[28px] font-black leading-[1.15] tracking-[-0.01em] text-white sm:text-[34px]">
            {title}
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-white/65">
            {lede}
          </p>
        </header>

        {children}
      </div>
    </AppLayout>
  );
}
