"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { X, ChevronDown, ChevronUp, Shield } from "lucide-react";
import { useCookieConsentContext } from "@/src/providers/CookieConsentProvider";
import type { CookiePreferences } from "@/src/hooks/useCookieConsent";

const CATEGORIES = [
  {
    key: "essential" as const,
    label: "Zorunlu Çerezler",
    description:
      "Oturum yönetimi (auth-token), güvenlik ve çerez tercihinizin saklanması için gereklidir. Devre dışı bırakılamaz. NamazGo analitik veya pazarlama çerezi kullanmaz.",
    locked: true,
  },
  {
    key: "personalization" as const,
    label: "Kişiselleştirme (Yerel Kayıtlar)",
    description:
      "Zikirmatik sayacı ve seri bildirimi gibi araç tercihlerinizin tarayıcınızda (localStorage) hatırlanması için kullanılır. Bu veriler sunucuya gönderilmez.",
    locked: false,
  },
];

export default function CookieBanner() {
  const {
    showBanner,
    showDetails,
    preferences,
    acceptAll,
    rejectAll,
    savePreferences,
    openDetails,
    closeDetails,
  } = useCookieConsentContext();

  const [localPrefs, setLocalPrefs] = useState<CookiePreferences>(preferences);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const el = barRef.current;
    if (!el) {
      root.style.removeProperty("--cookie-banner-offset");
      return;
    }
    const sync = () =>
      root.style.setProperty("--cookie-banner-offset", `${el.offsetHeight}px`);
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => {
      ro.disconnect();
      root.style.removeProperty("--cookie-banner-offset");
    };
  });

  useEffect(() => {
    setLocalPrefs(preferences);
  }, [preferences]);

  if (!showBanner && !showDetails) return null;

  const handleToggle = (key: keyof CookiePreferences) => {
    if (key === "essential") return;
    setLocalPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    savePreferences(localPrefs);
  };

  if (showDetails) {
    return (
      <div className="fixed inset-0 z-[var(--z-modal)] flex items-end sm:items-center justify-center">
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={closeDetails}
        />

        <div className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto bg-[#0d1b1e] border border-[var(--ng-edge)] rounded-t-2xl sm:rounded-[var(--ng-radius)] shadow-2xl">
          <div className="sticky top-0 z-10 bg-[#0d1b1e] border-b border-[var(--ng-edge)] px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield size={18} className="text-[var(--ng-green)]" />
              <h2 className="text-lg font-bold text-white">Çerez Tercihleri</h2>
            </div>
            <button
              onClick={closeDetails}
              className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-[var(--ng-text-3)]"
              aria-label="Kapat"
            >
              <X size={18} />
            </button>
          </div>

          <div className="px-6 py-4 space-y-3">
            <p className="text-sm text-[var(--ng-text-3)] leading-relaxed">
              Hangi çerez kategorilerinin kullanılacağını aşağıdan
              belirleyebilirsiniz. Detaylı bilgi için{" "}
              <Link
                href="/privacy#cerezler"
                className="text-[var(--ng-green)] underline underline-offset-2"
              >
                Aydınlatma Metnimizi
              </Link>{" "}
              inceleyebilirsiniz.
            </p>

            {CATEGORIES.map((cat) => (
              <div
                key={cat.key}
                className="border border-[var(--ng-edge)] rounded-xl overflow-hidden"
              >
                <div
                  className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-white/[0.03] transition-colors"
                  onClick={() =>
                    setExpandedCategory(
                      expandedCategory === cat.key ? null : cat.key
                    )
                  }
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {expandedCategory === cat.key ? (
                      <ChevronUp
                        size={16}
                        className="text-[var(--ng-text-3)] shrink-0"
                      />
                    ) : (
                      <ChevronDown
                        size={16}
                        className="text-[var(--ng-text-3)] shrink-0"
                      />
                    )}
                    <span className="text-sm font-semibold text-white">
                      {cat.label}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggle(cat.key);
                    }}
                    disabled={cat.locked}
                    className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${
                      cat.locked
                        ? "bg-[var(--ng-green)] opacity-60 cursor-not-allowed"
                        : localPrefs[cat.key]
                        ? "bg-[var(--ng-green)]"
                        : "bg-white/15"
                    }`}
                    aria-label={`${cat.label} ${
                      localPrefs[cat.key] ? "açık" : "kapalı"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                        localPrefs[cat.key] ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {expandedCategory === cat.key && (
                  <div className="px-4 pb-3 pt-0">
                    <p className="text-xs text-[var(--ng-text-3)] leading-relaxed pl-7">
                      {cat.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="sticky bottom-0 bg-[#0d1b1e] border-t border-[var(--ng-edge)] px-6 py-4 flex gap-3">
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2.5 text-sm font-semibold text-white border border-[var(--ng-edge)] rounded-xl hover:bg-white/5 transition-colors"
            >
              Seçimleri Onayla
            </button>
            <button
              onClick={acceptAll}
              className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-[var(--ng-green)] rounded-xl hover:brightness-110 transition-all"
            >
              Tümünü Kaydet
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={barRef}
      className="fixed bottom-0 left-0 right-0 z-[var(--z-cookie-banner)] p-4 sm:p-6"
    >
      <div className="max-w-2xl mx-auto bg-[#0d1b1e] border border-[var(--ng-edge)] rounded-[var(--ng-radius)] shadow-2xl overflow-hidden">
        <div className="px-5 py-4 sm:px-6 sm:py-5">
          <div className="flex items-start gap-3 mb-4">
            <Shield
              size={20}
              className="text-[var(--ng-green)] shrink-0 mt-0.5"
            />
            <div>
              <h3 className="text-sm font-bold text-white mb-1">
                Çerez Kullanımı
              </h3>
              <p className="text-xs text-[var(--ng-text-3)] leading-relaxed">
                NamazGo, hizmetin çalışması için zorunlu çerezler ile araç
                tercihlerinizi hatırlayan yerel kayıtlar kullanır; analitik veya
                pazarlama çerezi kullanmaz. Detaylar için{" "}
                <Link
                  href="/privacy#cerezler"
                  className="text-[var(--ng-green)] underline underline-offset-2"
                >
                  Aydınlatma Metnimizi
                </Link>{" "}
                inceleyebilirsiniz.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button
              onClick={acceptAll}
              className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-[var(--ng-green)] rounded-xl hover:brightness-110 transition-all"
            >
              Kabul Et
            </button>
            <button
              onClick={openDetails}
              className="flex-1 px-4 py-2.5 text-sm font-semibold text-white border border-[var(--ng-edge)] rounded-xl hover:bg-white/5 transition-colors"
            >
              Tercihler
            </button>
            <button
              onClick={rejectAll}
              className="flex-1 px-4 py-2.5 text-sm font-semibold text-[var(--ng-text-3)] hover:text-white transition-colors"
            >
              Reddet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
