"use client";

import { useCallback, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  DEFAULT_CITY,
  WORSHIP_QUERY_KEYS,
} from "@/src/constants/worship";
import {
  buildLocalDateString,
  addDays,
  getBrowserTimezone,
} from "@/src/lib/worship-utils";
import {
  GeolocationStatus,
  WorshipPageState,
} from "@/src/types/enums/worship.enums";
import type {
  City,
  Coordinates,
  WorshipQueryParams,
  WorshipSettings,
} from "@/src/types/worship.types";
import { useWorshipTimes } from "./useWorshipTimes";
import { useGeolocation } from "./useGeolocation";
import { useDayChange } from "./useDayChange";

interface UseWorshipControllerResult {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  goToPrevDay: () => void;
  goToNextDay: () => void;
  goToToday: () => void;
  city: City;
  setCity: (city: City) => void;
  geoStatus: GeolocationStatus;
  geoError: string | null;
  requestGeolocation: () => void;
  resetGeolocation: () => void;
  settings: WorshipSettings;
  updateSettings: (next: WorshipSettings) => void;
  queryParams: WorshipQueryParams;
  worship: ReturnType<typeof useWorshipTimes>;
  refresh: () => void;
  pageState: WorshipPageState;
  setPageState: (state: WorshipPageState) => void;
}

export const useWorshipController = (): UseWorshipControllerResult => {
  const queryClient = useQueryClient();
  const [city, setCity] = useState<City>(DEFAULT_CITY);
  const [selectedDate, setSelectedDate] = useState<string>(() =>
    buildLocalDateString(new Date())
  );
  const [pageState, setPageState] = useState<WorshipPageState>(
    WorshipPageState.Normal
  );
  const [settings, setSettings] = useState<WorshipSettings>({});

  const handleGeoSuccess = useCallback((coords: Coordinates) => {
    setCity({
      id: "browser-geo",
      name: "Konumum",
      lat: coords.lat,
      lng: coords.lng,
      timezone: getBrowserTimezone(),
    });
  }, []);

  const {
    status: geoStatus,
    error: geoError,
    request: requestGeolocation,
    reset: resetGeolocation,
  } = useGeolocation({ onSuccess: handleGeoSuccess });

  const timezone = useMemo(
    () => city.timezone || getBrowserTimezone(),
    [city.timezone]
  );

  const queryParams = useMemo<WorshipQueryParams>(
    () => ({
      lat: city.lat,
      lng: city.lng,
      date: selectedDate,
      tz: timezone,
      method: settings.method,
      madhab: settings.madhab,
    }),
    [city.lat, city.lng, selectedDate, timezone, settings.method, settings.madhab]
  );

  const worship = useWorshipTimes(queryParams);

  const refresh = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: WORSHIP_QUERY_KEYS.all });
  }, [queryClient]);

  const goToPrevDay = useCallback(() => {
    setSelectedDate((current) => addDays(current, -1));
  }, []);

  const goToNextDay = useCallback(() => {
    setSelectedDate((current) => addDays(current, 1));
  }, []);

  const goToToday = useCallback(() => {
    setSelectedDate(buildLocalDateString(new Date()));
  }, []);

  const updateSettings = useCallback((next: WorshipSettings) => {
    setSettings((prev) => ({ ...prev, ...next }));
  }, []);

  useDayChange(selectedDate, (today) => {
    if (selectedDate === buildLocalDateString(new Date())) return;
    setSelectedDate(today);
  });

  return {
    selectedDate,
    setSelectedDate,
    goToPrevDay,
    goToNextDay,
    goToToday,
    city,
    setCity,
    geoStatus,
    geoError,
    requestGeolocation,
    resetGeolocation,
    settings,
    updateSettings,
    queryParams,
    worship,
    refresh,
    pageState,
    setPageState,
  };
};
