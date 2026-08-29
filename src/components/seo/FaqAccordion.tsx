import type { FaqEntry } from "@/src/lib/jsonld";

export function FaqAccordion({ items }: { items: readonly FaqEntry[] }) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <details
          key={item.question}
          className="group overflow-hidden rounded-2xl border border-white/[0.07] bg-[#1C2E35] transition-colors hover:border-white/15 open:border-[rgba(37,180,154,0.35)]"
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-3 p-4 text-[15px] font-extrabold leading-snug text-white [&::-webkit-details-marker]:hidden">
            <h3 className="m-0 text-[15px] font-extrabold leading-snug">
              {item.question}
            </h3>
            <span
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-[18px] leading-none text-[var(--color-primary-light)] transition-transform duration-200 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="px-4 pb-4 text-[14px] leading-relaxed text-white/70">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
