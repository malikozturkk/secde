"use client";

import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRegister } from "@/src/hooks/auth/useRegister";
import {
  registerSchema,
  type RegisterFormValues,
} from "@/src/validations/auth.validation";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { Select } from "@/src/components/ui/Select";
import { Radio, RadioGroup } from "@/src/components/ui/Radio";
import { ConsentCheckbox } from "@/src/components/consent/ConsentCheckbox";
import {
  DEFAULT_COUNTRY,
  DEFAULT_LANGUAGE,
  GENDER_OPTIONS,
  LANGUAGE_OPTIONS,
  MADHAB_OPTIONS,
} from "@/src/constants/registration";
import { LocationField, type LocationValue } from "./LocationField";

const fieldLabelClass =
  "px-1 text-[13px] font-bold text-[rgba(255,255,255,0.6)]";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    setError,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      country: DEFAULT_COUNTRY,
      city: "",
      language: DEFAULT_LANGUAGE,
    },
    mode: "onChange",
  });

  const { mutate: registerUser, isPending } = useRegister({ setError });

  const termsAccepted = useWatch({ control, name: "termsAccepted" });
  const privacyAccepted = useWatch({
    control,
    name: "privacyPolicyAccepted",
  });
  const location = useWatch({
    control,
    name: ["country", "city", "latitude", "longitude"],
  });
  const consentsMissing = !termsAccepted || !privacyAccepted;

  const locationValue: Partial<LocationValue> = {
    country: location?.[0],
    city: location?.[1],
    latitude: location?.[2],
    longitude: location?.[3],
  };

  const locationError =
    errors.city?.message ??
    errors.country?.message ??
    errors.latitude?.message ??
    errors.longitude?.message;

  const handleLocationChange = (next: LocationValue) => {
    setValue("country", next.country, { shouldValidate: true });
    setValue("city", next.city, { shouldValidate: true });
    setValue("latitude", next.latitude, { shouldValidate: true });
    setValue("longitude", next.longitude, { shouldValidate: true });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit((data) => registerUser(data))(e);
  };

  return (
    <div className="min-h-screen bg-[#070F12] flex flex-col">
      <header className="w-full flex items-center justify-between px-6 py-5 flex-shrink-0">
        <Link
          href="/"
          className="text-2xl text-white hover:opacity-80 transition-opacity select-none"
          style={{
            fontFamily: "'Fredoka One', cursive",
            letterSpacing: "0.5px",
          }}
        >
          NamazGo
        </Link>

        <Link href="/login">
          <Button variant="ghost" size="sm">
            GİRİŞ
          </Button>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-[400px] flex flex-col gap-6">
          <h1 className="text-center text-white text-2xl font-bold">
            Hesap Oluştur
          </h1>

          {errors.root && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-2xl px-4 py-3">
              <span
                className="text-red-400 text-sm font-semibold"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                {errors.root.message}
              </span>
            </div>
          )}

          <form
            onSubmit={handleFormSubmit}
            className="flex flex-col gap-4"
            noValidate
          >
            <Input
              type="text"
              autoComplete="username"
              placeholder="Kullanıcı adı"
              error={errors.username?.message}
              {...register("username")}
            />

            <Input
              type="email"
              autoComplete="email"
              placeholder="E-posta adresi"
              error={errors.email?.message}
              {...register("email")}
            />

            <Input
              type="password"
              autoComplete="new-password"
              placeholder="Şifre"
              error={errors.password?.message}
              {...register("password")}
            />

            <div className="flex flex-col gap-1.5">
              <span className={fieldLabelClass}>Cinsiyet</span>
              <Controller
                control={control}
                name="gender"
                render={({ field }) => (
                  <RadioGroup
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    columns={2}
                    aria-label="Cinsiyet"
                  >
                    {GENDER_OPTIONS.map((option) => (
                      <Radio
                        key={option.value}
                        value={option.value}
                        label={option.label}
                      />
                    ))}
                  </RadioGroup>
                )}
              />
              {errors.gender?.message && (
                <p
                  role="alert"
                  className="flex items-center gap-1.5 px-1 text-[13px] font-semibold text-red-400"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                    !
                  </span>
                  {errors.gender.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <span className={fieldLabelClass}>Konum</span>
              <LocationField
                value={locationValue}
                onChange={handleLocationChange}
                error={locationError}
              />
            </div>

            <Controller
              control={control}
              name="madhab"
              render={({ field }) => (
                <Select
                  label="Mezhep"
                  placeholder="Mezhep seçiniz"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  options={MADHAB_OPTIONS}
                  error={errors.madhab?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="language"
              render={({ field }) => (
                <Select
                  label="Dil"
                  placeholder="Dil seçiniz"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  options={LANGUAGE_OPTIONS}
                  error={errors.language?.message}
                />
              )}
            />

            <div className="mt-1 flex flex-col gap-2">
              <ConsentCheckbox
                consentType="TERMS_OF_SERVICE"
                error={errors.termsAccepted?.message}
                {...register("termsAccepted")}
              />
              <ConsentCheckbox
                consentType="PRIVACY_POLICY"
                error={errors.privacyPolicyAccepted?.message}
                {...register("privacyPolicyAccepted")}
              />
            </div>

            <div className="mt-1">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isPending || consentsMissing}
                title={
                  consentsMissing
                    ? "Devam etmek için yukarıdaki iki kutuyu da işaretlemelisin"
                    : undefined
                }
              >
                {isPending ? "Kaydediliyor..." : "KAYIT OL"}
              </Button>
            </div>
          </form>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[rgba(255,255,255,0.1)]" />
            <span
              className="text-[rgba(255,255,255,0.4)] text-[13px] font-bold tracking-widest"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              VEYA
            </span>
            <div className="flex-1 h-px bg-[rgba(255,255,255,0.1)]" />
          </div>

          <p
            className="text-center text-[rgba(255,255,255,0.45)] text-[14px]"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Zaten hesabın var mı?{" "}
            <Link
              href="/login"
              className="text-[#25B49A] font-extrabold hover:text-[#4FC3F7] transition-colors"
            >
              Giriş yap
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
