import type { FaqEntry } from "@/src/lib/jsonld";
import { TEXT } from "@/src/constants/surface";
import { cn } from "@/src/lib/utils";

export function FaqAccordion({ items }: { items: readonly FaqEntry[] }) {
  return (
    <div className="flex flex-col gap-2.5">
      {items.map((item, index) => (
        <details
          key={item.question}
          className={cn(
            "group overflow-hidden rounded-[var(--ng-radius)]",
            "border-[length:var(--ng-stroke)] border-[var(--ng-edge)] bg-[var(--ng-surface)]",
            "transition-colors duration-[var(--motion-fast)]",
            "hover:border-[var(--ng-edge-strong)]",
            "open:border-[var(--ng-green)] open:bg-[var(--ng-surface-high)]"
          )}
        >
          <summary className="flex cursor-pointer list-none items-start gap-3 p-4 [&::-webkit-details-marker]:hidden">
            <span
              aria-hidden="true"
              className={cn(
                "mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full",
                "border-[length:var(--ng-stroke)] border-[var(--ng-edge-strong)]",
                "font-display text-[13px] tabular-nums text-[var(--ng-text-3)]",
                "transition-colors duration-[var(--motion-fast)]",
                "group-open:border-[var(--ng-green)] group-open:bg-[rgba(23,217,160,0.18)] group-open:text-[var(--ng-green)]"
              )}
            >
              {index + 1}
            </span>
            <h3 className="m-0 flex-1 text-[15px] font-black leading-snug text-white sm:text-[16px]">
              {item.question}
            </h3>
            <span
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-[22px] font-black leading-none text-[var(--ng-green)] transition-transform duration-[var(--motion-fast)] ease-[var(--ease-out)] group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className={cn("px-4 pb-4 pl-[60px]", TEXT.body)}>
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
