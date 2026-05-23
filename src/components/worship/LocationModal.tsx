"use client";

import React, { useMemo, useState } from "react";
import { Dialog } from "@/src/components/ui/Dialog";
import {
  COORDINATE_PRECISION,
  TEXTS,
  TURKISH_CITIES,
} from "@/src/constants/worship";
import { GeolocationStatus } from "@/src/types/enums/worship.enums";
import type { City } from "@/src/types/worship.types";
import { cn } from "@/src/lib/utils";
import { PinIcon } from "./icons/ControlIcons";

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeCityId: string;
  onSelect: (city: City) => void;
  onUseGeolocation: () => void;
  geoStatus: GeolocationStatus;
  geoError?: string | null;
}

const normalize = (value: string): string =>
  value.trim().toLocaleLowerCase("tr-TR");

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  activeCityId,
  onSelect,
  onUseGeolocation,
  geoStatus,
  geoError,
}) => {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const term = normalize(search);
    if (!term) return TURKISH_CITIES;
    return TURKISH_CITIES.filter((city) =>
      normalize(city.name).includes(term)
    );
  }, [search]);

  const isRequestingGeo = geoStatus === GeolocationStatus.Loading;
  const geoUnsupported = geoStatus === GeolocationStatus.Unsupported;
  const geoDenied = geoStatus === GeolocationStatus.Denied;
  const geoFailed = geoStatus === GeolocationStatus.Failed;
  const showGeoError =
    Boolean(geoError) && (geoDenied || geoFailed || geoUnsupported);

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      header={
        <h2 className="text-lg font-extrabold tracking-wide text-white">
          {TEXTS.locationModalTitle}
        </h2>
      }
      maxWidth="md"
    >
      <div className="flex flex-col gap-3 px-5 pb-6 pt-4">
        <button
          type="button"
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-0 bg-[var(--color-primary)] px-3.5 py-3 text-xs font-black uppercase leading-none tracking-[0.1em] text-white shadow-[0_5px_0_0_var(--color-primary-dark)] transition-all duration-100 hover:brightness-110 active:translate-y-[3px] active:shadow-[0_2px_0_0_var(--color-primary-dark)] disabled:cursor-not-allowed disabled:opacity-60"
          onClick={onUseGeolocation}
          disabled={isRequestingGeo || geoUnsupported}
        >
          <PinIcon width={14} height={14} />
          {isRequestingGeo ? "Konum alınıyor…" : TEXTS.locationModalUseGeo}
        </button>

        {showGeoError && (
          <div
            className="flex items-start gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs font-semibold text-rose-200"
            role="status"
          >
            <span aria-hidden="true">!</span>
            <span>{geoError}</span>
          </div>
        )}

        <input
          type="search"
          className="w-full rounded-2xl border-2 border-[#2a3d3b] bg-[#1a2b2a] px-3.5 py-3 text-sm font-bold text-white outline-none transition-colors duration-150 focus:border-[var(--color-primary-light)]"
          placeholder={TEXTS.locationModalSearchPlaceholder}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label={TEXTS.locationModalSearchPlaceholder}
        />

        {filtered.length === 0 ? (
          <div className="px-6 py-6 text-center text-sm font-bold text-[var(--color-text-muted)]">
            {TEXTS.locationModalEmpty}
          </div>
        ) : (
          <ul className="m-0 flex max-h-80 list-none flex-col gap-1.5 overflow-y-auto p-0 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar]:w-1.5">
            {filtered.map((city) => {
              const isActive = city.id === activeCityId;
              return (
                <li key={city.id}>
                  <button
                    type="button"
                    className={cn(
                      "flex w-full cursor-pointer items-center justify-between rounded-xl border px-3.5 py-3 text-left font-extrabold transition-all duration-150",
                      isActive
                        ? "border-[var(--color-primary-light)] bg-[var(--color-primary)]/10 text-[var(--color-primary-light)]"
                        : "border-white/5 bg-white/[0.03] text-white hover:border-[var(--color-primary-light)]/30 hover:bg-[var(--color-primary)]/10"
                    )}
                    onClick={() => onSelect(city)}
                    aria-pressed={isActive}
                  >
                    <span>{city.name}</span>
                    <span className="text-[11px] font-bold tabular-nums text-white/40">
                      {city.lat.toFixed(COORDINATE_PRECISION)}°,{" "}
                      {city.lng.toFixed(COORDINATE_PRECISION)}°
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </Dialog>
  );
};
