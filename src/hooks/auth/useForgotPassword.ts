import { useMutation } from "@tanstack/react-query";
import { UseFormSetError } from "react-hook-form";
import { AxiosError } from "axios";
import { resolveApiErrorMessage } from "@/src/constants/error-messages";
import { authService } from "@/src/services/auth.service";
import type { ForgotPasswordFormValues } from "@/src/validations/auth.validation";
import type { ApiResponse } from "@/src/types/api.types";
import type { ForgotPasswordResponseData } from "@/src/types/auth.types";

interface UseForgotPasswordOptions {
  setError: UseFormSetError<ForgotPasswordFormValues>;
  onSuccess?: (message: string) => void;
}

export const useForgotPassword = ({
  setError,
  onSuccess,
}: UseForgotPasswordOptions) => {
  return useMutation({
    mutationFn: (payload: ForgotPasswordFormValues) =>
      authService.forgotPassword(payload),
    onSuccess: ({ data }) => {
      const message = data.data?.message ?? "FORGOT_PASSWORD_EMAIL_SENT";
      onSuccess?.(message);
    },
    onError: (error: AxiosError<ApiResponse<ForgotPasswordResponseData>>) => {
      setError("root", {
        message: resolveApiErrorMessage(
          error,
          "Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin."
        ),
      });
    },
  });
};
