import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { UseFormSetError } from "react-hook-form";
import { AxiosError } from "axios";
import { authService } from "@/src/services/auth.service";
import { useAuthStore } from "@/src/store/auth.store";
import { AuthErrorCode, ConsentErrorCode } from "@/src/types/enums";
import { RegisterFormValues } from "@/src/validations/auth.validation";
import { RegisterResponseData, ApiResponse } from "@/src/types";

interface UseRegisterOptions {
  setError: UseFormSetError<RegisterFormValues>;
}

export const useRegister = ({ setError }: UseRegisterOptions) => {
  const router = useRouter();
  const { setTempToken } = useAuthStore();

  return useMutation({
    mutationFn: (payload: RegisterFormValues) => authService.register(payload),
    onSuccess: ({ data }) => {
      const tempToken = data.data?.tempToken;
      if (tempToken) {
        setTempToken(tempToken);
        router.push("/verify-otp");
      }
    },
    onError: (error: AxiosError<ApiResponse<RegisterResponseData>>) => {
      const errorCode = error.response?.data?.error?.message;

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
          setError("root", {
            message:
              "Bu hesap için zaten aktif bir kayıt süreci başlatılmış. Lütfen e-postanızı kontrol edin.",
          });
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
            message: "Gizlilik Politikasını kabul etmelisiniz",
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
