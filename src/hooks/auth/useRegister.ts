import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { UseFormSetError } from "react-hook-form";
import { AxiosError } from "axios";
import { authService } from "@/src/services/auth.service";
import { useAuthStore } from "@/src/store/auth.store";
import { AuthErrorCode } from "@/src/types/enums";
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
        case AuthErrorCode.USER_ALREADY_EXISTS:
          setError("email", { message: "Bu e-posta adresi zaten kayıtlı" });
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
        default:
          setError("root", {
            message: "Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.",
          });
      }
    },
  });
};
