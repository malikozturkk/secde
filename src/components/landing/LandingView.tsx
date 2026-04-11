"use client";

import Link from "next/link";
import { Button } from "@/src/components/ui/Button";
import { AllCharacters } from "@/src/icons/tsx/characters";

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
          <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
            <div className="absolute inset-[-22px] rounded-full border-[1.5px] border-[#25B49A] animate-ring-outer pointer-events-none" />
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
            <span className="absolute bottom-4 -right-4 text-sm animate-star-3 text-[#25B49A]">
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
