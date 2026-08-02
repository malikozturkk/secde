import { useQuery } from "@tanstack/react-query";
import { authService } from "@/src/services/auth.service";
import { retryOnServerError } from "@/src/lib/api-error";

export const useProfile = (username: string) => {
  return useQuery({
    queryKey: ["profile", username],
    queryFn: () =>
      authService.getProfile(username).then((res) => res.data.data),
    enabled: !!username,
    retry: retryOnServerError(),
  });
};
