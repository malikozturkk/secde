"use client";

import React, { useCallback, useMemo, useState } from "react";
import { ArrowLeft, Compass, MapPin, RefreshCw } from "lucide-react";
import Link from "next/link";
import AppLayout from "@/src/components/layout/AppLayout";
import { Button } from "@/src/components/ui/Button";
import { CompassRose } from "@/src/components/tools/CompassRose";
import { useAuthStore } from "@/src/store/auth.store";
import { useGeolocation } from "@/src/hooks/worship/useGeolocation";
import { useDeviceCompass } from "@/src/hooks/tools/useDeviceCompass";
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
import { GeolocationStatus } from "@/src/types/enums/worship.enums";
import { cn } from "@/src/lib/utils";

export const QiblaClient: React.FC = () => {
  const { user } = useAuthStore();
  const compass = useDeviceCompass();
  const [useDeviceLocation, setUseDeviceLocation] = useState(false);
  const geo = useGeolocation({ onSuccess: () => setUseDeviceLocation(true) });

  const registeredCity = useMemo(() => matchTrCity(user?.city), [user?.city]);

  const origin = useMemo(() => {
    if (useDeviceLocation && geo.coords) {
      return {
        latitude: geo.coords.lat,
        longitude: geo.coords.lng,
        label: "Cihaz konumun",
      };
    }
    if (registeredCity) {
      return {
        latitude: registeredCity.latitude,
        longitude: registeredCity.longitude,
        label: registeredCity.city,
      };
    }
    return null;
  }, [useDeviceLocation, geo.coords, registeredCity]);

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

  const handleUseDeviceLocation = useCallback(() => geo.request(), [geo]);

  const headline = useMemo(() => {
    if (delta === null) return null;
    if (Math.abs(delta) <= QIBLA_ALIGNED_TOLERANCE_DEGREES)
      return "Kıbleye dönüksün";
    return `${Math.abs(Math.round(delta))}° ${delta > 0 ? "sağa" : "sola"} dön`;
  }, [delta]);

  return (
    <AppLayout mainClassName="px-4 pb-10 pt-6 lg:pt-8">
      <div className="mx-auto flex w-full flex-col gap-4">
        <Link
          href="/tools"
          className="inline-flex w-fit items-center gap-1.5 rounded-xl text-[11px] font-black uppercase tracking-[0.1em] text-white/45 transition-colors hover:text-white/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-light)]"
        >
          <ArrowLeft size={14} strokeWidth={3} aria-hidden="true" />
          Araçlar
        </Link>

        <h1 className="m-0 text-[22px] font-black leading-[1.1] tracking-[-0.01em] text-white">
          Kıble Bulucu
        </h1>

        {!origin ? (
          <section className="flex flex-col items-start gap-3 rounded-3xl border border-[rgba(245,166,35,0.35)] bg-gradient-to-b from-[rgba(245,166,35,0.12)] to-[#1C2E35] to-60% p-5">
            <h2 className="m-0 text-xl font-black text-white">
              Önce konum gerekli
            </h2>
            <p className="m-0 text-[13px] font-bold leading-snug text-white/55">
              Kıble yönü bulunduğun noktaya göre hesaplanır.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="primary"
                onClick={handleUseDeviceLocation}
              >
                Konumumu kullan
              </Button>
              <Link href="/settings/account">
                <Button size="sm" variant="ghost">
                  Şehrimi seç
                </Button>
              </Link>
            </div>
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
                {!useDeviceLocation && (
                  <span className="ml-1.5 font-bold text-white/35">
                    kayıtlı şehrin
                  </span>
                )}
              </span>
              <Button
                size="xs"
                variant="ghost"
                icon={<RefreshCw size={13} strokeWidth={2.8} />}
                onClick={handleUseDeviceLocation}
                disabled={geo.status === GeolocationStatus.Loading}
              >
                {geo.status === GeolocationStatus.Loading
                  ? "Alınıyor…"
                  : useDeviceLocation
                  ? "Yenile"
                  : "Cihaz konumu"}
              </Button>
              {geo.error && (
                <p className="m-0 w-full text-[12px] font-bold text-rose-300">
                  {geo.error}
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
};
