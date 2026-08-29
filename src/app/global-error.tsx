"use client";

import { useEffect } from "react";
import { reportClientError } from "@/src/lib/error-reporter";
import { ClientErrorSource } from "@/src/types/enums/telemetry.enums";
import "./globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    reportClientError({
      message: error.message,
      source: ClientErrorSource.ReactRenderError,
      stack: error.stack,
      digest: error.digest,
    });
  }, [error]);

  return (
    <html lang="tr">
      <body>
        <main className="flex min-h-dvh flex-col items-center justify-center gap-5 px-6 py-16 text-center">
          <h1 className="m-0 text-2xl font-black tracking-[-0.01em] text-white">
            Bir şeyler ters gitti
          </h1>

          <p className="m-0 max-w-[42ch] text-sm font-bold leading-relaxed text-[var(--ng-text-2)]">
            Beklenmedik bir hata oluştu ve sayfa yüklenemedi. Hata ekibimize
            iletildi.
          </p>

          <button
            type="button"
            onClick={reset}
            className="mt-2 inline-flex items-center rounded-[var(--ng-radius)] bg-[var(--ng-green)] px-5 py-3 text-xs font-black uppercase tracking-[0.10em] text-white shadow-[0_4px_0_0_var(--ng-green-deep)] transition-transform duration-100 active:translate-y-[3px] active:shadow-[0_1px_0_0_var(--ng-green-deep)]"
          >
            Tekrar dene
          </button>
        </main>
      </body>
    </html>
  );
}
