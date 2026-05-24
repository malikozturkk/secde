"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import AppLayout from "@/src/components/layout/AppLayout";
import { DEFAULT_CITY } from "@/src/constants/worship";
import {
  buildLocalDateString,
  formatRelativeDate,
  formatLongDate,
} from "@/src/lib/worship-utils";
import { useWorshipController } from "@/src/hooks/worship/useWorshipController";
import {
  GeolocationStatus,
  WorshipPageState,
} from "@/src/types/enums/worship.enums";
import type { City } from "@/src/types/worship.types";
import { ControlBar } from "./ControlBar";
import { DayOverview } from "./DayOverview";
import { FastingCard } from "./FastingCard";
import { HeroCard } from "./HeroCard";
import { LocationModal } from "./LocationModal";
import { PageHead } from "./PageHead";
import { PrayerList } from "./PrayerList";
import { HijriCard } from "./rail/HijriCard";
import { LocationCard } from "./rail/LocationCard";
import { MethodCard } from "./rail/MethodCard";
import { WorshipSettingsModal } from "./WorshipSettingsModal";
import { EmptyState } from "./states/EmptyState";
import { ErrorState } from "./states/ErrorState";
import { GeoDeniedState } from "./states/GeoDeniedState";
import { LoadingState } from "./states/LoadingState";
import { NoLocationState } from "./states/NoLocationState";

const WorshipView: React.FC = () => {
  const {
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
    worship,
    refresh,
    pageState,
    setPageState,
  } = useWorshipController();

  const [isLocationModalOpen, setLocationModalOpen] = useState(false);
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
  const [hasUserChosenCity, setHasUserChosenCity] = useState(false);

  useEffect(() => {
    const hasUsableCity = hasUserChosenCity || city.id !== DEFAULT_CITY.id;
    if (geoStatus === GeolocationStatus.Denied) {
      if (!hasUsableCity) setPageState(WorshipPageState.GeoDenied);
    } else if (
      geoStatus === GeolocationStatus.Failed ||
      geoStatus === GeolocationStatus.Unsupported
    ) {
      if (!hasUsableCity) setPageState(WorshipPageState.NoLocation);
    } else if (
      pageState === WorshipPageState.GeoDenied ||
      pageState === WorshipPageState.NoLocation
    ) {
      if (
        geoStatus === GeolocationStatus.Granted ||
        hasUsableCity ||
        geoStatus === GeolocationStatus.Idle
      ) {
        setPageState(WorshipPageState.Normal);
      }
    }
  }, [geoStatus, pageState, setPageState, city.id, hasUserChosenCity]);

  const locationLabel = useMemo(() => city.name, [city.name]);

  const dateLabel = useMemo(() => {
    const todayIso = buildLocalDateString(new Date());
    const relative = formatRelativeDate(selectedDate, todayIso);
    const long = formatLongDate(selectedDate);
    return `${relative} · ${long.replace(/\s\d{4}$/, "")}`;
  }, [selectedDate]);

  const handleDateChange = useCallback(
    (next: string) => setSelectedDate(next),
    [setSelectedDate]
  );

  const handleOpenLocation = useCallback(() => setLocationModalOpen(true), []);
  const handleCloseLocation = useCallback(
    () => setLocationModalOpen(false),
    []
  );

  const handleCitySelect = useCallback(
    (selected: City) => {
      setCity(selected);
      setHasUserChosenCity(true);
      setLocationModalOpen(false);
      resetGeolocation();
      setPageState(WorshipPageState.Normal);
    },
    [resetGeolocation, setCity, setPageState]
  );

  const handleGeoRequest = useCallback(() => {
    requestGeolocation();
  }, [requestGeolocation]);

  const handleUseDefault = useCallback(() => {
    setCity(DEFAULT_CITY);
    setHasUserChosenCity(true);
    setPageState(WorshipPageState.Normal);
  }, [setCity, setPageState]);

  const handleOpenSettings = useCallback(() => setSettingsModalOpen(true), []);

  const renderState = () => {
    if (pageState === WorshipPageState.GeoDenied) {
      return (
        <GeoDeniedState
          onRetry={handleGeoRequest}
          onManualSelect={() => {
            setPageState(WorshipPageState.Normal);
            setLocationModalOpen(true);
          }}
        />
      );
    }
    if (pageState === WorshipPageState.NoLocation) {
      return (
        <NoLocationState
          onManualSelect={() => {
            setPageState(WorshipPageState.Normal);
            setLocationModalOpen(true);
          }}
          onUseDefault={handleUseDefault}
        />
      );
    }
    if (worship.isLoading || worship.isPending) {
      return <LoadingState />;
    }
    if (worship.isError) {
      return (
        <ErrorState
          onRetry={() => worship.refetch()}
          onSecondary={handleOpenLocation}
        />
      );
    }
    if (!worship.data) {
      return <EmptyState onChangeDate={goToToday} />;
    }
    const data = worship.data;
    return (
      <>
        <ControlBar
          locationLabel={locationLabel}
          dateLabel={dateLabel}
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
          onPrevDay={goToPrevDay}
          onNextDay={goToNextDay}
          onToday={goToToday}
          onOpenLocation={handleOpenLocation}
          onRefresh={refresh}
        />
        <PageHead meta={data.meta} />
        <HeroCard worship={data} />
        <DayOverview worship={data} />
        <PrayerList times={data.times} />
        <FastingCard fasting={data.fasting} />
      </>
    );
  };

  const showRail =
    !!worship.data &&
    pageState !== WorshipPageState.GeoDenied &&
    pageState !== WorshipPageState.NoLocation;

  return (
    <AppLayout
      rightPanel={
        showRail &&
        worship.data && (
          <div className="flex flex-col gap-4 max-[1280px]:grid max-[1280px]:grid-cols-3 max-[1280px]:gap-3 max-[768px]:grid-cols-1">
            <HijriCard meta={worship.data.meta} />
            <LocationCard
              meta={worship.data.meta}
              locationName={locationLabel}
            />
            <MethodCard
              meta={worship.data.meta}
              onOpenSettings={handleOpenSettings}
            />
          </div>
        )
      }
    >
      <div aria-label="Namaz Vakitleri" className="flex min-w-0 flex-col gap-6">
        {renderState()}
      </div>

      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={handleCloseLocation}
        activeCityId={city.id}
        onSelect={handleCitySelect}
        onUseGeolocation={handleGeoRequest}
        geoStatus={geoStatus}
        geoError={geoError}
      />

      <WorshipSettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        activeMethod={settings.method ?? worship.data?.meta.calculationMethod}
        activeMadhab={settings.madhab ?? worship.data?.meta.madhab}
        onSave={updateSettings}
      />
    </AppLayout>
  );
};

export default WorshipView;
