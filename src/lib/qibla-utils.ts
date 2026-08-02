import { KAABA_COORDINATES } from "@/src/constants/tools";
import type { QiblaReading } from "@/src/types/tools.types";

const EARTH_RADIUS_KM = 6371;
const toRad = (deg: number): number => (deg * Math.PI) / 180;
const toDeg = (rad: number): number => (rad * 180) / Math.PI;

export const normalizeDegrees = (deg: number): number => ((deg % 360) + 360) % 360;

export const shortestAngleDelta = (from: number, to: number): number => {
  const diff = normalizeDegrees(to - from);
  return diff > 180 ? diff - 360 : diff;
};

export function calculateQiblaBearing(latitude: number, longitude: number): number {
  const lat1 = toRad(latitude);
  const lat2 = toRad(KAABA_COORDINATES.latitude);
  const deltaLon = toRad(KAABA_COORDINATES.longitude - longitude);

  const y = Math.sin(deltaLon) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLon);

  return normalizeDegrees(toDeg(Math.atan2(y, x)));
}

export function calculateKaabaDistance(latitude: number, longitude: number): number {
  const lat1 = toRad(latitude);
  const lat2 = toRad(KAABA_COORDINATES.latitude);
  const dLat = toRad(KAABA_COORDINATES.latitude - latitude);
  const dLon = toRad(KAABA_COORDINATES.longitude - longitude);

  const a =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

  return EARTH_RADIUS_KM * 2 * Math.asin(Math.min(1, Math.sqrt(a)));
}

export function buildQiblaReading(latitude: number, longitude: number): QiblaReading {
  return {
    bearing: calculateQiblaBearing(latitude, longitude),
    distanceKm: calculateKaabaDistance(latitude, longitude),
  };
}

const COMPASS_POINTS = [
  "kuzey",
  "kuzeydoğu",
  "doğu",
  "güneydoğu",
  "güney",
  "güneybatı",
  "batı",
  "kuzeybatı",
] as const;

export function describeDirection(bearing: number): string {
  const index = Math.round(normalizeDegrees(bearing) / 45) % COMPASS_POINTS.length;
  return COMPASS_POINTS[index]!;
}

export function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)} m`;
  if (km < 100) return `${km.toFixed(1).replace(".", ",")} km`;
  return `${Math.round(km).toLocaleString("tr-TR")} km`;
}

export function formatBearing(bearing: number): string {
  return `${Math.round(normalizeDegrees(bearing))}°`;
}
