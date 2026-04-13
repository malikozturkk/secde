"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

const LegalLayout: React.FC<LegalLayoutProps> = ({
  title,
  lastUpdated,
  children,
}) => {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-white font-sans">
      <header className="border-b border-[var(--color-border)]">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-white hover:border-[var(--color-primary-light)] transition-colors"
            aria-label="Ana sayfaya dön"
          >
            <ArrowLeft size={18} />
          </Link>
          <Link
            href="/"
            className="text-xl font-display text-white tracking-wider"
          >
            NamazGo
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{title}</h1>
          <p className="text-[var(--color-text-muted)] text-sm">
            Son güncelleme: {lastUpdated}
          </p>
        </div>

        <article className="legal-content space-y-8 text-[rgba(255,255,255,0.85)] leading-relaxed text-[15px]">
          {children}
        </article>
      </main>

      <footer className="border-t border-[var(--color-border)] mt-16">
        <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--color-text-muted)]">
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
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LegalLayout;
