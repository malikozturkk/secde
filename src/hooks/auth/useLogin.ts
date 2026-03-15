import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { UseFormSetError } from "react-hook-form";
import { AxiosError } from "axios";
import { authService } from "@/src/services/auth.service";
import { useAuthStore } from "@/src/store/auth.store";
import { AuthErrorCode } from "@/src/types/enums";
import { LoginFormValues } from "@/src/validations/auth.validation";
import type { ApiResponse, LoginResponseData } from "@/src/types";

interface UseLoginOptions {
  setError: UseFormSetError<LoginFormValues>;
  callbackUrl?: string;
}

export const useLogin = ({ setError, callbackUrl = "/" }: UseLoginOptions) => {
  const router = useRouter();
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: (payload: LoginFormValues) => authService.login(payload),
    onSuccess: ({ data }) => {
      if (data.data) {
        setAuth(data.data);
        router.push(callbackUrl);
      }
    },
    onError: (error: AxiosError<ApiResponse<LoginResponseData>>) => {
      const errorCode = error.response?.data?.error?.message;

      switch (errorCode) {
        case AuthErrorCode.INVALID_CREDENTIALS:
          setError("root", {
            message: "Kullanıcı adı/e-posta veya şifre hatalı",
          });
          break;
        case AuthErrorCode.IDENTIFIER_REQUIRED:
          setError("identifier", {
            message: "Kullanıcı adı veya e-posta zorunludur",
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
