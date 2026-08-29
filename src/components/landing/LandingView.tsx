"use client";

import Link from "next/link";
import { Button } from "@/src/components/ui/Button";
import { AllCharacters } from "@/src/icons/tsx/characters";
import { CookiePreferencesLink } from "@/src/components/cookie/CookiePreferencesLink";
import { ACCENT, STAT_TILE, TEXT } from "@/src/constants/surface";
import { cn } from "@/src/lib/utils";

export const LandingView = () => {
  return (
    <div className="min-h-screen bg-[var(--ng-canvas)] text-white flex flex-col font-sans">
      <header className="container mx-auto px-6 py-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-3xl font-display text-white tracking-wider">
            NamazGo
          </span>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-6 pb-6 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 overflow-hidden">
        <div className="w-full md:w-1/2 flex justify-center items-center order-1 md:order-1">
          <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
            <div className="absolute inset-[-22px] rounded-full border-[1.5px] border-[var(--ng-green)] animate-ring-outer pointer-events-none" />
            <div className="absolute inset-[-12px] rounded-full border-[2.5px] border-violet-500 animate-ring-inner pointer-events-none" />
            <div className="animate-float-bounce">
              <AllCharacters width={500} height={500} />
            </div>
            <span className="absolute -top-5 right-8 animate-star-1 text-amber-400">
              ★
            </span>
            <span className="absolute top-2 -left-5 text-sm animate-star-2 text-violet-400">
              ★
            </span>
            <span className="absolute bottom-4 -right-4 text-sm animate-star-3 text-[var(--ng-green)]">
              ★
            </span>
            <span className="absolute -bottom-3 left-10 text-xs animate-star-4 text-pink-400">
              ★
            </span>
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-violet-500 text-white text-xs font-medium px-3 py-0.5 rounded-full animate-xp-badge">
              +120 XP
            </span>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-2 space-y-8">
          <div className="flex flex-col items-center gap-4 md:items-start">
            <span
              className={cn(
                "inline-flex items-center rounded-full px-3 py-1.5",
                ACCENT.green.chip,
                TEXT.eyebrow
              )}
            >
              GÜNLÜK SERİNİ BAŞLAT
            </span>
            <h1
              className={cn(
                TEXT.display,
                "text-[40px] leading-[1.02] sm:text-[52px] md:text-[58px]"
              )}
            >
              Namazı alışkanlığa dönüştürmenin en eğlenceli yolu!
            </h1>
            <p className={cn("max-w-[46ch]", TEXT.lede)}>
              Vakitleri işaretle, serini büyüt, kısa quizlerle öğren. Her gün bir
              adım — abartısız, oyun gibi.
            </p>
          </div>

          <dl className="grid w-full max-w-sm grid-cols-3 gap-2.5">
            <div className={STAT_TILE}>
              <dt className={TEXT.muted}>Vakit</dt>
              <dd className={cn(TEXT.num, "text-[22px]")}>5</dd>
            </div>
            <div className={STAT_TILE}>
              <dt className={TEXT.muted}>Rehber</dt>
              <dd className={cn(TEXT.num, "text-[22px]")}>8</dd>
            </div>
            <div className={STAT_TILE}>
              <dt className={TEXT.muted}>İl</dt>
              <dd className={cn(TEXT.num, "text-[22px]")}>81</dd>
            </div>
          </dl>

          <div className="flex flex-col w-full max-w-sm space-y-4">
            <Link href="/login" className="w-full">
              <Button
                variant="primary"
                size="lg"
                className="w-full py-5 text-xl"
              >
                Giriş Yap
              </Button>
            </Link>
            <Link href="/register" className="w-full">
              <Button variant="ghost" size="lg" className="w-full py-5 text-xl">
                Kayıt Ol
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <footer className="py-8 border-t border-[var(--ng-edge)]">
        <nav
          aria-label="İçerik sayfaları"
          className="container mx-auto px-6 pb-6 flex flex-wrap items-center justify-end gap-x-6 gap-y-2 text-sm text-[var(--ng-text-3)]"
        >
          <Link href="/prayer-times" className="hover:text-white transition-colors">
            Namaz Vakitleri
          </Link>
          <Link href="/learn" className="hover:text-white transition-colors">
            Namaz Rehberleri
          </Link>
          <Link href="/duas" className="hover:text-white transition-colors">
            Namaz Duaları
          </Link>
          <Link href="/tools" className="hover:text-white transition-colors">
            Araçlar
          </Link>
          <Link href="/faq" className="hover:text-white transition-colors">
            Sıkça Sorulan Sorular
          </Link>
        </nav>
        <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--ng-text-3)]">
          <span>
            © {new Date().getFullYear()} NamazGo. Tüm hakları saklıdır.
          </span>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-white transition-colors">
              Kullanım Şartları
            </Link>
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Gizlilik Politikası
            </Link>
            <Link href="/explicit-consent" className="hover:text-white transition-colors">
            Açık Rıza
            </Link>
            <CookiePreferencesLink />
          </div>
        </div>
      </footer>
    </div>
  );
};
