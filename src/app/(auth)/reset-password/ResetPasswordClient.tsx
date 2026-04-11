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
import {
  Award,
  BadgeCheck,
  CheckCircle,
  Lock,
  Medal,
  ShieldCheck,
  Trophy,
} from "lucide-react";

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
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-10">
        {success ? (
          <div className="w-full max-w-[400px] flex flex-col items-center gap-6 text-center">
            <div className="relative flex items-center justify-center">
              <div
                className="absolute w-32 h-32 rounded-full bg-[#25B49A]/10 animate-ping"
                style={{ animationDuration: "2.8s" }}
              />
              <div className="w-24 h-24 rounded-full bg-[#1a2b2a] border-2 border-[#25B49A]/40 flex items-center justify-center shadow-lg shadow-[#25B49A]/10">
                <ShieldCheck width={46} height={46} stroke="#25B49A" />
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

            <div className="w-full bg-[#25B49A]/10 border border-[#25B49A]/25 rounded-2xl px-4 py-3 flex items-center gap-3">
              <span className="text-2xl flex-shrink-0">
                <Award stroke="#EAB308" />
              </span>
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
          <div className="w-full max-w-[400px] flex flex-col gap-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-[#1a2b2a] border-2 border-[#25B49A]/30 flex items-center justify-center">
                <Lock stroke="#25B49A" width={28} height={28} />
              </div>
            </div>
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
