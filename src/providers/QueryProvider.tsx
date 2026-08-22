"use client";

import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/src/store/auth.store";
import { useAuthHydrated } from "@/src/hooks/auth/useAuthHydrated";

function AuthScopedCacheReset(): null {
  const queryClient = useQueryClient();
  const userId = useAuthStore((state) => state.user?.id ?? null);
  const hydrated = useAuthHydrated();
  const lastUserId = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    if (!hydrated) return;

    if (lastUserId.current === undefined) {
      lastUserId.current = userId;
      return;
    }
    if (lastUserId.current === userId) return;

    lastUserId.current = userId;
    queryClient.clear();
  }, [hydrated, userId, queryClient]);

  return null;
}

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            staleTime: 1000 * 60 * 5,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthScopedCacheReset />
      {children}
    </QueryClientProvider>
  );
}
