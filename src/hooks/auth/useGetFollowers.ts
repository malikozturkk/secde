import { useQuery } from "@tanstack/react-query";
import { authService } from "@/src/services/auth.service";

export const useGetFollowers = (username: string) => {
  return useQuery({
    queryKey: ["followers", username],
    queryFn: () =>
      authService.getFollowers(username).then((res) => res.data.data),
    enabled: !!username,
  });
};
