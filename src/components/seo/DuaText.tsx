import type { Dua } from "@/src/constants/duas";

export function DuaText({ dua }: { dua: Dua }) {
  return (
    <section className="rounded-3xl border border-white/[0.06] bg-[#1C2E35] p-5">
      <h2 className="text-[17px] font-black leading-tight text-white">
        {dua.shortTitle} — Arapçası, okunuşu ve anlamı
      </h2>

      <ol className="mt-4 flex list-none flex-col gap-3 p-0">
        {dua.arabic.map((line, index) => (
          <li
            key={line}
            className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4"
          >
            <p
              dir="rtl"
              lang="ar"
              className="text-right text-[22px] leading-[2] text-white"
            >
              {line}
            </p>
            <p className="mt-3 text-[14px] font-extrabold leading-relaxed text-[var(--color-primary-light)]">
              {dua.transliteration[index]}
            </p>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/60">
              {dua.meaning[index]}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
