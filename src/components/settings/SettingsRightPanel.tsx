"use client";

import Link from "next/link";
import { useLogout } from "@/src/hooks/auth/useLogout";

type SettingsNavKey =
  | "preferences"
  | "profile"
  | "notifications"
  | "social"
  | "data"
  | "privacy";

interface SettingsRightPanelProps {
  active: SettingsNavKey;
}

const ACCOUNT_LINKS: ReadonlyArray<{
  key: SettingsNavKey;
  label: string;
  href?: string;
  comingSoon?: boolean;
}> = [
  { key: "preferences", label: "Tercihler", href: "/settings/account" },
  { key: "profile", label: "Profil", href: "/settings/profile" },
  { key: "notifications", label: "Bildirimler", comingSoon: true },
  { key: "data", label: "Verilerim", href: "/settings/data" },
  { key: "social", label: "Sosyal hesaplar", comingSoon: true },
  { key: "privacy", label: "Gizlilik Politikası", href: "/privacy" },
];

const baseItemClass =
  "py-3 px-6 text-[15px] font-bold cursor-pointer block no-underline transition-all text-left hover:bg-[var(--ng-surface-high)]";

const activeClass = "text-white bg-white/5 border-none";
const inactiveClass =
  "text-[var(--ng-text-2)] bg-transparent border-none";
const comingSoonClass =
  "text-[rgba(255,255,255,0.3)] bg-transparent border-none cursor-not-allowed hover:bg-transparent flex items-center justify-between gap-2";

const ComingSoonBadge = () => (
  <span className="rounded-full border border-white/15 px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.08em] text-[var(--ng-text-3)]">
    Yakında
  </span>
);

export default function SettingsRightPanel({
  active,
}: SettingsRightPanelProps) {
  const { mutate: logout } = useLogout();

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="border-2 border-[var(--ng-edge-strong)] rounded-[var(--ng-radius)] flex flex-col py-2 overflow-hidden">
        <div className="py-2 px-6 text-xl font-extrabold text-white">Hesap</div>
        <div className="list-none m-0 flex flex-col gap-1 pt-0 p-4">
          {ACCOUNT_LINKS.map((item) => {
            const isActive = item.key === active;
            const className = `${baseItemClass} ${
              isActive ? activeClass : inactiveClass
            }`;

            if (item.href) {
              return (
                <Link key={item.key} href={item.href} className={className}>
                  {item.label}
                </Link>
              );
            }

            return (
              <button
                key={item.key}
                type="button"
                disabled
                aria-disabled="true"
                className={`${baseItemClass} ${comingSoonClass}`}
              >
                {item.label}
                <ComingSoonBadge />
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-2 border-[var(--ng-edge-strong)] rounded-[var(--ng-radius)] flex flex-col py-2 overflow-hidden">
        <div className="py-2 px-6 text-xl font-extrabold text-white">
          Abonelik
        </div>
        <div className="list-none m-0 flex flex-col gap-1 pt-0 p-4">
          <button
            type="button"
            disabled
            aria-disabled="true"
            className={`${baseItemClass} ${comingSoonClass}`}
          >
            Bir plan seç
            <ComingSoonBadge />
          </button>
        </div>
      </div>

      <div className="border-2 border-[var(--ng-edge-strong)] rounded-[var(--ng-radius)] flex flex-col py-2 overflow-hidden">
        <div className="py-2 px-6 text-xl font-extrabold text-white">
          Destek
        </div>
        <div className="list-none m-0 flex flex-col gap-1 pt-0 p-4">
          <button
            type="button"
            disabled
            aria-disabled="true"
            className={`${baseItemClass} ${comingSoonClass}`}
          >
            Yardım Merkezi
            <ComingSoonBadge />
          </button>
        </div>
      </div>

      <button
        type="button"
        className="w-full py-4 bg-transparent text-[var(--ng-sky)] font-extrabold text-sm border-2 border-[var(--ng-edge-strong)] rounded-[var(--ng-radius)] cursor-pointer uppercase tracking-wide transition-colors hover:bg-[var(--ng-surface-high)]"
        onClick={() => logout()}
      >
        OTURUMU KAPAT
      </button>
    </div>
  );
}
