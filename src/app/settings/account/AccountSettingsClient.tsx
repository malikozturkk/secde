"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/src/store/auth.store";
import { useUpdateProfile } from "@/src/hooks/auth/useUpdateProfile";
import {
  updateProfileSchema,
  type UpdateProfileFormValues,
} from "@/src/validations/auth.validation";
import AppLayout from "@/src/components/layout/AppLayout";
import { Input } from "@/src/components/ui/Input";
import { Select } from "@/src/components/ui/Select";
import { Button } from "@/src/components/ui/Button";
import SettingsRightPanel from "@/src/components/settings/SettingsRightPanel";
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_OPTIONS,
  MADHAB_OPTIONS,
} from "@/src/constants/registration";

export default function AccountSettings() {
  const { user } = useAuthStore();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
    setError,
    reset,
  } = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      language: user?.language ?? DEFAULT_LANGUAGE,
    },
  });

  useEffect(() => {
    reset({
      language: user?.language ?? DEFAULT_LANGUAGE,
    });
  }, [user, reset]);

  const { mutate: updateProfile, isPending } = useUpdateProfile({
    setError,
    onSuccess: () => {
      setSuccessMessage("Tercihler başarıyla güncellendi.");
      setTimeout(() => setSuccessMessage(null), 3000);
    },
  });

  const onSubmit = (data: UpdateProfileFormValues) => {
    setSuccessMessage(null);
    updateProfile({ language: data.language });
  };

  const countryLabel = user?.country ?? "—";
  const cityLabel = user?.city ?? "—";
  const madhabLabel =
    MADHAB_OPTIONS.find((option) => option.value === user?.madhab)?.label ??
    "—";

  return (
    <AppLayout rightPanel={<SettingsRightPanel active="preferences" />}>
      <h1 className="text-2xl font-extrabold text-white mb-6 font-sans">
        Tercihler
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 mb-6">
          <div className="text-base font-extrabold text-white font-sans">
            Profil Bilgileri
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              id="country"
              label="Ülke"
              type="text"
              disabled
              defaultValue={countryLabel}
            />
            <Input
              id="city"
              label="Şehir"
              type="text"
              disabled
              defaultValue={cityLabel}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              id="madhab"
              label="Mezhep"
              type="text"
              disabled
              defaultValue={madhabLabel}
            />
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
              color: "var(--color-primary-light)",
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
