import Link from "next/link";
import { Button } from "../ui/Button";
import { ACCENT, TEXT } from "@/src/constants/surface";
import { cn } from "@/src/lib/utils";

export function SeoCta({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden p-5 text-center sm:p-7",
        ACCENT.green.tintedCard
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(23,217,160,0.26),transparent_70%)] blur-xl"
      />
      <div className="relative flex flex-col items-center">
        <span
          className={cn(
            "inline-flex items-center rounded-full px-3 py-1.5",
            ACCENT.green.chip,
            TEXT.eyebrow
          )}
        >
          NAMAZGO
        </span>
        <h2 className={cn("mt-3.5", TEXT.h2)}>{title}</h2>
        <p className={cn("mt-3 max-w-[52ch]", TEXT.lede)}>{description}</p>
        <div className="mt-5 flex flex-wrap justify-center gap-2.5">
          <Link href="/register">
            <Button size="lg">Ücretsiz başla</Button>
          </Link>
          <Link href="/learn">
            <Button size="lg" variant="ghost">
              Rehberleri gör
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
