"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useResetPassword } from "@/src/hooks/auth/useResetPassword";
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/src/validations/auth.validation";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";

interface ResetPasswordClientProps {
  userId: string;
  token: string;
}

export default function ResetPasswordClient({
  userId,
  token,
}: ResetPasswordClientProps) {
  const [success, setSuccess] = useState(false);

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
    resetPassword(data, { onSuccess: () => setSuccess(true) });
  };

  return (
    <div className="min-h-screen bg-[#131f24] flex flex-col">
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
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-10">
        {success ? (
          /* ── SUCCESS STATE ── */
          <div className="w-full max-w-[400px] flex flex-col items-center gap-6 text-center">
            {/* Shield + checkmark icon with glow */}
            <div className="relative flex items-center justify-center">
              <div
                className="absolute w-32 h-32 rounded-full bg-[#25B49A]/10 animate-ping"
                style={{ animationDuration: "2.8s" }}
              />
              <div className="w-24 h-24 rounded-full bg-[#1a2b2a] border-2 border-[#25B49A]/40 flex items-center justify-center shadow-lg shadow-[#25B49A]/10">
                <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
                  {/* Shield */}
                  <path
                    d="M23 4L6 11V22C6 31.4 13.4 40.2 23 42C32.6 40.2 40 31.4 40 22V11L23 4Z"
                    fill="#1e3533"
                    stroke="#25B49A"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  {/* Checkmark */}
                  <path
                    d="M15 23L20.5 28.5L31 18"
                    stroke="#25B49A"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Gold star sparkle top-right */}
                  <path
                    d="M36 7L37 4.5L38 7L40.5 8L38 9L37 11.5L36 9L33.5 8Z"
                    fill="#FFD700"
                    opacity="0.9"
                  />
                </svg>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="text-white text-2xl font-bold">
                Şifren Güncellendi!
              </h1>
              <p
                className="text-[rgba(255,255,255,0.5)] text-[14px] leading-relaxed"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                Yeni şifrenle artık güvende giriş yapabilirsin.
              </p>
            </div>

            {/* Achievement badge */}
            <div className="w-full bg-[#25B49A]/10 border border-[#25B49A]/25 rounded-2xl px-4 py-3 flex items-center gap-3">
              <span className="text-2xl flex-shrink-0">🏅</span>
              <div className="text-left">
                <p className="text-[#25B49A] text-[13px] font-extrabold">
                  Hesap Güvenliği Sağlandı
                </p>
                <p
                  className="text-[rgba(255,255,255,0.45)] text-[12px]"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  Şifreni başarıyla sıfırladın.
                </p>
              </div>
            </div>

            <Link href="/login" className="w-full">
              <Button variant="primary" size="lg" className="w-full">
                GİRİŞ YAP
              </Button>
            </Link>
          </div>
        ) : (
          /* ── FORM STATE ── */
          <div className="w-full max-w-[400px] flex flex-col gap-6">
            {/* Lock icon */}
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-[#1a2b2a] border-2 border-[#25B49A]/30 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    fill="#1e3533"
                    stroke="#25B49A"
                    strokeWidth="2"
                  />
                  <path
                    d="M7 11V7C7 4.24 9.24 2 12 2C14.76 2 17 4.24 17 7V11"
                    stroke="#25B49A"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="12" cy="16.5" r="1.5" fill="#25B49A" />
                  <line
                    x1="12"
                    y1="16.5"
                    x2="12"
                    y2="19"
                    stroke="#25B49A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Title */}
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-white text-2xl font-bold">
                Yeni Şifre Belirle
              </h1>
              <p
                className="text-[rgba(255,255,255,0.5)] text-[14px] leading-relaxed"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                Güçlü bir şifre seçerek hesabını koruma altına al.
              </p>
            </div>

            {/* Root error */}
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
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
              noValidate
            >
              <Input
                type="password"
                autoComplete="new-password"
                placeholder="Yeni şifre"
                error={errors.newPassword?.message}
                {...register("newPassword")}
              />

              <Input
                type="password"
                autoComplete="new-password"
                placeholder="Yeni şifreyi onayla"
                error={errors.confirmPassword?.message}
                {...register("confirmPassword")}
              />

              <div className="mt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={isPending}
                >
                  {isPending ? "Kaydediliyor..." : "GÖNDER"}
                </Button>
              </div>
            </form>

            <p
              className="text-center text-[rgba(255,255,255,0.45)] text-[14px]"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              Vazgeçtin mi?{" "}
              <Link
                href="/login"
                className="text-[#25B49A] font-extrabold hover:text-[#4FC3F7] transition-colors"
              >
                Giriş sayfasına dön
              </Link>
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
