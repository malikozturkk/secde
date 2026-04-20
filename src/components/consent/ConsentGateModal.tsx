"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/src/components/ui/Button";
import { LegalLink } from "./LegalLink";
import { CONSENT_LABELS } from "@/src/constants/consent";
import { useAcceptConsent } from "@/src/hooks/consent/useAcceptConsent";
import { useLogout } from "@/src/hooks/auth/useLogout";
import type { ConsentStatusItem } from "@/src/types";

interface ConsentGateModalProps {
  items: ConsentStatusItem[];
}

export function ConsentGateModal({ items }: ConsentGateModalProps) {
  const acceptMutation = useAcceptConsent();
  const logout = useLogout();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, []);

  const acceptAll = async () => {
    setError(null);
    try {
      for (const item of items) {
        await acceptMutation.mutateAsync({
          type: item.type,
          version: item.currentVersion,
        });
      }
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? "Kabul işlemi başarısız oldu. Lütfen tekrar deneyin."
          : "Bir hata oluştu. Lütfen tekrar deneyin."
      );
    }
  };

  const isPending = acceptMutation.isPending;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="consent-gate-title"
    >
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-[2px]"
        onClick={(e) => e.preventDefault()}
        aria-hidden="true"
      />

      <div
        className="relative w-full max-w-md bg-[#070F12] border-2 border-[rgba(255,255,255,0.15)] rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        onPointerDownCapture={(e) => e.stopPropagation()}
      >
        <div className="px-6 pt-6 pb-2">
          <h2
            id="consent-gate-title"
            className="text-white text-xl font-extrabold"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Kullanım koşullarımız güncellendi
          </h2>
          <p
            className="mt-2 text-[rgba(255,255,255,0.6)] text-[14px] leading-relaxed"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Devam edebilmen için aşağıdaki güncellenmiş metinleri kabul etmen
            gerekiyor.
          </p>
        </div>

        <ul className="px-6 py-4 flex flex-col gap-2">
          {items.map((item) => (
            <li
              key={item.type}
              className="flex items-center justify-between gap-3 bg-[#1a2b2a] border border-[#2a3d3b] rounded-2xl px-4 py-3"
            >
              <div className="flex flex-col">
                <span
                  className="text-white text-[14px] font-semibold"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  {CONSENT_LABELS[item.type]}
                </span>
                <span
                  className="text-[rgba(255,255,255,0.45)] text-[12px]"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  v{item.acceptedVersion ?? "—"} → v{item.currentVersion}
                </span>
              </div>
              <LegalLink
                type={item.type}
                version={item.currentVersion}
                className="text-[#25B49A] text-[13px] font-bold underline hover:text-[#4FC3F7]"
              >
                Oku
              </LegalLink>
            </li>
          ))}
        </ul>

        {error && (
          <div className="mx-6 mb-2 bg-red-500/10 border border-red-500/30 rounded-2xl px-4 py-3">
            <span
              className="text-red-400 text-sm font-semibold"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              {error}
            </span>
          </div>
        )}

        <div className="px-6 pb-6 pt-2 flex gap-3">
          <Button
            type="button"
            variant="primary"
            size="sm"
            className="w-full"
            disabled={isPending}
            onClick={acceptAll}
          >
            {isPending ? "Kaydediliyor..." : "Hepsini kabul et"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="w-full"
            disabled={isPending || logout.isPending}
            onClick={() => logout.mutate()}
          >
            Çıkış yap
          </Button>
        </div>
      </div>
    </div>
  );
}
