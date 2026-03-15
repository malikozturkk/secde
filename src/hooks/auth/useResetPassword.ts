import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { UseFormSetError } from "react-hook-form";
import { AxiosError } from "axios";
import { authService } from "@/src/services/auth.service";
import { AuthErrorCode } from "@/src/types/enums";
import { DEFAULT_UNAUTHENTICATED_REDIRECT } from "@/src/constants/routes";
import { ResetPasswordFormValues } from "@/src/validations/auth.validation";
import type { ApiResponse } from "@/src/types";

interface UseResetPasswordOptions {
  userId: string;
  token: string;
  setError: UseFormSetError<ResetPasswordFormValues>;
}

export const useResetPassword = ({
  userId,
  token,
  setError,
}: UseResetPasswordOptions) => {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: ResetPasswordFormValues) =>
      authService.resetPassword({
        userId,
        token,
        newPassword: payload.newPassword,
        confirmPassword: payload.confirmPassword,
      }),
    onSuccess: () => {
      router.push(DEFAULT_UNAUTHENTICATED_REDIRECT);
    },
    onError: (error: AxiosError<ApiResponse<null>>) => {
      const errorCode = error.response?.data?.error?.message;

      switch (errorCode) {
        case AuthErrorCode.INVALID_OR_EXPIRED_TOKEN:
          setError("root", {
            message: "Şifre sıfırlama bağlantısı geçersiz veya süresi dolmuş.",
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
