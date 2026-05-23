"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GeolocationStatus } from "@/src/types/enums/worship.enums";
import type { Coordinates } from "@/src/types/worship.types";

interface UseGeolocationOptions {
  onSuccess?: (coords: Coordinates) => void;
  autoProbePermission?: boolean;
}

interface UseGeolocationResult {
  status: GeolocationStatus;
  coords: Coordinates | null;
  error: string | null;
  request: () => void;
  reset: () => void;
}

type GeolocationFailureReason =
  | "unsupported"
  | "insecure-context"
  | "permission-denied"
  | "position-unavailable"
  | "timeout"
  | "unknown";

interface GeolocationFailure {
  reason: GeolocationFailureReason;
  message: string;
  status: GeolocationStatus;
}

const GEO_TIMEOUT_FAST_MS = 8_000;
const GEO_TIMEOUT_ACCURATE_MS = 15_000;
const GEO_MAX_AGE_MS = 5 * 60 * 1000;

const ERROR_MESSAGES: Record<GeolocationFailureReason, string> = {
  unsupported: "Tarayıcınız konum servisini desteklemiyor.",
  "insecure-context":
    "Konum servisi sadece güvenli (HTTPS) bağlantılarda çalışır.",
  "permission-denied": "Konum izni reddedildi.",
  "position-unavailable":
    "Konum bilgisi şu an alınamıyor. Bağlantınızı kontrol edip tekrar deneyin.",
  timeout: "Konum sorgusu zaman aşımına uğradı. Tekrar deneyebilirsiniz.",
  unknown: "Konum alınırken beklenmeyen bir hata oluştu.",
};

const isSecureContext = (): boolean => {
  if (typeof window === "undefined") return false;
  if (window.isSecureContext) return true;
  const { hostname } = window.location;
  return (
    hostname === "localhost" || hostname === "127.0.0.1" || hostname === "[::1]"
  );
};

const mapBrowserError = (
  geoError: GeolocationPositionError
): GeolocationFailure => {
  switch (geoError.code) {
    case geoError.PERMISSION_DENIED:
      return {
        reason: "permission-denied",
        message: ERROR_MESSAGES["permission-denied"],
        status: GeolocationStatus.Denied,
      };
    case geoError.POSITION_UNAVAILABLE:
      return {
        reason: "position-unavailable",
        message: ERROR_MESSAGES["position-unavailable"],
        status: GeolocationStatus.Failed,
      };
    case geoError.TIMEOUT:
      return {
        reason: "timeout",
        message: ERROR_MESSAGES["timeout"],
        status: GeolocationStatus.Failed,
      };
    default:
      return {
        reason: "unknown",
        message: geoError.message || ERROR_MESSAGES.unknown,
        status: GeolocationStatus.Failed,
      };
  }
};

export const useGeolocation = (
  options?: UseGeolocationOptions
): UseGeolocationResult => {
  const [status, setStatus] = useState<GeolocationStatus>(
    GeolocationStatus.Idle
  );
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const pendingRef = useRef<boolean>(false);
  const onSuccess = options?.onSuccess;
  const autoProbePermission = options?.autoProbePermission ?? true;

  const reset = useCallback(() => {
    setStatus(GeolocationStatus.Idle);
    setCoords(null);
    setError(null);
    pendingRef.current = false;
  }, []);

  const tryGetPosition = useCallback(
    (highAccuracy: boolean): Promise<Coordinates> =>
      new Promise<Coordinates>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) =>
            resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }),
          (geoError) => reject(mapBrowserError(geoError)),
          {
            enableHighAccuracy: highAccuracy,
            timeout: highAccuracy
              ? GEO_TIMEOUT_ACCURATE_MS
              : GEO_TIMEOUT_FAST_MS,
            maximumAge: highAccuracy ? 0 : GEO_MAX_AGE_MS,
          }
        );
      }),
    []
  );

  const request = useCallback(() => {
    if (pendingRef.current) return;

    if (typeof window === "undefined" || !("geolocation" in navigator)) {
      setStatus(GeolocationStatus.Unsupported);
      setError(ERROR_MESSAGES.unsupported);
      return;
    }

    if (!isSecureContext()) {
      setStatus(GeolocationStatus.Unsupported);
      setError(ERROR_MESSAGES["insecure-context"]);
      return;
    }

    pendingRef.current = true;
    setStatus(GeolocationStatus.Loading);
    setError(null);

    tryGetPosition(false)
      .catch((failure: GeolocationFailure) => {
        if (
          failure.reason === "position-unavailable" ||
          failure.reason === "timeout"
        ) {
          return tryGetPosition(true);
        }
        throw failure;
      })
      .then((next) => {
        pendingRef.current = false;
        setCoords(next);
        setStatus(GeolocationStatus.Granted);
        setError(null);
        onSuccess?.(next);
      })
      .catch((failure: GeolocationFailure) => {
        pendingRef.current = false;
        setStatus(failure.status);
        setError(failure.message);
      });
  }, [onSuccess, tryGetPosition]);

  useEffect(() => {
    if (!autoProbePermission) return;
    if (typeof window === "undefined" || !navigator.permissions?.query) return;

    let cancelled = false;
    navigator.permissions
      .query({ name: "geolocation" as PermissionName })
      .then((result) => {
        if (cancelled) return;
        if (result.state === "denied") {
          setStatus((current) =>
            current === GeolocationStatus.Idle
              ? GeolocationStatus.Denied
              : current
          );
        }
        result.onchange = () => {
          if (result.state === "denied") {
            setStatus(GeolocationStatus.Denied);
          } else if (result.state === "granted") {
            setError(null);
          }
        };
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [autoProbePermission]);

  return { status, coords, error, request, reset };
};
