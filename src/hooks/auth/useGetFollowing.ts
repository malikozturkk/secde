import { useQuery } from "@tanstack/react-query";
import { authService } from "@/src/services/auth.service";

export const useGetFollowing = (username: string) => {
  return useQuery({
    queryKey: ["following", username],
    queryFn: () =>
      authService.getFollowing(username).then((res) => res.data.data),
    enabled: !!username,
  });
};
