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
    <div>
      <h1>Giriş Yap</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="identifier">Kullanıcı Adı veya E-posta</label>
          <input
            id="identifier"
            type="text"
            autoComplete="username"
            {...register("identifier")}
          />
          {errors.identifier && (
            <p style={{ color: "red" }}>{errors.identifier.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password">Şifre</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            {...register("password")}
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>

        <Link href="/forgot-password">Şifremi unuttum</Link>

        {errors.root && <p style={{ color: "red" }}>{errors.root.message}</p>}

        <button type="submit" disabled={isPending}>
          {isPending ? "Giriş yapılıyor..." : "Giriş Yap"}
        </button>
      </form>

      <p>
        Hesabın yok mu? <Link href="/register">Kayıt ol</Link>
      </p>
    </div>
  );
}
