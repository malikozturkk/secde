import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

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
    <section className="rounded-3xl border border-white/[0.06] bg-[#1C2E35] p-5">
      <h2 className="text-[17px] font-black leading-tight text-white">
        {title}
      </h2>
      <ul className="mt-3 grid list-none grid-cols-1 gap-2 p-0 sm:grid-cols-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="flex h-full items-start justify-between gap-2 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 transition-colors hover:border-[rgba(37,180,154,0.35)] hover:bg-white/[0.05]"
            >
              <span>
                <span className="block text-[14px] font-extrabold text-white">
                  {link.label}
                </span>
                {link.description && (
                  <span className="mt-0.5 block text-[12px] leading-snug text-white/50">
                    {link.description}
                  </span>
                )}
              </span>
              <ArrowUpRight
                size={15}
                className="mt-0.5 shrink-0 text-white/30"
                aria-hidden
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
