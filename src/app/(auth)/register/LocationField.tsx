"use client";

import React, { useCallback, useMemo } from "react";
import { Select, type SelectOption } from "@/src/components/ui/Select";
import {
  COUNTRY_OPTIONS,
  DEFAULT_COUNTRY,
  TR_CITIES,
} from "@/src/constants/registration";

export interface LocationValue {
  country: string;
  city: string;
}

interface LocationFieldProps {
  value: Partial<LocationValue>;
  onChange: (next: LocationValue) => void;
  error?: string;
}

export const LocationField: React.FC<LocationFieldProps> = ({
  value,
  onChange,
  error,
}) => {
  const cityOptions = useMemo<SelectOption[]>(
    () => TR_CITIES.map((c) => ({ value: c.city, label: c.city })),
    []
  );

  const handleCitySelect = useCallback(
    (cityName: string) => {
      const found = TR_CITIES.find((c) => c.city === cityName);
      if (!found) return;
      onChange({ country: DEFAULT_COUNTRY, city: found.city });
    },
    [onChange]
  );

  return (
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
  );
};
