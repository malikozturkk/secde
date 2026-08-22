import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { UseFormSetError } from "react-hook-form";
import { AxiosError } from "axios";
import { otpService } from "@/src/services/otp.service";
import { useAuthStore } from "@/src/store/auth.store";
import { AuthErrorCode } from "@/src/types/enums/auth.enums";
import { DEFAULT_AUTHENTICATED_REDIRECT } from "@/src/constants/routes";
import { OtpFormValues } from "@/src/validations/auth.validation";
import type { OtpVerifyResponseData } from "@/src/types/otp.types";
import type { ApiResponse } from "@/src/types/api.types";

interface UseOtpVerifyOptions {
  setError: UseFormSetError<OtpFormValues>;
}

export const useOtpVerify = ({ setError }: UseOtpVerifyOptions) => {
  const router = useRouter();
  const { tempToken, setAuth, clearTempToken } = useAuthStore();

  return useMutation({
    mutationFn: (payload: OtpFormValues) => {
      if (!tempToken) {
        throw new Error("Geçersiz oturum. Lütfen tekrar kayıt olun.");
      }
      return otpService.verify(payload, tempToken);
    },
    onSuccess: ({ data }) => {
      if (data.data) {
        setAuth(data.data);
        router.replace(DEFAULT_AUTHENTICATED_REDIRECT);
      }
    },
    onError: (error: AxiosError<ApiResponse<OtpVerifyResponseData>>) => {
      const errorCode = error.response?.data?.error?.message;

      switch (errorCode) {
        case AuthErrorCode.INVALID_OTP_CODE:
          setError("code", { message: "Girdiğiniz kod hatalı" });
          break;
        case AuthErrorCode.OTP_EXPIRED:
          setError("code", {
            message: "Kodun süresi dolmuş. Yeni kod talep edin.",
          });
          break;
        case AuthErrorCode.OTP_NOT_FOUND:
          setError("code", {
            message:
              "Geçerli bir doğrulama kodu bulunamadı. Yeni kod talep edin.",
          });
          break;
        case AuthErrorCode.REGISTRATION_EXPIRED:
          setError("root", {
            message: "Kayıt süreniz dolmuş. Lütfen tekrar kayıt olun.",
          });
          clearTempToken();
          router.replace("/register");
          break;
        case AuthErrorCode.USER_ALREADY_EXISTS:
          setError("root", {
            message: "Bu hesap zaten doğrulanmış. Giriş yapabilirsiniz.",
          });
          break;
        case AuthErrorCode.INVALID_OR_EXPIRED_TOKEN:
          setError("root", {
            message: "Oturumunuz geçersiz. Lütfen tekrar kayıt olun.",
          });
          clearTempToken();
          router.replace("/register");
          break;
        default:
          setError("root", {
            message: "Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.",
          });
      }
    },
  });
};
