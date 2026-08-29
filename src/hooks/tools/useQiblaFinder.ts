"use client";

import { useMemo } from "react";
import { useAuthStore } from "@/src/store/auth.store";
import { useAuthHydrated } from "@/src/hooks/auth/useAuthHydrated";
import { useDeviceCompass } from "@/src/hooks/tools/useDeviceCompass";
import { useDeviceLocation } from "@/src/hooks/tools/useDeviceLocation";
import { useGuestCity } from "@/src/hooks/tools/useGuestCity";
import { matchTrCity } from "@/src/lib/geocode";
import {
  bearingForHeadingReference,
  buildQiblaReading,
  shortestAngleDelta,
} from "@/src/lib/qibla-utils";
import { QIBLA_ALIGNED_TOLERANCE_DEGREES } from "@/src/constants/tools";
import {
  CompassStatus,
  QiblaOriginSource,
} from "@/src/types/enums/tools.enums";
import type { QiblaOrigin, QiblaReading } from "@/src/types/tools.types";
import type { DeviceCompass } from "@/src/hooks/tools/useDeviceCompass";
import type { DeviceLocationState } from "@/src/hooks/tools/useDeviceLocation";
import type { GuestCity } from "@/src/hooks/tools/useGuestCity";

export interface QiblaFinder {
  origin: QiblaOrigin | null;
  reading: QiblaReading | null;
  compassTargetBearing: number | null;
  delta: number | null;
  isAligned: boolean;
  isLive: boolean;
  isGuest: boolean;
  compass: DeviceCompass;
  device: DeviceLocationState;
  guest: GuestCity;
}

export const useQiblaFinder = (): QiblaFinder => {
  const hydrated = useAuthHydrated();
  const user = useAuthStore((state) => state.user);
  const compass = useDeviceCompass();
  const device = useDeviceLocation();
  const guest = useGuestCity();

  const isGuest = hydrated && !user;
  const profileCity = useMemo(() => matchTrCity(user?.city), [user?.city]);
  const origin = useMemo<QiblaOrigin | null>(() => {
    if (device.location) {
      return {
        latitude: device.location.latitude,
        longitude: device.location.longitude,
        label: "Bulunduğun konum",
        source: QiblaOriginSource.Gps,
        accuracyM: device.location.accuracyM,
      };
    }
    if (profileCity) {
      return {
        latitude: profileCity.latitude,
        longitude: profileCity.longitude,
        label: profileCity.city,
        source: QiblaOriginSource.ProfileCity,
      };
    }
    if (isGuest && guest.city) {
      return {
        latitude: guest.city.latitude,
        longitude: guest.city.longitude,
        label: guest.city.city,
        source: QiblaOriginSource.GuestCity,
      };
    }
    return null;
  }, [device.location, profileCity, isGuest, guest.city]);

  const reading = useMemo(
    () => (origin ? buildQiblaReading(origin.latitude, origin.longitude) : null),
    [origin]
  );

  const compassTargetBearing = useMemo(
    () =>
      reading === null
        ? null
        : bearingForHeadingReference(reading.bearing, compass.reference),
    [reading, compass.reference]
  );

  const delta = useMemo(() => {
    if (compassTargetBearing === null || compass.heading === null) return null;
    return shortestAngleDelta(compass.heading, compassTargetBearing);
  }, [compassTargetBearing, compass.heading]);

  return {
    origin,
    reading,
    compassTargetBearing,
    delta,
    isAligned:
      delta !== null && Math.abs(delta) <= QIBLA_ALIGNED_TOLERANCE_DEGREES,
    isLive: compass.status === CompassStatus.Active,
    isGuest,
    compass,
    device,
    guest,
  };
};
