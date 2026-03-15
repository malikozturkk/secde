import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authService } from "@/src/services/auth.service";
import { useAuthStore } from "@/src/store/auth.store";
import { DEFAULT_UNAUTHENTICATED_REDIRECT } from "@/src/constants/routes";

export const useLogout = () => {
  const router = useRouter();
  const { refreshToken, clearAuth } = useAuthStore();

  return useMutation({
    mutationFn: async () => {
      if (!refreshToken) return;

      await authService.logout({ refreshToken });
    },
    onSettled: () => {
      clearAuth();
      router.push(DEFAULT_UNAUTHENTICATED_REDIRECT);
    },
  });
};
