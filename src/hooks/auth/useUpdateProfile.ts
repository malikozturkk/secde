import { useMutation } from "@tanstack/react-query";
import { UseFormSetError } from "react-hook-form";
import { AxiosError } from "axios";
import { authService } from "@/src/services/auth.service";
import { useAuthStore } from "@/src/store/auth.store";
import { AuthErrorCode } from "@/src/types/enums";
import type { UpdateProfileFormValues } from "@/src/validations/auth.validation";
import type { ApiResponse, UpdateProfileResponseData } from "@/src/types";

interface UseUpdateProfileOptions {
  setError: UseFormSetError<UpdateProfileFormValues>;
  onSuccess?: () => void;
}

export const useUpdateProfile = ({
  setError,
  onSuccess,
}: UseUpdateProfileOptions) => {
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: (payload: UpdateProfileFormValues) => {
      const cleanedPayload = Object.fromEntries(
        Object.entries(payload).filter(
          ([, value]) => value !== "" && value !== undefined
        )
      );
      return authService.updateProfile(cleanedPayload);
    },
    onSuccess: ({ data }) => {
      if (data.data) {
        setUser(data.data);
        onSuccess?.();
      }
    },
    onError: (error: AxiosError<ApiResponse<UpdateProfileResponseData>>) => {
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
        case AuthErrorCode.INVALID_CURRENT_PASSWORD:
          setError("currentPassword", { message: "Mevcut şifreniz hatalı" });
          break;
        case AuthErrorCode.PASSWORD_FIELDS_REQUIRED:
          setError("currentPassword", {
            message: "Şifre değiştirmek için her iki alanı da doldurunuz",
          });
          break;
        case AuthErrorCode.PASSWORD_TOO_SHORT:
          setError("newPassword", {
            message: "Şifre en az 8 karakter olmalıdır",
          });
          break;
        case AuthErrorCode.UNAUTHORIZED:
          setError("root", { message: "Bu işlem için yetkiniz yok." });
          break;
        default:
          setError("root", {
            message: "Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.",
          });
      }
    },
  });
};
