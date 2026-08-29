"use client";

import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/src/store/auth.store";
import { useAuthHydrated } from "@/src/hooks/auth/useAuthHydrated";
import { useUpdateProfile } from "@/src/hooks/auth/useUpdateProfile";
import {
  updateProfileSchema,
  type UpdateProfileFormValues,
} from "@/src/validations/auth.validation";
import AppLayout from "@/src/components/layout/AppLayout";
import { Select } from "@/src/components/ui/Select";
import { Button } from "@/src/components/ui/Button";
import SettingsRightPanel from "@/src/components/settings/SettingsRightPanel";
import {
  LocationField,
  type LocationValue,
} from "@/src/app/(auth)/register/LocationField";
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_OPTIONS,
  MADHAB_OPTIONS,
} from "@/src/constants/registration";
import { TEXT } from "@/src/constants/surface";
import { cn } from "@/src/lib/utils";

export default function AccountSettings() {
  const { user } = useAuthStore();
  const hydrated = useAuthHydrated();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const canChangeLocation = (user?.locationChangeCount ?? 0) < 1;
  const canChangeMadhab = (user?.madhabChangeCount ?? 0) < 1;

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isDirty },
    setError,
    reset,
  } = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      language: user?.language ?? DEFAULT_LANGUAGE,
      country: user?.country ?? undefined,
      city: user?.city ?? undefined,
      madhab: (user?.madhab as "SHAFI" | "HANAFI" | undefined) ?? undefined,
    },
  });

  useEffect(() => {
    reset({
      language: user?.language ?? DEFAULT_LANGUAGE,
      country: user?.country ?? undefined,
      city: user?.city ?? undefined,
      madhab: (user?.madhab as "SHAFI" | "HANAFI" | undefined) ?? undefined,
    });
  }, [user, reset]);

  const location = useWatch({
    control,
    name: ["country", "city"],
  });

  const locationValue: Partial<LocationValue> = {
    country: location?.[0],
    city: location?.[1],
  };

  const handleLocationChange = (next: LocationValue) => {
    setValue("country", next.country, { shouldDirty: true });
    setValue("city", next.city, { shouldDirty: true });
  };

  const { mutate: updateProfile, isPending } = useUpdateProfile({
    setError,
    onSuccess: () => {
      setSuccessMessage("Tercihler başarıyla güncellendi.");
      setTimeout(() => setSuccessMessage(null), 3000);
    },
  });

  const onSubmit = (data: UpdateProfileFormValues) => {
    setSuccessMessage(null);
    const locationChanged =
      !!data.country &&
      !!data.city &&
      (data.country !== user?.country || data.city !== user?.city);
    updateProfile({
      language: data.language,
      ...(data.madhab && { madhab: data.madhab }),
      ...(locationChanged && {
        country: data.country,
        city: data.city,
      }),
    });
  };

  if (!hydrated) {
    return (
      <AppLayout rightPanel={<SettingsRightPanel active="preferences" />}>
        <h1 className={cn(TEXT.h2, "mb-6")}>
          Tercihler
        </h1>
        <div aria-hidden="true" className="flex flex-col gap-4">
          <div className="h-6 w-40 animate-pulse rounded-lg bg-white/[0.06]" />
          <div className="h-14 w-full animate-pulse rounded-[var(--ng-radius)] bg-white/[0.06]" />
          <div className="h-14 w-full animate-pulse rounded-[var(--ng-radius)] bg-white/[0.06]" />
          <div className="h-14 w-full animate-pulse rounded-[var(--ng-radius)] bg-white/[0.06]" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout rightPanel={<SettingsRightPanel active="preferences" />}>
      <h1 className={cn(TEXT.h2, "mb-6")}>
        Tercihler
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 mb-6">
          <div className="text-base font-extrabold text-white font-sans">
            Profil Bilgileri
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-bold text-[var(--ng-text-2)] font-sans">
              Konum
            </span>
            {canChangeLocation ? (
              <>
                <LocationField
                  value={locationValue}
                  onChange={handleLocationChange}
                  error={errors.city?.message ?? errors.country?.message}
                />
                <p className="px-1 text-[12px] font-semibold text-[var(--ng-text-3)]">
                  Namaz vakitleri seçtiğin ile göre hesaplanır. Konumunu{" "}
                  <strong className="text-[var(--ng-text-2)]">yalnızca bir kez</strong>{" "}
                  değiştirebilirsin.
                </p>
              </>
            ) : (
              <>
                <div className="flex h-14 items-center rounded-[var(--ng-radius)] border border-[var(--ng-edge)] bg-[var(--ng-surface-high)] px-4 text-[var(--ng-text-2)]">
                  {user?.city ?? "—"}, {user?.country ?? "—"}
                </div>
                <p className="px-1 text-[12px] font-semibold text-[var(--ng-text-3)]">
                  Konum değiştirme hakkını kullandın.
                </p>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {canChangeMadhab ? (
              <Controller
                control={control}
                name="madhab"
                render={({ field }) => (
                  <Select
                    label="Mezhep"
                    placeholder="Mezhep seçiniz"
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    options={MADHAB_OPTIONS}
                    error={errors.madhab?.message}
                  />
                )}
              />
            ) : (
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-bold text-[var(--ng-text-2)] font-sans">
                  Mezhep
                </span>
                <div className="flex h-14 items-center rounded-[var(--ng-radius)] border border-[var(--ng-edge)] bg-[var(--ng-surface-high)] px-4 text-[var(--ng-text-2)]">
                  {MADHAB_OPTIONS.find((o) => o.value === user?.madhab)
                    ?.label ?? "—"}
                </div>
                <p className="px-1 text-[12px] font-semibold text-[var(--ng-text-3)]">
                  Mezhep değiştirme hakkını kullandın.
                </p>
              </div>
            )}
            <Controller
              control={control}
              name="language"
              render={({ field }) => (
                <Select
                  label="Dil"
                  placeholder="Dil seçiniz"
                  value={field.value ?? DEFAULT_LANGUAGE}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  options={LANGUAGE_OPTIONS}
                  error={errors.language?.message}
                />
              )}
            />
          </div>
        </div>

        {errors.root && (
          <p style={{ color: "red", fontSize: "14px", marginBottom: "16px" }}>
            {errors.root.message}
          </p>
        )}
        {successMessage && (
          <p
            style={{
              color: "var(--ng-green)",
              fontSize: "14px",
              marginBottom: "16px",
              fontWeight: "bold",
            }}
          >
            {successMessage}
          </p>
        )}

        <div className="flex flex-col gap-6 mt-4">
          <div style={{ alignSelf: "flex-start", minWidth: "150px" }}>
            <Button type="submit" disabled={isPending || !isDirty} size="lg">
              {isPending ? "KAYDEDİLİYOR..." : "KAYDET"}
            </Button>
          </div>
        </div>
      </form>
    </AppLayout>
  );
}
