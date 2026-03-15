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

export default function ProfileSettingsPage() {
  const { user } = useAuthStore();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
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

  return (
    <div>
      <h1>Profil Ayarları</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">E-posta</label>
          <input id="email" type="email" value={user?.email ?? ""} disabled />
        </div>
        <div>
          <label htmlFor="username">Kullanıcı Adı</label>
          <input
            id="username"
            type="text"
            autoComplete="username"
            {...register("username")}
          />
          {errors.username && (
            <p style={{ color: "red" }}>{errors.username.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="avatar">Avatar URL</label>
          <input
            id="avatar"
            type="text"
            placeholder="https://example.com/avatar.png"
            {...register("avatar")}
          />
          {errors.avatar && (
            <p style={{ color: "red" }}>{errors.avatar.message}</p>
          )}
        </div>

        <hr />
        <h2>Şifre Değiştir</h2>
        <div>
          <label htmlFor="currentPassword">Mevcut Şifre</label>
          <input
            id="currentPassword"
            type="password"
            autoComplete="current-password"
            {...register("currentPassword")}
          />
          {errors.currentPassword && (
            <p style={{ color: "red" }}>{errors.currentPassword.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="newPassword">Yeni Şifre</label>
          <input
            id="newPassword"
            type="password"
            autoComplete="new-password"
            {...register("newPassword")}
          />
          {errors.newPassword && (
            <p style={{ color: "red" }}>{errors.newPassword.message}</p>
          )}
        </div>

        {errors.root && <p style={{ color: "red" }}>{errors.root.message}</p>}

        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

        <button type="submit" disabled={isPending}>
          {isPending ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </form>
    </div>
  );
}
