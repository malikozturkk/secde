"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRegister } from "@/src/hooks/auth/useRegister";
import {
  registerSchema,
  type RegisterFormValues,
} from "@/src/validations/auth.validation";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const { mutate: registerUser, isPending } = useRegister({ setError });

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
            className="flex flex-col gap-3"
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

            <div className="mt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isPending}
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

          <p
            className="text-center text-[rgba(255,255,255,0.25)] text-[12px] leading-relaxed px-4"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Kayıt olarak{" "}
            <Link
              href="/terms"
              className="text-[rgba(255,255,255,0.45)] underline hover:text-white transition-colors"
            >
              Kullanım Koşullarımızı
            </Link>{" "}
            ve{" "}
            <Link
              href="/privacy"
              className="text-[rgba(255,255,255,0.45)] underline hover:text-white transition-colors"
            >
              Gizlilik Politikamızı
            </Link>{" "}
            kabul etmiş olursun.
          </p>
        </div>
      </main>
    </div>
  );
}
