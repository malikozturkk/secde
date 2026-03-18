import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/src/services/auth.service";

export const useToggleFollow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (username: string) =>
      authService.toggleFollow(username).then((res) => res.data),
    onSuccess: (_data, username) => {
      queryClient.invalidateQueries({ queryKey: ["profile", username] });
      queryClient.invalidateQueries({ queryKey: ["followers", username] });
      queryClient.invalidateQueries({ queryKey: ["following", username] });
      queryClient.invalidateQueries({ queryKey: ["following"] });
    },
  });
};
