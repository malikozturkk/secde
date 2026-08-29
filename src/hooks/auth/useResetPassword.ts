import { useMutation } from "@tanstack/react-query";
import { UseFormSetError } from "react-hook-form";
import { AxiosError } from "axios";
import { resolveApiErrorMessage } from "@/src/constants/error-messages";
import { authService } from "@/src/services/auth.service";
import { AuthErrorCode } from "@/src/types/enums/auth.enums";
import { ResetPasswordFormValues } from "@/src/validations/auth.validation";
import type { ApiResponse } from "@/src/types/api.types";

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
  return useMutation({
    mutationFn: (payload: ResetPasswordFormValues) =>
      authService.resetPassword({
        userId,
        token,
        newPassword: payload.newPassword,
        confirmPassword: payload.confirmPassword,
      }),
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
            message: resolveApiErrorMessage(
              error,
              "Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin."
            ),
          });
      }
    },
  });
};
