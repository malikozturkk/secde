"use client";

import React, { useMemo } from "react";
import { Compass, MapPin } from "lucide-react";
import Link from "next/link";
import { SeoPageShell } from "@/src/components/seo/SeoPageShell";
import { Button } from "@/src/components/ui/Button";
import { CompassRose } from "@/src/components/tools/CompassRose";
import { useAuthStore } from "@/src/store/auth.store";
import { useAuthHydrated } from "@/src/hooks/auth/useAuthHydrated";
import { useDeviceCompass } from "@/src/hooks/tools/useDeviceCompass";
import { useGuestCity } from "@/src/hooks/tools/useGuestCity";
import { Select } from "@/src/components/ui/Select";
import { TR_CITIES } from "@/src/constants/registration";
import { matchTrCity } from "@/src/lib/geocode";
import {
  buildQiblaReading,
  describeDirection,
  formatBearing,
  formatDistance,
  shortestAngleDelta,
} from "@/src/lib/qibla-utils";
import { QIBLA_ALIGNED_TOLERANCE_DEGREES } from "@/src/constants/tools";
import { CompassStatus } from "@/src/types/enums/tools.enums";
import { cn } from "@/src/lib/utils";

const CITY_OPTIONS = TR_CITIES.map((c) => ({ value: c.city, label: c.city }));

const BREADCRUMBS = [
  { name: "Ana sayfa", path: "/" },
  { name: "Araçlar", path: "/tools" },
  { name: "Kıble Bulucu", path: "/tools/qibla" },
];

export const QiblaClient: React.FC = () => {
  const { user } = useAuthStore();
  const hydrated = useAuthHydrated();
  const compass = useDeviceCompass();
  const guest = useGuestCity();
  const isGuest = hydrated && !user;

  const registeredCity = useMemo(() => matchTrCity(user?.city), [user?.city]);

  const origin = useMemo(() => {
    const source = registeredCity ?? (isGuest ? guest.city : null);
    if (source) {
      return {
        latitude: source.latitude,
        longitude: source.longitude,
        label: source.city,
      };
    }
    return null;
  }, [registeredCity, isGuest, guest.city]);

  const reading = useMemo(
    () =>
      origin ? buildQiblaReading(origin.latitude, origin.longitude) : null,
    [origin]
  );

  const delta = useMemo(() => {
    if (!reading || compass.heading === null) return null;
    return shortestAngleDelta(compass.heading, reading.bearing);
  }, [reading, compass.heading]);

  const isAligned =
    delta !== null && Math.abs(delta) <= QIBLA_ALIGNED_TOLERANCE_DEGREES;
  const liveCompass = compass.status === CompassStatus.Active;

  const headline = useMemo(() => {
    if (delta === null) return null;
    if (Math.abs(delta) <= QIBLA_ALIGNED_TOLERANCE_DEGREES)
      return "Kıbleye dönüksün";
    return `${Math.abs(Math.round(delta))}° ${delta > 0 ? "sağa" : "sola"} dön`;
  }, [delta]);

  return (
    <SeoPageShell
      publicShell
      breadcrumbs={BREADCRUMBS}
      eyebrow="Kıble bulucu"
      title="Kıble yönünü bul"
      lede="Seçtiğin ilin merkezine göre Kâbe'nin yönünü ve kuş uçuşu uzaklığını hesaplar. Cihazın pusulasını desteklediğinde canlı olarak da yön gösterir; konum izni istemez."
    >
        <h1 className="m-0 text-[22px] font-black leading-[1.1] tracking-[-0.01em] text-white">
          Kıble Bulucu
        </h1>

        {!origin ? (
          <section className="flex flex-col items-start gap-3 rounded-3xl border border-[rgba(245,166,35,0.35)] bg-gradient-to-b from-[rgba(245,166,35,0.12)] to-[#1C2E35] to-60% p-5">
            <h2 className="m-0 text-xl font-black text-white">
              Önce konum gerekli
            </h2>
            {isGuest ? (
              <>
                <p className="m-0 text-[13px] font-bold leading-snug text-white/55">
                  Kıble yönü seçtiğin ilin merkezine göre hesaplanır. Hesap
                  gerekmiyor — seçimin yalnızca bu tarayıcıda saklanır.
                </p>
                <div className="w-full max-w-[280px]">
                  <Select
                    placeholder="İlini seç"
                    value=""
                    onChange={guest.setCity}
                    options={CITY_OPTIONS}
                  />
                </div>
                <p className="m-0 text-[12px] font-semibold text-white/35">
                  Vakit takibi, seri ve XP için{" "}
                  <Link
                    href="/register"
                    className="font-bold text-[var(--color-primary-light)] underline underline-offset-2"
                  >
                    ücretsiz hesap
                  </Link>{" "}
                  oluşturabilirsin.
                </p>
              </>
            ) : (
              <>
                <p className="m-0 text-[13px] font-bold leading-snug text-white/55">
                  Kıble yönü kayıtlı iline göre hesaplanır. Önce ayarlardan
                  ilini seç.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link href="/settings/account">
                    <Button size="sm" variant="primary">
                      Şehrimi seç
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </section>
        ) : (
          <>
            <section
              className={cn(
                "flex flex-col items-center gap-5 rounded-3xl border p-5 transition-colors duration-300",
                isAligned
                  ? "border-[rgba(37,180,154,0.45)] bg-gradient-to-b from-[rgba(37,180,154,0.14)] to-[#1C2E35] to-60%"
                  : "border-white/[0.07] bg-[#1C2E35]"
              )}
            >
              <CompassRose
                qiblaBearing={reading!.bearing}
                heading={compass.heading}
                isAligned={isAligned}
              />

              <div className="flex flex-col items-center gap-1 text-center">
                <span
                  aria-live="polite"
                  className={cn(
                    "font-display leading-none tracking-[0.02em]",
                    isAligned
                      ? "text-[30px] text-[var(--color-primary-light)] [text-shadow:0_3px_0_rgba(15,80,72,0.6)]"
                      : "text-[26px] text-white"
                  )}
                >
                  {headline ??
                    `${formatBearing(reading!.bearing)} ${describeDirection(
                      reading!.bearing
                    )}`}
                </span>
                <span className="text-[11px] font-black uppercase tracking-[0.1em] text-white/35">
                  {liveCompass
                    ? compass.isAbsolute
                      ? "Pusula açık"
                      : "Pusula göreli — telefonu 8 çizerek kalibre et"
                    : "Kuzeyi yukarı tut, açıyı uygula"}
                </span>
              </div>

              {compass.needsPermission && (
                <Button
                  size="sm"
                  variant="lightBlue"
                  icon={<Compass size={15} strokeWidth={2.6} />}
                  onClick={() => void compass.requestAccess()}
                >
                  Pusulayı aç
                </Button>
              )}

              {compass.status === CompassStatus.Denied && (
                <p className="m-0 text-center text-[12px] font-bold text-rose-300">
                  Pusula izni reddedildi. Açıyı aşağıdan okuyabilirsin.
                </p>
              )}
            </section>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1 rounded-3xl border border-white/[0.07] bg-[#1C2E35] p-4">
                <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-white/40">
                  <Compass size={13} strokeWidth={2.8} aria-hidden="true" />
                  Kuzeyden açı
                </div>
                <span className="font-display text-[26px] leading-none tracking-[0.02em] text-[var(--color-primary-light)]">
                  {formatBearing(reading!.bearing)}
                </span>
              </div>
              <div className="flex flex-col gap-1 rounded-3xl border border-white/[0.07] bg-[#1C2E35] p-4">
                <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-white/40">
                  <MapPin size={13} strokeWidth={2.8} aria-hidden="true" />
                  Kâbe&apos;ye uzaklık
                </div>
                <span className="font-display text-[26px] leading-none tracking-[0.02em] text-[var(--color-secondary-light)]">
                  {formatDistance(reading!.distanceKm)}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-white/[0.07] bg-[#1C2E35] px-4 py-3">
              <span className="text-[12px] font-black text-white/70">
                {origin.label}
                <span className="ml-1.5 font-bold text-white/35">
                  {isGuest ? "seçtiğin şehir" : "kayıtlı şehrin"}
                </span>
              </span>
              {isGuest ? (
                <Button size="xs" variant="ghost" onClick={guest.clear}>
                  Şehri değiştir
                </Button>
              ) : (
                <Link href="/settings/account">
                  <Button size="xs" variant="ghost">
                    Şehrimi değiştir
                  </Button>
                </Link>
              )}
            </div>
          </>
        )}
    </SeoPageShell>
  );
};
