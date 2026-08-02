"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { COMPASS_SMOOTHING } from "@/src/constants/tools";
import { normalizeDegrees, shortestAngleDelta } from "@/src/lib/qibla-utils";
import { CompassStatus } from "@/src/types/enums/tools.enums";

type OrientationEventClass = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<"granted" | "denied">;
};

interface WebkitOrientationEvent extends DeviceOrientationEvent {
  webkitCompassHeading?: number;
  webkitCompassAccuracy?: number;
}

enum Capability {
  Unknown = "unknown",
  Unsupported = "unsupported",
  NeedsPermission = "needs-permission",
  Ready = "ready",
}

const detectCapability = (): Capability => {
  if (
    typeof window === "undefined" ||
    typeof DeviceOrientationEvent === "undefined"
  ) {
    return Capability.Unsupported;
  }
  const cls = DeviceOrientationEvent as OrientationEventClass;
  return typeof cls.requestPermission === "function"
    ? Capability.NeedsPermission
    : Capability.Ready;
};

let cachedCapability: Capability | null = null;
const getCapability = (): Capability =>
  (cachedCapability ??= detectCapability());
const getServerCapability = (): Capability => Capability.Unknown;
const subscribeNever = (): (() => void) => () => {};

const PROBE_TIMEOUT_MS = 1500;

const screenAngle = (): number => {
  if (typeof window === "undefined") return 0;
  const angle = window.screen?.orientation?.angle;
  return typeof angle === "number" ? angle : 0;
};

interface HeadingReading {
  heading: number;
  isAbsolute: boolean;
}

const readHeading = (event: WebkitOrientationEvent): HeadingReading | null => {
  if (
    typeof event.webkitCompassHeading === "number" &&
    !Number.isNaN(event.webkitCompassHeading)
  ) {
    return {
      heading: normalizeDegrees(event.webkitCompassHeading),
      isAbsolute: true,
    };
  }
  if (typeof event.alpha === "number" && !Number.isNaN(event.alpha)) {
    return {
      heading: normalizeDegrees(360 - event.alpha + screenAngle()),
      isAbsolute:
        event.absolute === true || event.type === "deviceorientationabsolute",
    };
  }
  return null;
};

export interface DeviceCompass {
  status: CompassStatus;
  heading: number | null;
  isAbsolute: boolean;
  needsPermission: boolean;
  requestAccess: () => Promise<void>;
}

export const useDeviceCompass = (): DeviceCompass => {
  const capability = useSyncExternalStore(
    subscribeNever,
    getCapability,
    getServerCapability
  );

  const [heading, setHeading] = useState<number | null>(null);
  const [isAbsolute, setIsAbsolute] = useState(true);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [granted, setGranted] = useState(false);
  const [probeExpired, setProbeExpired] = useState(false);
  const smoothed = useRef<number | null>(null);

  const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
    const reading = readHeading(event as WebkitOrientationEvent);
    if (!reading) return;

    const previous = smoothed.current;
    const next =
      previous === null
        ? reading.heading
        : normalizeDegrees(
            previous +
              shortestAngleDelta(previous, reading.heading) * COMPASS_SMOOTHING
          );

    smoothed.current = next;
    setHeading(next);
    setIsAbsolute(reading.isAbsolute);
  }, []);

  const listening = capability === Capability.Ready || granted;

  useEffect(() => {
    if (!listening) return;

    window.addEventListener(
      "deviceorientationabsolute",
      handleOrientation,
      true
    );
    window.addEventListener("deviceorientation", handleOrientation, true);

    const probe = window.setTimeout(
      () => setProbeExpired(true),
      PROBE_TIMEOUT_MS
    );

    return () => {
      window.clearTimeout(probe);
      window.removeEventListener(
        "deviceorientationabsolute",
        handleOrientation,
        true
      );
      window.removeEventListener("deviceorientation", handleOrientation, true);
    };
  }, [listening, handleOrientation]);

  const requestAccess = useCallback(async () => {
    if (capability !== Capability.NeedsPermission) return;

    const cls = DeviceOrientationEvent as OrientationEventClass;
    try {
      const result = await cls.requestPermission?.();
      if (result === "granted") {
        setPermissionDenied(false);
        setGranted(true);
      } else {
        setPermissionDenied(true);
      }
    } catch {
      setPermissionDenied(true);
    }
  }, [capability]);

  let status: CompassStatus;
  if (heading !== null) status = CompassStatus.Active;
  else if (permissionDenied) status = CompassStatus.Denied;
  else if (capability === Capability.Unsupported)
    status = CompassStatus.Unsupported;
  else if (listening && probeExpired) status = CompassStatus.Unsupported;
  else status = CompassStatus.Idle;

  return {
    status,
    heading,
    isAbsolute,
    needsPermission: capability === Capability.NeedsPermission && !granted,
    requestAccess,
  };
};
