"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForgotPassword } from "@/src/hooks/auth/useForgotPassword";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/src/validations/auth.validation";

export default function ForgotPasswordPage() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { mutate: forgotPassword, isPending } = useForgotPassword({
    setError,
    onSuccess: (message) => setSuccessMessage(message),
  });

  const onSubmit = (data: ForgotPasswordFormValues) => {
    forgotPassword(data);
  };

  return (
    <div>
      <h1>Şifremi Unuttum</h1>

      {successMessage ? (
        <div>
          <p style={{ color: "green" }}>{successMessage}</p>
          <p>E-posta adresinize şifre sıfırlama bağlantısı gönderildi.</p>
          <Link href="/login">Giriş sayfasına dön</Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email">E-posta</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register("email")}
            />
            {errors.email && (
              <p style={{ color: "red" }}>{errors.email.message}</p>
            )}
          </div>

          {errors.root && <p style={{ color: "red" }}>{errors.root.message}</p>}

          <button type="submit" disabled={isPending}>
            {isPending ? "Gönderiliyor..." : "Sıfırlama Bağlantısı Gönder"}
          </button>

          <Link href="/login">Giriş sayfasına dön</Link>
        </form>
      )}
    </div>
  );
}
