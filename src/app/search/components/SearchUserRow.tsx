"use client";

import Link from "next/link";
import DefaultAvatar from "@/src/app/profile/[username]/DefaultAvatar";
import FollowButton from "@/src/app/profile/[username]/components/FollowButton";
import type { UserSearchResult } from "@/src/types/user.types";

interface SearchUserRowProps {
  user: UserSearchResult;
  currentUsername?: string;
  index: number;
}

export default function SearchUserRow({
  user,
  currentUsername,
  index,
}: SearchUserRowProps) {
  const isOwner = currentUsername === user.username;
  const mutual = user.mutualFollowers;
  const preview = mutual.preview;
  const count = mutual.count;

  return (
    <div
      className="group border-2 border-white/10 hover:border-[#25b49a]/40 rounded-2xl bg-white/[0.03] hover:bg-[#25b49a]/[0.04] shadow-sm hover:shadow-[0_6px_20px_rgba(0,0,0,0.25)] transition-all duration-200 hover:-translate-y-0.5 overflow-hidden"
      style={{ animationDelay: `${Math.min(index, 14) * 0.04}s` }}
    >
      <div className="flex items-center gap-4 px-4 py-3.5">
        <Link
          href={`/profile/${user.username}`}
          className="flex items-center gap-3 flex-1 min-w-0 no-underline"
        >
          <div
            className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-[#25b49a]/50 shrink-0 transition-all duration-200 group-hover:scale-105"
            style={{
              backgroundColor: user.avatarCustomization.colors.background,
            }}
          >
            <DefaultAvatar
              username={user.username}
              config={user.avatarCustomization}
            />
          </div>
          <div className="flex flex-col gap-1 min-w-0 flex-1">
            <span className="font-extrabold text-[15px] text-white group-hover:text-[#25b49a] tracking-tight truncate transition-colors duration-150">
              {user.username}
            </span>
            {!isOwner && count > 0 && (
              <div className="flex items-center gap-2 min-w-0">
                <div className="flex shrink-0">
                  {preview.slice(0, 3).map((p, i) => (
                    <div
                      key={p.username}
                      className="w-5 h-5 rounded-full overflow-hidden ring-2 ring-[#111827] shrink-0"
                      style={{
                        backgroundColor:
                          p.avatarCustomization.colors.background,
                        marginLeft: i === 0 ? 0 : "-6px",
                      }}
                    >
                      <DefaultAvatar
                        username={p.username}
                        config={p.avatarCustomization}
                      />
                    </div>
                  ))}
                </div>
                <p className="text-[12px] font-semibold text-white/40 m-0 truncate">
                  {preview
                    .slice(0, 2)
                    .map((p) => p.username)
                    .join(", ")}
                  {count > 2 && ` ve ${count - 2} kişi daha`} takip ediyor
                </p>
              </div>
            )}
          </div>
        </Link>

        {isOwner ? (
          <span className="shrink-0 text-[11px] font-bold text-[#25b49a] bg-[#25b49a]/10 border border-[#25b49a]/25 rounded-full px-3 py-1">
            Sen
          </span>
        ) : currentUsername ? (
          <div onClick={(e) => e.stopPropagation()} className="shrink-0">
            <FollowButton
              username={user.username}
              isFollowing={user.isFollowing}
              size="xs"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
