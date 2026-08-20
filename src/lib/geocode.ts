import { TR_CITIES, type TrCity } from "@/src/constants/registration";

const normalizeTr = (value: string): string =>
  value
    .replace(/İ/g, "i")
    .replace(/I/g, "i")
    .replace(/ı/g, "i")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");

const EARTH_RADIUS_KM = 6371;

const toRadians = (deg: number): number => (deg * Math.PI) / 180;

export const haversineKm = (
  aLat: number,
  aLng: number,
  bLat: number,
  bLng: number
): number => {
  const dLat = toRadians(bLat - aLat);
  const dLng = toRadians(bLng - aLng);
  const lat1 = toRadians(aLat);
  const lat2 = toRadians(bLat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.min(1, Math.sqrt(h)));
};

export interface NearestTrCity {
  city: TrCity;
  distanceKm: number;
}

export const nearestTrCity = (
  latitude: number,
  longitude: number
): NearestTrCity =>
  TR_CITIES.reduce<NearestTrCity>(
    (best, candidate) => {
      const distanceKm = haversineKm(
        latitude,
        longitude,
        candidate.latitude,
        candidate.longitude
      );
      return distanceKm < best.distanceKm
        ? { city: candidate, distanceKm }
        : best;
    },
    { city: TR_CITIES[0], distanceKm: Number.POSITIVE_INFINITY }
  );

export const matchTrCity = (
  ...candidates: Array<string | undefined | null>
): TrCity | undefined => {
  for (const candidate of candidates) {
    if (!candidate) continue;
    const target = normalizeTr(candidate);
    if (!target) continue;
    const found = TR_CITIES.find((c) => normalizeTr(c.city) === target);
    if (found) return found;
  }
  return undefined;
};
