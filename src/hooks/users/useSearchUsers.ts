import { useInfiniteQuery } from "@tanstack/react-query";
import { userService } from "@/src/services/user.service";

const DEFAULT_PAGE_SIZE = 20;

export function useSearchUsers(query: string, pageSize: number = DEFAULT_PAGE_SIZE) {
  const trimmed = query.trim();

  return useInfiniteQuery({
    queryKey: ["userSearch", trimmed, pageSize] as const,
    queryFn: ({ pageParam }: { pageParam: number | undefined }) =>
      userService
        .searchUsers({
          query: trimmed,
          pageSize,
          cursor: pageParam,
        })
        .then((res) => {
          const data = res.data.data;
          if (!data) {
            throw new Error("Arama yanıtı alınamadı");
          }
          return data;
        }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    enabled: trimmed.length > 0,
  });
}
