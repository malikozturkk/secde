"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  GEOLOCATION_MAX_AGE_MS,
  GEOLOCATION_TIMEOUT_MS,
} from "@/src/constants/tools";
import { GeolocationStatus } from "@/src/types/enums/tools.enums";
import type { DeviceLocation } from "@/src/types/tools.types";

export interface DeviceLocationState {
  status: GeolocationStatus;
  location: DeviceLocation | null;
  isSupported: boolean;
  request: () => void;
  clear: () => void;
}

const isSupported = (): boolean =>
  typeof navigator !== "undefined" && "geolocation" in navigator;

const subscribeNever = () => () => {};

const getSupportedServerSnapshot = (): boolean => true;

export const useDeviceLocation = (): DeviceLocationState => {
  const supported = useSyncExternalStore(
    subscribeNever,
    isSupported,
    getSupportedServerSnapshot
  );

  const [status, setStatus] = useState<GeolocationStatus>(
    GeolocationStatus.Idle
  );
  const [location, setLocation] = useState<DeviceLocation | null>(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const request = useCallback(() => {
    if (!isSupported()) {
      setStatus(GeolocationStatus.Unavailable);
      return;
    }

    setStatus(GeolocationStatus.Locating);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (!mounted.current) return;
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracyM: position.coords.accuracy,
        });
        setStatus(GeolocationStatus.Ready);
      },
      (error) => {
        if (!mounted.current) return;
        if (error.code === error.PERMISSION_DENIED) {
          setStatus(GeolocationStatus.Denied);
        } else if (error.code === error.TIMEOUT) {
          setStatus(GeolocationStatus.Timeout);
        } else {
          setStatus(GeolocationStatus.Unavailable);
        }
      },
      {
        enableHighAccuracy: true,
        timeout: GEOLOCATION_TIMEOUT_MS,
        maximumAge: GEOLOCATION_MAX_AGE_MS,
      }
    );
  }, []);

  const clear = useCallback(() => {
    setLocation(null);
    setStatus(GeolocationStatus.Idle);
  }, []);

  return {
    status,
    location,
    isSupported: supported,
    request,
    clear,
  };
};
