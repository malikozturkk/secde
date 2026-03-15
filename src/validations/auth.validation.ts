import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Kullanıcı adı en az 3 karakter olmalıdır")
    .max(20, "Kullanıcı adı en fazla 20 karakter olabilir")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Kullanıcı adı sadece harf, rakam ve alt çizgi içerebilir"
    ),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  password: z
    .string()
    .min(8, "Şifre en az 8 karakter olmalıdır")
    .regex(/[A-Z]/, "Şifre en az bir büyük harf içermelidir")
    .regex(/[a-z]/, "Şifre en az bir küçük harf içermelidir")
    .regex(/[0-9]/, "Şifre en az bir rakam içermelidir"),
});

export const otpSchema = z.object({
  code: z
    .string()
    .length(6, "Doğrulama kodu 6 haneli olmalıdır")
    .regex(/^\d+$/, "Doğrulama kodu sadece rakamlardan oluşmalıdır"),
});

export const loginSchema = z.object({
  identifier: z.string().min(1, "Kullanıcı adı veya e-posta zorunludur"),
  password: z.string().min(1, "Şifre zorunludur"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type OtpFormValues = z.infer<typeof otpSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
