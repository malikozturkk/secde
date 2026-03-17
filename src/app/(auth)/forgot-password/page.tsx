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
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";

export default function ForgotPasswordPage() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    getValues,
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
        <Link href="/login">
          <Button variant="ghost" size="sm">
            GİRİŞ
          </Button>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-10">
        {successMessage ? (
          <div className="w-full max-w-[400px] flex flex-col items-center gap-6 text-center">
            <div className="relative flex items-center justify-center">
              <div
                className="absolute w-28 h-28 rounded-full bg-[#25B49A]/10 animate-ping"
                style={{ animationDuration: "2.5s" }}
              />
              <div className="w-24 h-24 rounded-full bg-[#1a2b2a] border-2 border-[#25B49A]/40 flex items-center justify-center shadow-lg shadow-[#25B49A]/10">
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                  <rect
                    x="4"
                    y="10"
                    width="36"
                    height="26"
                    rx="4"
                    fill="#1e3533"
                    stroke="#25B49A"
                    strokeWidth="2"
                  />
                  <path
                    d="M4 14L22 27L40 14"
                    stroke="#25B49A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M34 8L35 5L36 8L39 9L36 10L35 13L34 10L31 9Z"
                    fill="#FFD700"
                    opacity="0.9"
                  />
                </svg>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="text-white text-2xl font-bold">E-posta Yolda!</h1>
              <p
                className="text-[rgba(255,255,255,0.5)] text-[14px] leading-relaxed"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                <span className="text-[rgba(255,255,255,0.75)] font-bold">
                  {getValues("email")}
                </span>{" "}
                adresine şifre sıfırlama bağlantısı gönderdik.
              </p>
            </div>

            <div className="w-full bg-[#25B49A]/10 border border-[#25B49A]/25 rounded-2xl px-4 py-3 flex items-start gap-3">
              <span className="text-[#25B49A] text-lg flex-shrink-0 mt-0.5">
                💡
              </span>
              <p
                className="text-[rgba(255,255,255,0.55)] text-[13px] leading-relaxed text-left"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                Mail gelmediyse spam klasörünü de kontrol etmeyi unutma!
              </p>
            </div>
          </div>
        ) : (
          /* ── FORM STATE ── */
          <div className="w-full max-w-[400px] flex flex-col gap-6">
            {/* Icon */}
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-[#1a2b2a] border-2 border-[#25B49A]/30 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <rect
                    x="2"
                    y="4"
                    width="20"
                    height="16"
                    rx="3"
                    fill="#1e3533"
                    stroke="#25B49A"
                    strokeWidth="2"
                  />
                  <path
                    d="M2 8L12 14L22 8"
                    stroke="#25B49A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 20L9 13M22 20L15 13"
                    stroke="#25B49A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.5"
                  />
                </svg>
              </div>
            </div>

            {/* Title */}
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-white text-2xl font-bold">Şifremi unuttum</h1>
              <p
                className="text-[rgba(255,255,255,0.5)] text-[14px] leading-relaxed"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                E-posta adresini gir, sana sıfırlama bağlantısı gönderelim.
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
                type="email"
                autoComplete="email"
                placeholder="E-posta adresi"
                error={errors.email?.message}
                {...register("email")}
              />

              <div className="mt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={isPending}
                >
                  {isPending ? "Gönderiliyor..." : "GÖNDER"}
                </Button>
              </div>
            </form>

            <p
              className="text-center text-[rgba(255,255,255,0.45)] text-[14px]"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              Şifreni hatırladın mı?{" "}
              <Link
                href="/login"
                className="text-[#25B49A] font-extrabold hover:text-[#4FC3F7] transition-colors"
              >
                Giriş yap
              </Link>
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
