import Link from "next/link";
import { createMetadata } from "@/src/lib/metadata";

export const metadata = createMetadata({
  title: "Sayfa Bulunamadı",
  description: "Aradığın sayfa taşınmış veya hiç var olmamış olabilir.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-5 px-6 py-16 text-center">
      <span
        aria-hidden="true"
        className="font-display text-[64px] leading-none tracking-[0.04em] text-[var(--color-secondary)] [text-shadow:0_4px_0_rgba(124,80,8,0.45)]"
      >
        404
      </span>

      <h1 className="m-0 text-2xl font-black tracking-[-0.01em] text-white">
        Bu sayfayı bulamadık
      </h1>

      <p className="m-0 max-w-[42ch] text-sm font-bold leading-relaxed text-white/55">
        Bağlantının süresi dolmuş ya da adres yanlış yazılmış olabilir. Şifre
        sıfırlama bağlantıları kısa süre sonra geçersiz olur — gerekiyorsa yeni
        bir tane iste.
      </p>

      <div className="mt-2 flex flex-wrap items-center justify-center gap-2.5">
        <Link
          href="/"
          className="inline-flex items-center rounded-2xl bg-[var(--color-primary)] px-5 py-3 text-xs font-black uppercase tracking-[0.10em] text-white shadow-[0_4px_0_0_var(--color-primary-dark)] transition-transform duration-100 active:translate-y-[3px] active:shadow-[0_1px_0_0_var(--color-primary-dark)]"
        >
          Ana sayfaya dön
        </Link>
        <Link
          href="/forgot-password"
          className="inline-flex items-center rounded-2xl border border-white/15 px-5 py-3 text-xs font-black uppercase tracking-[0.10em] text-white/75 transition-colors hover:text-white"
        >
          Yeni bağlantı iste
        </Link>
      </div>
    </main>
  );
}
