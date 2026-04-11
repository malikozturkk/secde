"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/src/store/auth.store";
import { useDebouncedValue } from "@/src/hooks/useDebouncedValue";
import { useSearchUsers } from "@/src/hooks/users/useSearchUsers";
import { useGetFollowers } from "@/src/hooks/auth/useGetFollowers";
import { useGetFollowing } from "@/src/hooks/auth/useGetFollowing";
import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/Button";
import AppLayout from "@/src/components/layout/AppLayout";
import FollowNetworkCard from "@/src/app/profile/[username]/components/FollowNetworkCard";
import SearchUserRow from "./components/SearchUserRow";
import { SearchNotFound } from "@/src/icons/tsx/mascot";
import { Search, Users, X } from "lucide-react";
import InviteCard from "../profile/[username]/components/InviteCard";
import { AllCharacters } from "@/src/icons/tsx/characters";

export default function SearchPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user: currentUser } = useAuthStore();

  const [inputValue, setInputValue] = useState(
    () => searchParams.get("query") ?? ""
  );
  const pageSize = 20;

  const debouncedQuery = useDebouncedValue(inputValue, 350);

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSearchUsers(debouncedQuery, pageSize);

  const { data: followersData } = useGetFollowers(currentUser?.username || "");
  const { data: followingData } = useGetFollowing(currentUser?.username || "");
  const { data: myFollowingData } = useGetFollowing(
    currentUser?.username || ""
  );

  const followers = followersData ?? [];
  const following = followingData ?? [];
  const myFollowing = myFollowingData ?? [];

  const flatUsers = useMemo(
    () => data?.pages.flatMap((p) => p.users) ?? [],
    [data]
  );

  const totalCount = data?.pages[0]?.totalCount ?? null;

  const hasInput = inputValue.trim().length > 0;
  const hasDebouncedQuery = debouncedQuery.trim().length > 0;
  const awaitingDebounce = inputValue.trim() !== debouncedQuery.trim();
  const showLoadingSkeleton =
    hasInput && (awaitingDebounce || (hasDebouncedQuery && isLoading));

  useEffect(() => {
    const params = new URLSearchParams();
    const q = debouncedQuery.trim();
    if (q) params.set("query", q);
    const next = params.toString();
    const current = searchParams.toString();
    if (next !== current) {
      router.replace(`${pathname}?${next}`, { scroll: false });
    }
  }, [debouncedQuery, pathname, router, searchParams]);

  const loadMoreRef = useRef<HTMLDivElement>(null);

  const onIntersect = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) void fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el || !hasDebouncedQuery) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) onIntersect();
      },
      { root: null, rootMargin: "160px", threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasDebouncedQuery, onIntersect, flatUsers.length]);

  const rightPanel = (
    <div className="w-full flex flex-col gap-4">
      <FollowNetworkCard
        followers={followers}
        following={following}
        myFollowing={myFollowing}
        currentUsername={currentUser?.username}
      />
      <InviteCard />
    </div>
  );

  return (
    <AppLayout rightPanel={rightPanel}>
      <div className="text-white w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-black tracking-tight text-white mb-1">
            Arkadaş ara
          </h1>
        </div>
        <div className="mb-6">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="İsim veya kullanıcı adı…"
            autoComplete="off"
            aria-label="Kullanıcı ara"
            leftIcon={<Search width={18} height={18} />}
            suffix={
              inputValue ? (
                <button
                  onClick={() => setInputValue("")}
                  aria-label="Temizle"
                  className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/40 hover:text-white transition-all duration-150 cursor-pointer"
                >
                  <X width={10} height={10} />
                </button>
              ) : null
            }
          />
        </div>

        {hasDebouncedQuery &&
          !awaitingDebounce &&
          !isLoading &&
          !isError &&
          flatUsers.length > 0 &&
          typeof totalCount === "number" && (
            <div className="mb-4">
              <span className="inline-flex items-center gap-1.5 bg-[#25b49a]/10 border border-[#25b49a]/25 rounded-full px-3 py-1 text-xs font-extrabold text-[#25b49a]">
                <Users width={12} height={12} />
                {totalCount.toLocaleString()} sonuç
              </span>
            </div>
          )}

        <div className="flex flex-col gap-3 w-full">
          {!hasInput && (
            <div className="flex flex-col items-center justify-center text-center py-14 px-6">
              <div>
                <AllCharacters width={450} height={450} />
              </div>
              <p className="text-base font-extrabold text-white mb-1">
                Öğrenmek ve arkadaşlarınla birlikte takip etmek artık daha
                eğlenceli!
              </p>
            </div>
          )}

          {showLoadingSkeleton && (
            <div className="flex flex-col gap-3">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-20 w-full rounded-2xl animate-pulse bg-white/5"
                />
              ))}
            </div>
          )}

          {hasDebouncedQuery && isError && !awaitingDebounce && (
            <div className="rounded-2xl border-2 border-red-500/30 bg-red-500/5 px-6 py-8 text-center">
              <p className="text-sm font-bold text-red-300 mb-4">
                {error instanceof Error ? error.message : "Arama yapılamadı."}
              </p>
              <Button
                variant="primary"
                size="sm"
                onClick={() => void refetch()}
              >
                Tekrar dene
              </Button>
            </div>
          )}

          {hasDebouncedQuery &&
            !isLoading &&
            !awaitingDebounce &&
            !isError &&
            flatUsers.length === 0 && (
              <div className="flex flex-col items-center justify-center text-center py-14 px-6">
                <div className="mb-5">
                  <SearchNotFound width={150} height={150} />
                </div>
                <p className="text-lg leading-6 font-semibold text-white/60 max-w-80">
                  Maalesef hiçbir eşleşme bulamadık. Lütfen yeniden aramayı
                  deneyin.
                </p>
              </div>
            )}

          {hasDebouncedQuery &&
            !isLoading &&
            !awaitingDebounce &&
            !isError &&
            flatUsers.map((u, index) => (
              <SearchUserRow
                key={u.username}
                user={u}
                currentUsername={currentUser?.username}
                index={index}
              />
            ))}

          {hasDebouncedQuery &&
            !isLoading &&
            !awaitingDebounce &&
            flatUsers.length > 0 && (
              <div
                ref={loadMoreRef}
                className="h-4 w-full shrink-0"
                aria-hidden
              />
            )}

          {hasDebouncedQuery &&
            !awaitingDebounce &&
            hasNextPage &&
            flatUsers.length > 0 && (
              <div className="flex justify-center pt-1 pb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={isFetchingNextPage}
                  onClick={() => void fetchNextPage()}
                >
                  {isFetchingNextPage ? "Yükleniyor…" : "Daha fazla göster"}
                </Button>
              </div>
            )}
        </div>
      </div>
    </AppLayout>
  );
}
