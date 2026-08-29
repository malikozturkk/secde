"use client";

import Link from "next/link";
import { Download } from "lucide-react";
import AppLayout from "@/src/components/layout/AppLayout";
import SettingsRightPanel from "@/src/components/settings/SettingsRightPanel";
import { Button } from "@/src/components/ui/Button";
import { useExportMyData } from "@/src/hooks/users/useExportMyData";
import { getApiErrorMessage } from "@/src/lib/api-error";
import { TEXT } from "@/src/constants/surface";
import { cn } from "@/src/lib/utils";

export default function DataSettingsClient() {
  const {
    mutate: exportData,
    isPending: isExporting,
    isSuccess: isExported,
    error: exportError,
  } = useExportMyData();

  return (
    <AppLayout rightPanel={<SettingsRightPanel active="data" />}>
      <h1 className={cn(TEXT.h2, "mb-2")}>
        Verilerim
      </h1>
      <p className="mb-6 max-w-[560px] text-sm font-medium leading-relaxed text-[var(--ng-text-3)]">
        6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamındaki haklarını
        buradan kullanabilirsin. Ayrıntılar için{" "}
        <Link
          href="/privacy"
          className="font-bold text-[#4fc3f7] underline underline-offset-2"
        >
          Aydınlatma Metni
        </Link>
        &apos;ne göz atabilirsin.
      </p>

      <div className="flex flex-col gap-4">
        <section className="rounded-[var(--ng-radius-lg)] border-[length:var(--ng-stroke)] border-[var(--ng-edge)] bg-[var(--ng-surface)] p-5">
          <div className="mb-2 flex items-center gap-2.5">
            <Download size={18} className="text-[#4fc3f7]" />
            <h2 className="font-sans text-base font-extrabold text-white">
              Verilerimin kopyasını indir
            </h2>
          </div>
          <p className="mb-4 text-sm font-medium leading-relaxed text-[var(--ng-text-3)]">
            Hesabın, profilin, rıza kayıtların, ibadet ve quiz geçmişin,
            sosyal bağlantıların ve bildirim tercihlerin tek bir JSON dosyasında
            iner. Dosya yalnızca senin tarayıcında oluşturulur; hiçbir yerde
            saklanmaz.
          </p>
          <p className="mb-4 text-[12px] font-semibold text-[var(--ng-text-3)]">
            Parola özetin, oturum anahtarların, doğrulama kodların ve bildirim
            abonelik anahtarların güvenlik materyalidir ve dosyaya dahil
            edilmez.
          </p>
          <Button
            onClick={() => exportData()}
            disabled={isExporting}
            size="lg"
            className="w-full sm:w-auto"
          >
            {isExporting ? "HAZIRLANIYOR..." : "JSON OLARAK İNDİR"}
          </Button>
          {isExported && (
            <p className="mt-3 text-sm font-bold text-[var(--ng-green)]">
              Dosya indirildi.
            </p>
          )}
          {exportError && (
            <p className="mt-3 text-sm font-bold text-red-400">
              {getApiErrorMessage(exportError)}
            </p>
          )}
        </section>

        <section className="rounded-[var(--ng-radius-lg)] border-[length:var(--ng-stroke)] border-[var(--ng-edge)] bg-[var(--ng-surface)] p-5">
          <h2 className="mb-2 font-sans text-base font-extrabold text-white">
            Hesabımı sil ve rızamı geri çek
          </h2>
          <p className="text-sm font-medium leading-relaxed text-[var(--ng-text-3)]">
            Mezhep tercihin ve ibadet kayıtların KVKK m.6 anlamında özel
            nitelikli kişisel veridir ve yalnızca açık rızanla işlenir. Bu
            veriler olmadan NamazGo hizmetini sunmak mümkün olmadığı için
            rızanı geri çekmek hesabını silmek anlamına gelir. Silme işlemi{" "}
            <Link
              href="/settings/profile"
              className="font-bold text-[#4fc3f7] underline underline-offset-2"
            >
              Profil ayarları
            </Link>{" "}
            sayfasındadır; hesabınla birlikte tüm verilerin kalıcı olarak
            silinir.
          </p>
        </section>
      </div>
    </AppLayout>
  );
}
