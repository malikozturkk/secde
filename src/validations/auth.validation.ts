import { z } from "zod";

const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 20;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 72;

const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/;
const PASSWORD_COMPLEXITY_MESSAGE =
  "Şifre büyük harf, küçük harf, rakam ve özel karakter içermelidir";

const passwordSchema = z
  .string()
  .min(1, "Şifre zorunludur")
  .min(
    PASSWORD_MIN_LENGTH,
    `Şifre en az ${PASSWORD_MIN_LENGTH} karakter olmalıdır`
  )
  .max(
    PASSWORD_MAX_LENGTH,
    `Şifre en fazla ${PASSWORD_MAX_LENGTH} karakter olabilir`
  )
  .regex(PASSWORD_PATTERN, PASSWORD_COMPLEXITY_MESSAGE);

export const registerSchema = z.object({
  username: z
    .string()
    .min(1, "Kullanıcı adı zorunludur")
    .min(
      USERNAME_MIN_LENGTH,
      `Kullanıcı adı en az ${USERNAME_MIN_LENGTH} karakter olmalıdır`
    )
    .max(
      USERNAME_MAX_LENGTH,
      `Kullanıcı adı en fazla ${USERNAME_MAX_LENGTH} karakter olabilir`
    )
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Kullanıcı adı sadece harf, rakam ve alt çizgi içerebilir"
    ),
  email: z
    .string()
    .min(1, "E-posta zorunludur")
    .email("Geçerli bir e-posta adresi giriniz"),
  password: passwordSchema,
  gender: z.enum(["MALE", "FEMALE"], { error: "Lütfen cinsiyet seçiniz" }),
  country: z
    .string()
    .min(1, "Ülke seçiniz")
    .refine((v) => ["Türkiye"].includes(v), {
      message: "Şu an yalnızca Türkiye destekleniyor",
    }),
  city: z.string().min(1, "Şehir seçiniz"),
  latitude: z
    .number({ error: "Lütfen bir konum belirleyin" })
    .min(-90, "Geçersiz konum")
    .max(90, "Geçersiz konum"),
  longitude: z
    .number({ error: "Lütfen bir konum belirleyin" })
    .min(-180, "Geçersiz konum")
    .max(180, "Geçersiz konum"),
  madhab: z.enum(["SHAFI", "HANAFI"], { error: "Lütfen mezhep seçiniz" }),
  language: z.literal("tr", { error: "Lütfen dil seçiniz" }),
  termsAccepted: z.boolean().refine((v) => v === true, {
    message: "Devam etmek için Kullanım Koşullarını kabul etmelisiniz",
  }),
  privacyPolicyAccepted: z.boolean().refine((v) => v === true, {
    message: "Devam etmek için Aydınlatma Metni'ni okuduğunuzu ve onayladığınızı belirtmelisiniz",
  }),
  specialCategoryDataAccepted: z.boolean().refine((v) => v === true, {
    message:
      "Devam etmek için özel nitelikli verilerinizin işlenmesine açık rıza vermelisiniz",
  }),
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

export const forgotPasswordSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
});

export const resetPasswordSchema = z
  .object({
    newPassword: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Şifreler eşleşmiyor",
    path: ["confirmPassword"],
  });

export const updateProfileSchema = z
  .object({
    username: z
      .string()
      .min(
        USERNAME_MIN_LENGTH,
        `Kullanıcı adı en az ${USERNAME_MIN_LENGTH} karakter olmalıdır`
      )
      .max(
        USERNAME_MAX_LENGTH,
        `Kullanıcı adı en fazla ${USERNAME_MAX_LENGTH} karakter olabilir`
      )
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Kullanıcı adı sadece harf, rakam ve alt çizgi içerebilir"
      )
      .optional()
      .or(z.literal("")),
    avatar: z
      .string()
      .url("Geçerli bir URL giriniz")
      .optional()
      .or(z.literal("")),
    currentPassword: z.string().optional().or(z.literal("")),
    newPassword: passwordSchema.optional().or(z.literal("")),
    language: z.string().optional(),
    country: z.string().optional(),
    city: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    madhab: z.enum(["SHAFI", "HANAFI"]).optional(),
  })
  .refine(
    (data) => {
      const hasCurrent = !!data.currentPassword;
      const hasNew = !!data.newPassword;
      return hasCurrent === hasNew;
    },
    {
      message: "Şifre değiştirmek için her iki alanı da doldurunuz",
      path: ["currentPassword"],
    }
  );

export type RegisterFormValues = z.infer<typeof registerSchema>;
export type OtpFormValues = z.infer<typeof otpSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;
