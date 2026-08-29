import { useInfiniteQuery } from "@tanstack/react-query";
import { authService } from "@/src/services/auth.service";
import { retryOnServerError } from "@/src/lib/api-error";
import type { FollowListResponseData } from "@/src/types/auth.types";
import { FOLLOW_LIST_PAGE_SIZE } from "./useGetFollowers";

export const useGetFollowing = (
  username: string,
  options?: { enabled?: boolean }
) => {
  return useInfiniteQuery({
    queryKey: ["following", username],
    queryFn: ({ pageParam }) =>
      authService
        .getFollowing(username, {
          page: pageParam,
          pageSize: FOLLOW_LIST_PAGE_SIZE,
        })
        .then((res) => res.data.data as FollowListResponseData),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
    select: (data) => data.pages.flatMap((page) => page.items),
    enabled: !!username && (options?.enabled ?? true),
    retry: retryOnServerError(),
  });
};
