"use client";

import React, { useCallback, useMemo, useState } from "react";
import { MapPin } from "lucide-react";
import AppLayout from "@/src/components/layout/AppLayout";
import { getDomainErrorCode } from "@/src/lib/api-error";
import { nearestTrCity } from "@/src/lib/geocode";
import { useWorshipController } from "@/src/hooks/worship/useWorshipController";
import { LocationNotSetDialog } from "@/src/components/common/LocationNotSetDialog";
import { ControlBar } from "./ControlBar";
import { DayOverview } from "./DayOverview";
import { FastingCard } from "./FastingCard";
import { HeroCard } from "./HeroCard";
import { PageHead } from "./PageHead";
import { PrayerList } from "./PrayerList";
import { HijriCard } from "./rail/HijriCard";
import { LocationCard } from "./rail/LocationCard";
import { MethodCard } from "./rail/MethodCard";
import { EmptyState } from "./states/EmptyState";
import { ErrorState } from "./states/ErrorState";
import { InfoState } from "./states/InfoState";
import { LoadingState } from "./states/LoadingState";

const WorshipView: React.FC = () => {
  const {
    selectedDate,
    setSelectedDate,
    goToPrevDay,
    goToNextDay,
    goToToday,
    worship,
    refresh,
  } = useWorshipController();
  const locationNotSet =
    worship.isError &&
    getDomainErrorCode(worship.error) === "USER_LOCATION_NOT_SET";

  const [locationDialogDismissed, setLocationDialogDismissed] = useState(false);

  const handleDateChange = useCallback(
    (next: string) => setSelectedDate(next),
    [setSelectedDate]
  );

  const locationName = useMemo(() => {
    if (!worship.data) return "";
    return nearestTrCity(
      worship.data.meta.latitude,
      worship.data.meta.longitude
    ).city.city;
  }, [worship.data]);

  const renderState = () => {
    if (locationNotSet) {
      return (
        <InfoState
          icon={<MapPin size={32} />}
          title="Konumun ayarlı değil"
          body="Namaz vakitlerini gösterebilmemiz için hesabında bir konum kayıtlı olmalı. Ayarlardan konumunu belirleyebilirsin."
          primaryAction={{
            label: "Ayarlara git",
            onClick: () => setLocationDialogDismissed(false),
          }}
        />
      );
    }
    if (worship.isLoading || worship.isPending) {
      return <LoadingState />;
    }
    if (worship.isError) {
      return <ErrorState onRetry={() => worship.refetch()} />;
    }
    if (!worship.data) {
      return <EmptyState onChangeDate={goToToday} />;
    }
    const data = worship.data;
    return (
      <>
        <ControlBar
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
          onPrevDay={goToPrevDay}
          onNextDay={goToNextDay}
          onToday={goToToday}
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

  const showRail = !!worship.data && !locationNotSet;

  return (
    <AppLayout
      rightPanel={
        showRail &&
        worship.data && (
          <div className="flex flex-col gap-4 max-[1280px]:grid  max-[1280px]:gap-3 grid-cols-1">
            <HijriCard meta={worship.data.meta} />
            <LocationCard
              meta={worship.data.meta}
              locationName={locationName}
            />
            <MethodCard meta={worship.data.meta} />
          </div>
        )
      }
    >
      <div aria-label="Namaz Vakitleri" className="flex min-w-0 flex-col gap-6">
        {renderState()}
      </div>

      <LocationNotSetDialog
        isOpen={locationNotSet && !locationDialogDismissed}
        onClose={() => setLocationDialogDismissed(true)}
      />
    </AppLayout>
  );
};

export default WorshipView;
