"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/src/store/auth.store";
import { useUpdateProfile } from "@/src/hooks/auth/useUpdateProfile";
import {
  updateProfileSchema,
  type UpdateProfileFormValues,
} from "@/src/validations/auth.validation";
import AppLayout from "@/src/components/layout/AppLayout";
import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/Button";
import DefaultAvatar from "@/src/app/profile/[username]/DefaultAvatar";
import { useLogout } from "@/src/hooks/auth/useLogout";
import { Pencil, Eye, EyeOff } from "lucide-react";

export default function ProfileSettings() {
  const { user } = useAuthStore();
  const { mutate: logout } = useLogout();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setError,
    reset,
  } = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      username: user?.username ?? "",
      avatar: user?.avatar ?? "",
      currentPassword: "",
      newPassword: "",
    },
  });

  useEffect(() => {
    reset({
      username: user?.username ?? "",
      avatar: user?.avatar ?? "",
      currentPassword: "",
      newPassword: "",
    });
  }, [user, reset]);

  const { mutate: updateProfile, isPending } = useUpdateProfile({
    setError,
    onSuccess: () => {
      reset((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
      }));
      setSuccessMessage("Profil başarıyla güncellendi.");
      setTimeout(() => setSuccessMessage(null), 3000);
    },
  });

  const onSubmit = (data: UpdateProfileFormValues) => {
    setSuccessMessage(null);
    updateProfile(data);
  };

  const rightPanelContent = (
    <div className="flex flex-col gap-4 w-full">
      <div className="border-2 border-[rgba(255,255,255,0.15)] rounded-2xl flex flex-col py-2 overflow-hidden">
        <div className="py-2 px-6 text-xl font-extrabold text-white">
          Abonelik
        </div>
        <div className="list-none m-0 p-0 flex flex-col gap-1 pt-0 p-4">
          <button className="py-3 px-6 text-[15px] font-bold text-[rgba(255,255,255,0.55)] cursor-pointer block no-underline transition-all bg-transparent border-none text-left hover:bg-[#1a2b2a]">
            Tercihler
          </button>
          <button className="py-3 px-6 text-[15px] font-bold text-white bg-white/5 cursor-pointer block no-underline transition-all border-none text-left hover:bg-[#1a2b2a]">
            Profil
          </button>
          <button className="py-3 px-6 text-[15px] font-bold text-[rgba(255,255,255,0.55)] cursor-pointer block no-underline transition-all bg-transparent border-none text-left hover:bg-[#1a2b2a]">
            Bildirimler
          </button>
          <button className="py-3 px-6 text-[15px] font-bold text-[rgba(255,255,255,0.55)] cursor-pointer block no-underline transition-all bg-transparent border-none text-left hover:bg-[#1a2b2a]">
            Sosyal hesaplar
          </button>
          <button className="py-3 px-6 text-[15px] font-bold text-[rgba(255,255,255,0.55)] cursor-pointer block no-underline transition-all bg-transparent border-none text-left hover:bg-[#1a2b2a]">
            Gizlilik ayarları
          </button>
        </div>
      </div>

      <div className="border-2 border-[rgba(255,255,255,0.15)] rounded-2xl flex flex-col py-2 overflow-hidden">
        <div className="py-2 px-6 text-xl font-extrabold text-white">
          Abonelik
        </div>
        <div className="list-none m-0 p-0 flex flex-col gap-1 pt-0 p-4">
          <button className="py-3 px-6 text-[15px] font-bold text-[rgba(255,255,255,0.55)] cursor-pointer block no-underline transition-all bg-transparent border-none text-left hover:bg-[#1a2b2a]">
            Bir plan seç
          </button>
        </div>
      </div>

      <div className="border-2 border-[rgba(255,255,255,0.15)] rounded-2xl flex flex-col py-2 overflow-hidden">
        <div className="py-2 px-6 text-xl font-extrabold text-white">
          Destek
        </div>
        <div className="list-none m-0 p-0 flex flex-col gap-1 pt-0 p-4">
          <button className="py-3 px-6 text-[15px] font-bold text-[rgba(255,255,255,0.55)] cursor-pointer block no-underline transition-all bg-transparent border-none text-left hover:bg-[#1a2b2a]">
            Yardım Merkezi
          </button>
        </div>
      </div>

      <button
        className="w-full py-4 bg-transparent text-[#4fc3f7] font-extrabold text-sm border-2 border-[rgba(255,255,255,0.15)] rounded-2xl cursor-pointer uppercase tracking-wide transition-colors hover:bg-[#1a2b2a]"
        onClick={() => logout()}
      >
        OTURUMU KAPAT
      </button>
    </div>
  );

  return (
    <AppLayout rightPanel={rightPanelContent}>
      <h1 className="text-2xl font-extrabold text-white mb-6 font-sans">
        Profil
      </h1>

      <div className="flex flex-col mb-6">
        <div className="text-base font-extrabold text-white mb-3 font-sans">
          Avatar
        </div>
        <div className="relative w-[90px] h-[90px]">
          {user && (
            <div
              className="w-full h-full rounded-full border-2 border-[rgba(255,255,255,0.15)] flex items-center justify-center overflow-hidden"
              style={{
                backgroundColor: user.avatarCustomization.colors.background,
              }}
            >
              <DefaultAvatar
                username={user.username || "A"}
                config={user.avatarCustomization}
              />
            </div>
          )}
          <button
            className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#4fc3f7] flex items-center justify-center border-2 border-[#070F12] text-white"
            aria-label="Edit Avatar"
            type="button"
          >
            <Pencil size={14} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 mb-6">
          <Input
            id="username"
            label="Kullanıcı adı"
            type="text"
            placeholder="Kullanıcı adı"
            autoComplete="username"
            error={errors.username?.message}
            {...register("username")}
          />

          <div>
            <Input
              id="email"
              label="E-posta"
              type="email"
              placeholder="E-posta"
              autoComplete="email"
              defaultValue={user?.email}
              disabled
            />
          </div>

          <Input
            id="currentPassword"
            label="Mevcut parola"
            type={showCurrentPassword ? "text" : "password"}
            placeholder="Mevcut parola"
            autoComplete="current-password"
            error={errors.currentPassword?.message}
            suffix={
              <button
                type="button"
                className="text-[#4fc3f7] cursor-pointer bg-transparent border-none p-1 flex items-center justify-center transition-opacity hover:opacity-80"
                onClick={() => setShowCurrentPassword((prev) => !prev)}
              >
                {showCurrentPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            }
            {...register("currentPassword")}
          />

          <Input
            id="newPassword"
            label="Yeni parola"
            type={showNewPassword ? "text" : "password"}
            placeholder="Yeni parola"
            autoComplete="new-password"
            error={errors.newPassword?.message}
            suffix={
              <button
                type="button"
                className="text-[#4fc3f7] cursor-pointer bg-transparent border-none p-1 flex items-center justify-center transition-opacity hover:opacity-80"
                onClick={() => setShowNewPassword((prev) => !prev)}
              >
                {showNewPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            }
            {...register("newPassword")}
          />
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

          <div className="flex flex-col gap-4 mt-8">
            <button
              type="button"
              className="text-[13px] font-extrabold text-[rgba(255,255,255,0.55)] uppercase bg-transparent border-none cursor-pointer text-left p-0 tracking-wide hover:text-white"
            >
              VERİLERİMİ DIŞA AKTAR
            </button>
            <button
              type="button"
              className="text-[13px] font-extrabold text-[#ff4b4b] uppercase bg-transparent border-none cursor-pointer text-left p-0 tracking-wide hover:text-[#ff7979]"
            >
              HESABIMI SİL
            </button>
          </div>
        </div>
      </form>
    </AppLayout>
  );
}
