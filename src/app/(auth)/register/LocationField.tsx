"use client";

import React, { useCallback, useMemo, useState } from "react";
import { MapPin, LoaderCircle, Check } from "lucide-react";
import { Select, type SelectOption } from "@/src/components/ui/Select";
import { useGeolocation } from "@/src/hooks/worship/useGeolocation";
import { GeolocationStatus } from "@/src/types/enums/worship.enums";
import type { Coordinates } from "@/src/types/worship.types";
import {
  COUNTRY_OPTIONS,
  DEFAULT_COUNTRY,
  TR_CITIES,
} from "@/src/constants/registration";
import {
  isTurkey,
  matchTrCity,
  nearestTrCity,
  reverseGeocode,
} from "@/src/lib/geocode";

export interface LocationValue {
  country: string;
  city: string;
  latitude: number;
  longitude: number;
}

interface LocationFieldProps {
  value: Partial<LocationValue>;
  onChange: (next: LocationValue) => void;
  error?: string;
}

const OUTSIDE_TR_DISTANCE_KM = 600;

export const LocationField: React.FC<LocationFieldProps> = ({
  value,
  onChange,
  error,
}) => {
  const [resolving, setResolving] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const [hint, setHint] = useState<string | null>(null);

  const cityOptions = useMemo<SelectOption[]>(
    () => TR_CITIES.map((c) => ({ value: c.city, label: c.city })),
    []
  );

  const applyCity = useCallback(
    (cityName: string, latitude: number, longitude: number) => {
      onChange({
        country: DEFAULT_COUNTRY,
        city: cityName,
        latitude,
        longitude,
      });
    },
    [onChange]
  );

  const resolveFromCoords = useCallback(
    async (latitude: number, longitude: number) => {
      setResolving(true);
      setHint(null);
      setNote(null);
      try {
        const geo = await reverseGeocode(latitude, longitude).catch(() => null);

        if (geo && !isTurkey(geo.countryCode)) {
          setHint(
            "Konumun Türkiye dışında görünüyor. Şu an yalnızca Türkiye destekleniyor — lütfen ilini elle seç."
          );
          return;
        }
        const matched = geo ? matchTrCity(geo.province, geo.city) : undefined;

        if (matched) {
          applyCity(matched.city, latitude, longitude);
          setNote(`Konumun: ${matched.city}`);
          return;
        }

        const nearest = nearestTrCity(latitude, longitude);
        if (nearest.distanceKm > OUTSIDE_TR_DISTANCE_KM) {
          setHint("Konumun belirlenemedi. Lütfen ilini aşağıdan elle seç.");
          return;
        }
        applyCity(nearest.city.city, latitude, longitude);
        setNote(`Konumun: ${nearest.city.city}`);
      } finally {
        setResolving(false);
      }
    },
    [applyCity]
  );

  const handleGeoSuccess = useCallback(
    (coords: Coordinates) => {
      void resolveFromCoords(coords.lat, coords.lng);
    },
    [resolveFromCoords]
  );

  const {
    status: geoStatus,
    error: geoError,
    request: requestGeolocation,
  } = useGeolocation({ onSuccess: handleGeoSuccess });

  const handleCitySelect = useCallback(
    (cityName: string) => {
      const found = TR_CITIES.find((c) => c.city === cityName);
      if (!found) return;
      setNote(null);
      setHint(null);
      applyCity(found.city, found.latitude, found.longitude);
    },
    [applyCity]
  );

  const isLoading = resolving || geoStatus === GeolocationStatus.Loading;
  const statusMessage =
    hint ??
    (geoStatus === GeolocationStatus.Denied
      ? "Konum izni verilmedi. Lütfen ülke ve ilini elle seç."
      : geoStatus === GeolocationStatus.Unsupported ||
        geoStatus === GeolocationStatus.Failed
      ? geoError ?? "Konum alınamadı. Lütfen ilini elle seç."
      : null);

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={requestGeolocation}
        disabled={isLoading}
        className={[
          "flex h-14 w-full items-center justify-center gap-2 rounded-2xl border-2",
          "border-[#25B49A]/40 bg-[#25B49A]/10 text-[15px] font-bold text-[#25B49A]",
          "transition-colors duration-150 hover:bg-[#25B49A]/15",
          "disabled:cursor-not-allowed disabled:opacity-60",
        ].join(" ")}
        style={{ fontFamily: "'Nunito', sans-serif" }}
      >
        {isLoading ? (
          <LoaderCircle size={18} className="animate-spin" />
        ) : (
          <MapPin size={18} />
        )}
        {isLoading ? "Konum alınıyor..." : "Konumumu kullan"}
      </button>

      {note && (
        <p
          className="flex items-center gap-1.5 px-1 text-[13px] font-semibold text-[#25B49A]"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          <Check size={14} className="shrink-0" />
          {note}
        </p>
      )}

      {statusMessage && (
        <p
          className="px-1 text-[13px] font-medium text-[rgba(255,255,255,0.5)]"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          {statusMessage}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Select
          placeholder="Ülke"
          value={value.country ?? DEFAULT_COUNTRY}
          onChange={() => undefined}
          options={COUNTRY_OPTIONS}
          disabled
        />
        <Select
          placeholder="Şehir seçiniz"
          value={value.city || undefined}
          onChange={handleCitySelect}
          options={cityOptions}
          error={error}
        />
      </div>
    </div>
  );
};
