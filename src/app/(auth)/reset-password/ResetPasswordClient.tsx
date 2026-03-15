"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResetPassword } from "@/src/hooks/auth/useResetPassword";
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/src/validations/auth.validation";

interface ResetPasswordClientProps {
  userId: string;
  token: string;
}

export default function ResetPasswordClient({
  userId,
  token,
}: ResetPasswordClientProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const { mutate: resetPassword, isPending } = useResetPassword({
    userId,
    token,
    setError,
  });

  const onSubmit = (data: ResetPasswordFormValues) => {
    resetPassword(data);
  };

  return (
    <div>
      <h1>Yeni Şifre Belirle</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
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

        <div>
          <label htmlFor="confirmPassword">Şifre Tekrar</label>
          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>
          )}
        </div>

        {errors.root && <p style={{ color: "red" }}>{errors.root.message}</p>}

        <button type="submit" disabled={isPending}>
          {isPending ? "Kaydediliyor..." : "Şifreyi Güncelle"}
        </button>
      </form>
    </div>
  );
}
