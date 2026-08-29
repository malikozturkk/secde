import Link from "next/link";
import { Button } from "../ui/Button";

export function SeoCta({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-[rgba(37,180,154,0.30)] bg-gradient-to-br from-[rgba(37,180,154,0.18)] via-[#1C2E35] to-[#1C2E35] to-70% p-5 sm:p-6">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full bg-[radial-gradient(closest-side,rgba(37,180,154,0.22),transparent_70%)] blur-xl"
      />
      <div className="relative">
        <h2 className="text-[19px] font-black leading-tight text-white">
          {title}
        </h2>
        <p className="mt-2 text-[14px] leading-relaxed text-white/70">
          {description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/register"
          >
            <Button size="md">
              Ücretsiz başla
          </Button>
          </Link>
          <Link
            href="/learn"
          >
            <Button size="md" variant="ghost">
              Rehberleri gör
          </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
