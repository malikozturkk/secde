"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLogin } from "@/src/hooks/auth/useLogin";
import {
  loginSchema,
  type LoginFormValues,
} from "@/src/validations/auth.validation";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate: login, isPending } = useLogin({ setError, callbackUrl });

  const onSubmit = (data: LoginFormValues) => {
    login(data);
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

        <Link href="/register">
          <Button variant="ghost" size="sm">
            KAYDOL
          </Button>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-[400px] flex flex-col gap-6">
          <h1
            className="text-center text-white text-2xl font-bold"
            style={{ fontFamily: "'Fredoka One', cursive" }}
          >
            Oturum Aç
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
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
            noValidate
          >
            <Input
              type="text"
              autoComplete="username"
              placeholder="E-posta veya kullanıcı adı"
              error={errors.identifier?.message}
              {...register("identifier")}
            />

            <Input
              type="password"
              autoComplete="current-password"
              placeholder="Parola"
              error={errors.password?.message}
              suffix={
                <Link
                  href="/forgot-password"
                  className="text-[#25B49A] text-[12px] font-extrabold tracking-widest hover:text-[#4FC3F7] transition-colors"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  UNUTTUM
                </Link>
              }
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
                {isPending ? "Giriş yapılıyor..." : "OTURUM AÇ"}
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
            Hesabın yok mu?{" "}
            <Link
              href="/register"
              className="text-[#25B49A] font-extrabold hover:text-[#4FC3F7] transition-colors"
            >
              Kayıt ol
            </Link>
          </p>

          <p
            className="text-center text-[rgba(255,255,255,0.25)] text-[12px] leading-relaxed px-4"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Giriş yaparak{" "}
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
