import React, { useState } from "react";
import DefaultAvatar from "../DefaultAvatar";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import FollowListDialog from "./FollowListDialog";
import FollowButton from "./FollowButton";

interface FollowNetworkCardProps {
  followers: { username: string; avatar: string | null }[];
  following: { username: string; avatar: string | null }[];
  myFollowing: { username: string; avatar: string | null }[];
  currentUsername?: string;
}

export default function FollowNetworkCard({
  followers,
  following,
  myFollowing,
  currentUsername,
}: FollowNetworkCardProps) {
  const [activeTab, setActiveTab] = useState<"following" | "followers">(
    "following"
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const list = activeTab === "following" ? following : followers;
  const previewList = list.slice(0, 3);
  const remainingCount = Math.max(0, list.length - 3);

  return (
    <>
      <div className="border-2 border-[rgba(255,255,255,0.15)] rounded-2xl flex flex-col overflow-hidden mb-4 bg-[#131f24] shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
        <div className="flex items-center justify-between border-b-2 border-[rgba(255,255,255,0.1)] px-4 pt-1">
          <button
            onClick={() => setActiveTab("following")}
            className={`flex-1 py-4 text-center font-extrabold text-[12px] uppercase tracking-wider transition-colors ${
              activeTab === "following"
                ? "text-[#4fc3f7] border-b-[3px] border-[#4fc3f7] -mb-[2px]"
                : "text-[rgba(255,255,255,0.5)] border-b-[3px] border-transparent hover:text-white -mb-[2px]"
            }`}
          >
            TAKİP EDİLEN
          </button>
          <button
            onClick={() => setActiveTab("followers")}
            className={`flex-1 py-4 text-center font-extrabold text-[12px] uppercase tracking-wider transition-colors ${
              activeTab === "followers"
                ? "text-[#4fc3f7] border-b-[3px] border-[#4fc3f7] -mb-[2px]"
                : "text-[rgba(255,255,255,0.5)] border-b-[3px] border-transparent hover:text-white -mb-[2px]"
            }`}
          >
            TAKİPÇİ
          </button>
        </div>

        <div className="flex flex-col min-h-[100px] py-2">
          {list.length === 0 ? (
            <div className="p-8 text-center text-[rgba(255,255,255,0.4)] font-bold text-[14px]">
              Bu liste henüz boş.
            </div>
          ) : (
            previewList.map((u) => (
              <Link
                key={u.username}
                href={`/profile/${u.username}`}
                className="flex items-center gap-4 px-6 py-3 hover:bg-white/5 transition-colors no-underline"
              >
                <div className="w-11 h-11 rounded-full overflow-hidden bg-[#1a2b2a] border-2 border-[rgba(255,255,255,0.1)] shrink-0">
                  {u.avatar ? (
                    <img
                      src={u.avatar}
                      alt={u.username}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <DefaultAvatar username={u.username} />
                  )}
                </div>
                <div className="flex flex-col justify-center flex-1 min-w-0">
                  <span className="font-extrabold text-[15px] text-white tracking-tight truncate">
                    {u.username}
                  </span>
                </div>

                {u.username !== currentUsername && (
                  <div onClick={(e) => e.stopPropagation()}>
                    <FollowButton
                      size="xs"
                      username={u.username}
                      isFollowing={myFollowing.some(
                        (f) => f.username === u.username
                      )}
                    />
                  </div>
                )}
              </Link>
            ))
          )}
        </div>

        {remainingCount > 0 && (
          <button
            onClick={() => setIsDialogOpen(true)}
            className="flex items-center justify-between w-full p-5 border-t-2 border-[rgba(255,255,255,0.1)] bg-transparent text-[rgba(255,255,255,0.7)] hover:bg-white/5 transition-colors cursor-pointer"
          >
            <span className="font-extrabold text-[13px] uppercase tracking-wider">
              {remainingCount} tane daha görüntüle
            </span>
            <ChevronRight size={18} strokeWidth={3} className="opacity-70" />
          </button>
        )}
      </div>

      <FollowListDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        followers={followers}
        following={following}
        myFollowing={myFollowing}
        currentUsername={currentUsername}
        defaultTab={activeTab}
      />
    </>
  );
}
