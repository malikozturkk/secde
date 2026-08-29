import { useInfiniteQuery } from "@tanstack/react-query";
import { authService } from "@/src/services/auth.service";
import { retryOnServerError } from "@/src/lib/api-error";
import type { FollowListResponseData } from "@/src/types/auth.types";
export const FOLLOW_LIST_PAGE_SIZE = 50;

export const useGetFollowers = (
  username: string,
  options?: { enabled?: boolean }
) => {
  return useInfiniteQuery({
    queryKey: ["followers", username],
    queryFn: ({ pageParam }) =>
      authService
        .getFollowers(username, {
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
