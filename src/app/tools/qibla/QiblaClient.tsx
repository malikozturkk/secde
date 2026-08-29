"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  Compass,
  Crosshair,
  Loader2,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { Select } from "@/src/components/ui/Select";
import { QiblaCompass } from "@/src/components/tools/qibla/QiblaCompass";
import { useQiblaFinder } from "@/src/hooks/tools/useQiblaFinder";
import { TR_CITIES } from "@/src/constants/registration";
import { GEOLOCATION_COARSE_ACCURACY_M } from "@/src/constants/tools";
import {
  describeDirection,
  formatAccuracy,
  formatBearing,
  formatCoordinate,
  formatDistance,
} from "@/src/lib/qibla-utils";
import { cn } from "@/src/lib/utils";
import { ACCENT, ELEVATION, STAT_TILE, TEXT } from "@/src/constants/surface";
import {
  CompassStatus,
  GeolocationStatus,
  QiblaOriginSource,
} from "@/src/types/enums/tools.enums";

const CITY_OPTIONS = TR_CITIES.map((c) => ({ value: c.city, label: c.city }));

const SOURCE_LABELS: Record<QiblaOriginSource, string> = {
  [QiblaOriginSource.Gps]: "Cihaz konumu",
  [QiblaOriginSource.ProfileCity]: "Profilindeki il",
  [QiblaOriginSource.GuestCity]: "Seçtiğin il",
};

const Panel: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <section
    className={cn(ELEVATION.surface, "p-5", className)}
  >
    {children}
  </section>
);

const Notice: React.FC<{
  tone: "warn" | "info";
  icon: React.ReactNode;
  children: React.ReactNode;
}> = ({ tone, icon, children }) => (
  <p
    className={cn(
      "m-0 flex items-start gap-2.5 rounded-[var(--ng-radius)] border-[length:var(--ng-stroke)] p-3.5 text-[13px] font-bold leading-snug",
      tone === "warn"
        ? "border-[color-mix(in_srgb,var(--ng-gold)_45%,transparent)] bg-[color-mix(in_srgb,var(--ng-gold)_10%,transparent)] text-[var(--ng-gold)]"
        : "border-[var(--ng-edge)] bg-[var(--ng-surface-high)] text-[var(--ng-text-2)]"
    )}
  >
    <span className="mt-px shrink-0" aria-hidden="true">
      {icon}
    </span>
    <span>{children}</span>
  </p>
);

const Stat: React.FC<{ label: string; value: string; hint?: string }> = ({
  label,
  value,
  hint,
}) => (
  <div className={cn(STAT_TILE, "items-start gap-1 text-left")}>
    <p className="m-0 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--ng-text-3)]">
      {label}
    </p>
    <p className={cn(TEXT.num, "m-0 text-[19px]")}>{value}</p>
    {hint && <p className={cn(TEXT.muted, "m-0 text-[11px]")}>{hint}</p>}
  </div>
);

export const QiblaClient: React.FC = () => {
  const {
    origin,
    reading,
    compassTargetBearing,
    delta,
    isAligned,
    isLive,
    isGuest,
    compass,
    device,
    guest,
  } = useQiblaFinder();

  const locating = device.status === GeolocationStatus.Locating;
  const usingGps = origin?.source === QiblaOriginSource.Gps;
  const coarseFix =
    usingGps &&
    origin.accuracyM !== undefined &&
    origin.accuracyM > GEOLOCATION_COARSE_ACCURACY_M;
  const needsCalibration =
    compass.accuracyDeg !== null && compass.accuracyDeg < 0;

  const locationError = useMemo(() => {
    switch (device.status) {
      case GeolocationStatus.Denied:
        return "Konum izni verilmedi. Tarayıcının adres çubuğundaki kilit simgesinden izni açabilir ya da aşağıdan ilini seçerek devam edebilirsin.";
      case GeolocationStatus.Timeout:
        return "Konum ölçümü zaman aşımına uğradı. Açık alanda tekrar dene veya ilini seç.";
      case GeolocationStatus.Unavailable:
        return "Cihazın konumu şu an alınamadı. Konum servislerinin açık olduğundan emin ol ya da ilini seç.";
      default:
        return null;
    }
  }, [device.status]);

  return (
    <div className="flex flex-col gap-4">
      <Panel className="flex flex-col gap-5">
        {origin && reading && compassTargetBearing !== null ? (
          <>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border-[length:var(--ng-stroke)] border-[var(--ng-edge)] bg-[var(--ng-surface-high)] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.1em] text-[var(--ng-text-2)]">
                <MapPin size={13} strokeWidth={3} aria-hidden="true" />
                {SOURCE_LABELS[origin.source]}
                {origin.source !== QiblaOriginSource.Gps &&
                  ` · ${origin.label}`}
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.1em]",
                  isLive
                    ? ACCENT.green.chip
                    : "border-[length:var(--ng-stroke)] border-[var(--ng-edge)] bg-[var(--ng-surface-high)] text-[var(--ng-text-3)]"
                )}
              >
                <Compass size={13} strokeWidth={3} aria-hidden="true" />
                {isLive ? "Pusula canlı" : "Sabit yön"}
              </span>
            </div>

            <QiblaCompass
              trueBearing={reading.bearing}
              compassBearing={compassTargetBearing}
              heading={compass.heading}
              delta={delta}
              isAligned={isAligned}
              isLive={isLive}
            />

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              <Stat
                label="Kıble açısı"
                value={formatBearing(reading.bearing)}
                hint={`Kuzeyden ${describeDirection(reading.bearing)}`}
              />
              <Stat
                label="Kâbe uzaklığı"
                value={formatDistance(reading.distanceKm)}
                hint="Kuş uçuşu"
              />
              <Stat
                label="Konum"
                value={
                  usingGps
                    ? formatCoordinate(origin.latitude, "lat")
                    : origin.label
                }
                hint={
                  usingGps
                    ? formatCoordinate(origin.longitude, "lon")
                    : "İl merkezi"
                }
              />
            </div>

            {!isLive && (
              <Notice tone="info" icon={<Compass size={15} strokeWidth={2.6} />}>
                {compass.status === CompassStatus.Unsupported
                  ? "Bu cihazda pusula sensörü yok; kadran kuzey yukarı sabit duruyor. Kuzeyi bulup kuzeyden saat yönünde yukarıdaki açı kadar dön."
                  : compass.status === CompassStatus.Denied
                    ? "Pusula izni verilmedi. Kadran kuzey yukarı sabit; kuzeyi bulup açı kadar dönerek kıbleyi bulabilirsin."
                    : "Kadran kuzey yukarı sabit duruyor. Canlı pusula için telefonunu yere paralel tut."}
              </Notice>
            )}

            {needsCalibration && (
              <Notice
                tone="warn"
                icon={<AlertTriangle size={15} strokeWidth={2.6} />}
              >
                Telefonun pusulası kalibre değil. Cihazı havada birkaç kez 8
                çizerek hareket ettir, kılıfını çıkar ve metal yüzeylerden
                uzaklaş.
              </Notice>
            )}

            {coarseFix && origin.accuracyM !== undefined && (
              <Notice
                tone="warn"
                icon={<AlertTriangle size={15} strokeWidth={2.6} />}
              >
                Konum {formatAccuracy(origin.accuracyM)} hassasiyetle bulundu —
                muhtemelen GPS yerine ağ konumu kullanıldı. Kıble açısı yine de
                birkaç derece içinde doğrudur.
              </Notice>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-[var(--ng-radius)] border-[length:var(--ng-stroke)] border-[var(--ng-edge-strong)] bg-[var(--ng-surface-deep)]">
              <Crosshair
                className="h-8 w-8 text-[var(--ng-green)]"
                strokeWidth={2.4}
                aria-hidden="true"
              />
            </span>
            <h2 className={cn(TEXT.h3, "m-0")}>
              Kıble yönünü hesaplayalım
            </h2>
            <p className={cn(TEXT.body, "m-0 max-w-[46ch]")}>
              Kıble açısı bulunduğun noktaya göre değişir. Konumunu paylaş ya da
              ilini seç; hesabı cihazında yapıp yönü göstereceğiz.
            </p>
          </div>
        )}

        {compass.needsPermission && origin && (
          <Button
            variant="amber"
            size="md"
            onClick={() => void compass.requestAccess()}
            className="w-full"
          >
            PUSULAYI BAŞLAT
          </Button>
        )}
      </Panel>

      <Panel className="flex flex-col gap-3.5">
        <div>
          <h2 className={cn(TEXT.h3, "m-0")}>
            Konumunu belirle
          </h2>
          <p className={cn(TEXT.body, "m-0 mt-1")}>
            En doğru sonuç için cihazının konumunu kullan. Vermek istemezsen il
            seçmen de yeterli — aynı il içinde fark genellikle 1–2 derecedir.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={device.request}
          disabled={locating || !device.isSupported}
          className="w-full"
        >
          {locating ? (
            <>
              <Loader2
                size={16}
                strokeWidth={3}
                className="mr-2 inline animate-spin motion-reduce:animate-none"
                aria-hidden="true"
              />
              KONUM ALINIYOR
            </>
          ) : usingGps ? (
            "KONUMU YENİLE"
          ) : (
            "KONUMUMU KULLAN"
          )}
        </Button>

        {!device.isSupported && (
          <Notice tone="info" icon={<AlertTriangle size={15} strokeWidth={2.6} />}>
            Bu tarayıcı konum servisini desteklemiyor. Aşağıdan ilini seçerek
            devam edebilirsin.
          </Notice>
        )}

        {locationError && (
          <Notice tone="warn" icon={<AlertTriangle size={15} strokeWidth={2.6} />}>
            {locationError}
          </Notice>
        )}

        {usingGps && origin.accuracyM !== undefined && !coarseFix && (
          <Notice tone="info" icon={<ShieldCheck size={15} strokeWidth={2.6} />}>
            Konum {formatAccuracy(origin.accuracyM)} hassasiyetle alındı ve
            yalnızca bu sekmede tutuluyor.
          </Notice>
        )}

        {isGuest ? (
          <div className="flex flex-col gap-2">
            <Select
              label="İl (konum izni vermek istemezsen)"
              placeholder="İlini seç"
              value={guest.city?.city}
              onChange={guest.setCity}
              options={CITY_OPTIONS}
            />
            <p className={cn(TEXT.muted, "m-0 text-[11px]")}>
              Seçtiğin ilin adı yalnızca bu tarayıcıda saklanır; koordinat
              saklanmaz.
            </p>
          </div>
        ) : (
          <p className={cn(TEXT.muted, "m-0")}>
            {origin?.source === QiblaOriginSource.ProfileCity
              ? `Profilinde ${origin.label} seçili.`
              : "Profilinde il seçili değil."}{" "}
            <Link
              href="/settings/account"
              className="font-bold text-[var(--ng-green)] underline underline-offset-2"
            >
              Şehrimi değiştir
            </Link>
          </p>
        )}

        <p className={cn(TEXT.muted, "m-0 flex items-start gap-2 border-t-[length:var(--ng-stroke)] border-[var(--ng-edge)] pt-3 text-[11px]")}>
          <ShieldCheck
            size={14}
            strokeWidth={2.6}
            className="mt-px shrink-0"
            aria-hidden="true"
          />
          <span>
            Koordinatların sunucularımıza gönderilmez, veritabanına yazılmaz ve
            tarayıcı deposunda tutulmaz. Sekmeyi kapattığında silinir. Ayrıntı:{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-2 hover:text-white"
            >
              Aydınlatma Metni
            </Link>
            .
          </span>
        </p>
      </Panel>
    </div>
  );
};
