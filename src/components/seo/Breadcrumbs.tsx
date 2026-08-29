import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { BreadcrumbEntry } from "@/src/lib/jsonld";

export function Breadcrumbs({ items }: { items: readonly BreadcrumbEntry[] }) {
  return (
    <nav aria-label="Sayfa yolu" className="px-1">
      <ol className="flex flex-wrap items-center gap-1 p-0 text-[12px] font-bold text-white/45">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1">
              {index > 0 && (
                <ChevronRight size={12} className="text-white/25" aria-hidden />
              )}
              {isLast ? (
                <span aria-current="page" className="text-white/70">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className="transition-colors hover:text-white"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
