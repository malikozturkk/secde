"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "@/src/hooks/auth/useRegister";
import {
  registerSchema,
  type RegisterFormValues,
} from "@/src/validations/auth.validation";

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

  const onSubmit = (data: RegisterFormValues) => {
    registerUser(data);
  };

  return (
    <div>
      <h1>Kayıt Ol</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="username">Kullanıcı Adı</label>
          <input id="username" type="text" {...register("username")} />
          {errors.username && (
            <p style={{ color: "red" }}>{errors.username.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email">E-posta</label>
          <input id="email" type="email" {...register("email")} />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password">Şifre</label>
          <input id="password" type="password" {...register("password")} />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>

        {/* API'den gelen genel hatalar (root error) */}
        {errors.root && <p style={{ color: "red" }}>{errors.root.message}</p>}

        <button type="submit" disabled={isPending}>
          {isPending ? "Kaydediliyor..." : "Kayıt Ol"}
        </button>
      </form>
    </div>
  );
}
