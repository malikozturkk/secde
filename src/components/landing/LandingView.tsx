"use client";

import Link from "next/link";
import { Button } from "@/src/components/ui/Button";
import PrayerScene from "@/src/components/landing/PrayerScene";

export const LandingView = () => {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-white flex flex-col font-sans">
      <header className="container mx-auto px-6 py-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-3xl font-display text-white tracking-wider">
            NamazGo
          </span>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 overflow-hidden">
        <div className="w-full md:w-1/2 flex justify-center items-center order-1 md:order-1">
          <PrayerScene />
        </div>

        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-2 space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Namazı alışkanlığa dönüştürmenin en eğlenceli yolu!
            </h1>
          </div>

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

      <footer className="py-8"></footer>
    </div>
  );
};
