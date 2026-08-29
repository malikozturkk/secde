import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ELEVATION, LINK_CARD, TEXT } from "@/src/constants/surface";
import { cn } from "@/src/lib/utils";

export interface RelatedLink {
  href: string;
  label: string;
  description?: string;
}

export function RelatedLinks({
  title,
  links,
}: {
  title: string;
  links: readonly RelatedLink[];
}) {
  return (
    <section className={cn(ELEVATION.surface, "p-5 sm:p-6")}>
      <h2 className={TEXT.h3}>{title}</h2>
      <ul className="mt-4 grid list-none grid-cols-1 gap-2.5 p-0 sm:grid-cols-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={cn(
                LINK_CARD,
                "group flex h-full items-start justify-between gap-2 px-4 py-3.5"
              )}
            >
              <span>
                <span className="block text-[15px] font-black leading-snug text-white">
                  {link.label}
                </span>
                {link.description && (
                  <span className={cn("mt-1 block", TEXT.muted)}>
                    {link.description}
                  </span>
                )}
              </span>
              <ArrowUpRight
                size={16}
                strokeWidth={2.5}
                aria-hidden
                className="mt-0.5 shrink-0 text-[var(--ng-text-3)] transition-colors group-hover:text-[var(--ng-green)]"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
