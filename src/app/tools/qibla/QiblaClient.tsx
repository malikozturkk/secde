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
import { ELEVATION, STAT_TILE, TEXT } from "@/src/constants/surface";

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
      className="ng-calm"
      breadcrumbs={BREADCRUMBS}
      eyebrow="Kıble bulucu"
      title="Kıble yönünü bul"
      lede="Seçtiğin ilin merkezine göre Kâbe'nin yönünü ve kuş uçuşu uzaklığını hesaplar. Cihazın pusulasını desteklediğinde canlı olarak da yön gösterir; konum izni istemez."
    >
        {!origin ? (
          <section
            className={cn(
              ELEVATION.surface,
              "flex flex-col items-start gap-3 p-5"
            )}
          >
            <h2 className={cn(TEXT.h3, "m-0")}>Önce konum gerekli</h2>
            {isGuest ? (
              <>
                <p className={cn(TEXT.body, "m-0")}>
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
                <p className={cn(TEXT.muted, "m-0")}>
                  Vakit takibi, seri ve XP için{" "}
                  <Link
                    href="/register"
                    className="font-bold text-[var(--ng-green)] underline underline-offset-2"
                  >
                    ücretsiz hesap
                  </Link>{" "}
                  oluşturabilirsin.
                </p>
              </>
            ) : (
              <>
                <p className={cn(TEXT.body, "m-0")}>
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
                ELEVATION.surface,
                "flex flex-col items-center gap-5 p-5 transition-colors duration-[var(--motion-base)]",
                isAligned &&
                  "border-[color-mix(in_srgb,var(--ng-green)_55%,transparent)]"
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
                    TEXT.num,
                    isAligned
                      ? "text-[34px] text-[var(--ng-green)]"
                      : "text-[30px]"
                  )}
                >
                  {headline ??
                    `${formatBearing(reading!.bearing)} ${describeDirection(
                      reading!.bearing
                    )}`}
                </span>
                <span className="text-[11px] font-black uppercase tracking-[0.1em] text-[var(--ng-text-3)]">
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
                <p className="m-0 text-center text-[12px] font-bold text-[var(--ng-rose)]">
                  Pusula izni reddedildi. Açıyı aşağıdan okuyabilirsin.
                </p>
              )}
            </section>

            <div className="grid grid-cols-2 gap-3">
              <div className={STAT_TILE}>
                <span className={cn(TEXT.muted, "flex items-center gap-1.5")}>
                  <Compass size={13} strokeWidth={2.8} aria-hidden="true" />
                  Kuzeyden açı
                </span>
                <span className={cn(TEXT.num, "text-[28px] text-[var(--ng-sky)]")}>
                  {formatBearing(reading!.bearing)}
                </span>
              </div>
              <div className={STAT_TILE}>
                <span className={cn(TEXT.muted, "flex items-center gap-1.5")}>
                  <MapPin size={13} strokeWidth={2.8} aria-hidden="true" />
                  Kâbe&apos;ye uzaklık
                </span>
                <span className={cn(TEXT.num, "text-[28px] text-[var(--ng-gold)]")}>
                  {formatDistance(reading!.distanceKm)}
                </span>
              </div>
            </div>

            <div
              className={cn(
                ELEVATION.surface,
                "flex flex-wrap items-center justify-between gap-3 px-4 py-3"
              )}
            >
              <span className="text-[13px] font-black text-white">
                {origin.label}
                <span className="ml-1.5 text-[12px] font-bold text-[var(--ng-text-3)]">
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
