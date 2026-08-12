import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { UseFormSetError } from "react-hook-form";
import { AxiosError } from "axios";
import { getValidationCodes } from "@/src/lib/api-error";
import { authService } from "@/src/services/auth.service";
import { useAuthStore } from "@/src/store/auth.store";
import { AuthErrorCode } from "@/src/types/enums/auth.enums";
import { ConsentErrorCode } from "@/src/types/enums/consent.enums";
import { RegisterFormValues } from "@/src/validations/auth.validation";
import type { RegisterResponseData } from "@/src/types/auth.types";
import type { ApiResponse } from "@/src/types/api.types";

type RegisterField = keyof RegisterFormValues;

const LOCATION_MESSAGE = "Konum bilgisi geçersiz. Lütfen tekrar belirleyin.";
const VALIDATION_FIELD_MAP: Record<
  string,
  { field: RegisterField; message: string }
> = {
  INVALID_USERNAME: {
    field: "username",
    message: "Kullanıcı adı sadece harf, rakam ve alt çizgi içerebilir",
  },
  INVALID_USERNAME_FORMAT: {
    field: "username",
    message: "Kullanıcı adı sadece harf, rakam ve alt çizgi içerebilir",
  },
  INVALID_EMAIL: {
    field: "email",
    message: "Geçerli bir e-posta adresi giriniz",
  },
  INVALID_EMAIL_FORMAT: {
    field: "email",
    message: "Geçerli bir e-posta adresi giriniz",
  },
  INVALID_PASSWORD: {
    field: "password",
    message: "Şifre en az 8 karakter olmalıdır",
  },
  PASSWORD_TOO_SHORT: {
    field: "password",
    message: "Şifre en az 8 karakter olmalıdır",
  },
  INVALID_GENDER: { field: "gender", message: "Lütfen cinsiyet seçiniz" },
  INVALID_COUNTRY: { field: "country", message: LOCATION_MESSAGE },
  INVALID_CITY: { field: "city", message: "Lütfen geçerli bir şehir seçiniz" },
  INVALID_LATITUDE: { field: "latitude", message: LOCATION_MESSAGE },
  INVALID_LONGITUDE: { field: "longitude", message: LOCATION_MESSAGE },
  INVALID_MADHAB: { field: "madhab", message: "Lütfen mezhep seçiniz" },
  INVALID_LANGUAGE: { field: "language", message: "Lütfen dil seçiniz" },
  TERMS_NOT_ACCEPTED: {
    field: "termsAccepted",
    message: "Kullanım Koşullarını kabul etmelisiniz",
  },
  PRIVACY_POLICY_NOT_ACCEPTED: {
    field: "privacyPolicyAccepted",
    message: "Aydınlatma Metni'ni okuduğunuzı ve onayladığınızı belirtmelisiniz",
  },
  SPECIAL_CATEGORY_CONSENT_NOT_ACCEPTED: {
    field: "specialCategoryDataAccepted",
    message:
      "Özel nitelikli verilerinizin işlenmesine açık rıza vermelisiniz",
  },
};

interface UseRegisterOptions {
  setError: UseFormSetError<RegisterFormValues>;
}

export const useRegister = ({ setError }: UseRegisterOptions) => {
  const router = useRouter();
  const { setTempToken } = useAuthStore();

  const resumePendingRegistration = async (requestBody: unknown) => {
    const email =
      typeof requestBody === "string"
        ? (JSON.parse(requestBody) as { email?: string }).email
        : undefined;

    if (email) {
      try {
        const response = await authService.resumeRegistration(email);
        const tempToken = response.data.data?.tempToken;
        if (tempToken) {
          setTempToken(tempToken, email);
          router.push("/verify-otp");
          return;
        }
      } catch {
      }
    }

    setError("root", {
      message:
        "Bu hesap için zaten aktif bir kayıt süreci başlatılmış. Lütfen e-postanızı kontrol edin.",
    });
  };

  return useMutation({
    mutationFn: (payload: RegisterFormValues) => authService.register(payload),
    onSuccess: ({ data }, payload) => {
      const tempToken = data.data?.tempToken;
      if (tempToken) {
        setTempToken(tempToken, payload.email);
        router.push("/verify-otp");
      }
    },
    onError: (error: AxiosError<ApiResponse<RegisterResponseData>>) => {
      const errorCode = error.response?.data?.error?.message;

      if (errorCode === "VALIDATION_ERROR") {
        const codes = getValidationCodes(error);
        let mapped = false;
        for (const code of codes) {
          const target = VALIDATION_FIELD_MAP[code];
          if (target) {
            setError(target.field, { message: target.message });
            mapped = true;
          }
        }
        if (!mapped) {
          setError("root", {
            message: "Gönderilen bilgilerde bir hata var. Lütfen kontrol edin.",
          });
        }
        return;
      }

      switch (errorCode) {
        case AuthErrorCode.USERNAME_ALREADY_EXISTS:
          setError("username", {
            message: "Bu kullanıcı adı zaten kullanılıyor",
          });
          break;
        case AuthErrorCode.INVALID_USERNAME_FORMAT:
          setError("username", {
            message: "Kullanıcı adı sadece harf, rakam ve alt çizgi içerebilir",
          });
          break;
        case AuthErrorCode.USER_ALREADY_EXISTS:
          setError("email", { message: "Bu e-posta adresi zaten kayıtlı" });
          break;
        case AuthErrorCode.INVALID_EMAIL_FORMAT:
          setError("email", { message: "Geçerli bir e-posta adresi giriniz" });
          break;

        case AuthErrorCode.PASSWORD_TOO_SHORT:
          setError("password", { message: "Şifre en az 8 karakter olmalıdır" });
          break;
        case AuthErrorCode.ACTIVE_REGISTRATION_EXISTS:
          void resumePendingRegistration(error.config?.data);
          break;
        case AuthErrorCode.EMAIL_REQUIRED:
          setError("email", { message: "E-posta adresi zorunludur" });
          break;
        case ConsentErrorCode.TERMS_NOT_ACCEPTED:
          setError("termsAccepted", {
            message: "Kullanım Koşullarını kabul etmelisiniz",
          });
          break;
        case ConsentErrorCode.PRIVACY_POLICY_NOT_ACCEPTED:
          setError("privacyPolicyAccepted", {
            message: "Aydınlatma Metni'ni okuduğunuzu ve onayladığınızı belirtmelisiniz",
          });
          break;
        case ConsentErrorCode.SPECIAL_CATEGORY_CONSENT_NOT_ACCEPTED:
          setError("specialCategoryDataAccepted", {
            message:
              "Özel nitelikli verilerinizin işlenmesine açık rıza vermelisiniz",
          });
          break;
        default:
          setError("root", {
            message: "Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.",
          });
      }
    },
  });
};
