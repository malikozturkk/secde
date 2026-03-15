import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { otpService } from "@/src/services/otp.service";
import { useAuthStore } from "@/src/store/auth.store";
import { AuthErrorCode } from "@/src/types/enums";
import type { ApiResponse } from "@/src/types";

interface UseOtpResendOptions {
  onSuccess?: () => void;
  onError?: (message: string) => void;
}

export const useOtpResend = ({
  onSuccess,
  onError,
}: UseOtpResendOptions = {}) => {
  const { tempToken } = useAuthStore();

  return useMutation({
    mutationFn: () => {
      if (!tempToken) {
        throw new Error("Geçersiz oturum. Lütfen tekrar kayıt olun.");
      }
      return otpService.resend(tempToken);
    },
    onSuccess: () => {
      onSuccess?.();
    },
    onError: (error: AxiosError<ApiResponse<null>>) => {
      const errorCode = error.response?.data?.error?.message;

      switch (errorCode) {
        case AuthErrorCode.ACTIVE_OTP_EXISTS:
          onError?.(
            "Aktif bir kodunuz zaten var. Lütfen e-postanızı kontrol edin."
          );
          break;
        case AuthErrorCode.INSUFFICIENT_TIME_FOR_NEW_OTP:
          onError?.("Yeni kod talep etmek için lütfen bekleyin.");
          break;
        case AuthErrorCode.NO_PENDING_REGISTRATION:
          onError?.(
            "Aktif bir kayıt işlemi bulunamadı. Lütfen tekrar kayıt olun."
          );
          break;
        case AuthErrorCode.REGISTRATION_EXPIRED:
          onError?.("Kayıt süreniz dolmuş. Lütfen tekrar kayıt olun.");
          break;
        default:
          onError?.("Kod gönderilemedi. Lütfen tekrar deneyin.");
      }
    },
  });
};
