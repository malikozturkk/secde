"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/src/components/ui/Button";

export default function PublicTopBar() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-white/[0.06] bg-[#070f12]/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          className="text-xl text-white transition-opacity hover:opacity-80"
          style={{ fontFamily: "var(--font-display)", letterSpacing: "0.5px" }}
        >
          NamazGo
        </Link>

        <nav className="flex items-center gap-2">
          <Link
            href="/prayer-times"
            className="hidden px-2.5 py-2 text-[13px] font-extrabold text-white/55 transition-colors hover:text-white lg:block"
          >
            Vakitler
          </Link>
          <Link
            href="/learn"
            className="hidden px-2.5 py-2 text-[13px] font-extrabold text-white/55 transition-colors hover:text-white sm:block"
          >
            Rehberler
          </Link>
          <Link
            href="/duas"
            className="hidden px-2.5 py-2 text-[13px] font-extrabold text-white/55 transition-colors hover:text-white lg:block"
          >
            Dualar
          </Link>
          <Link
            href="/tools"
            className="hidden px-2.5 py-2 text-[13px] font-extrabold text-white/55 transition-colors hover:text-white sm:block"
          >
            Araçlar
          </Link>
          <Link
            href="/faq"
            className="hidden px-2.5 py-2 text-[13px] font-extrabold text-white/55 transition-colors hover:text-white lg:block"
          >
            S.S.S.
          </Link>
          <Link href="/login">
            <Button variant="ghost" size="sm">
              GİRİŞ
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="primary" size="sm">
              KAYIT OL
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
