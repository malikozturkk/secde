import { useQuery } from "@tanstack/react-query";
import { authService } from "@/src/services/auth.service";
import { retryOnServerError } from "@/src/lib/api-error";

export const useGetFollowing = (username: string) => {
  return useQuery({
    queryKey: ["following", username],
    queryFn: () =>
      authService.getFollowing(username).then((res) => res.data.data),
    enabled: !!username,
    retry: retryOnServerError(),
  });
};
