import type { Dua } from "@/src/constants/duas";
import { ELEVATION, TEXT } from "@/src/constants/surface";
import { cn } from "@/src/lib/utils";

export function DuaText({ dua }: { dua: Dua }) {
  return (
    <section className={cn(ELEVATION.surface, "p-5 sm:p-6")}>
      <h2 className={TEXT.h3}>
        {dua.shortTitle} — Arapçası, okunuşu ve anlamı
      </h2>

      <ol className="mt-4 flex list-none flex-col gap-3 p-0">
        {dua.arabic.map((line, index) => (
          <li
            key={line}
            className="relative rounded-[var(--ng-radius)] border-[length:var(--ng-stroke)] border-[var(--ng-edge)] bg-[var(--ng-surface-high)] p-4 pt-5"
          >
            <span
              aria-hidden="true"
              className="absolute -top-3 left-4 grid h-7 min-w-7 place-items-center rounded-full border-[length:var(--ng-stroke)] border-[var(--ng-edge-strong)] bg-[var(--ng-surface-deep)] px-2 font-display text-[13px] tabular-nums text-[var(--ng-green)]"
            >
              {index + 1}
            </span>
            <p
              dir="rtl"
              lang="ar"
              className="text-right text-[23px] leading-[2] text-white"
            >
              {line}
            </p>
            <p className="mt-3 text-[14px] font-black leading-relaxed text-[var(--ng-green)]">
              {dua.transliteration[index]}
            </p>
            <p className={cn("mt-1.5", TEXT.body)}>{dua.meaning[index]}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
