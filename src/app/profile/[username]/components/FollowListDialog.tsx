import { useState, useEffect } from "react";
import { Dialog } from "@/src/components/ui/Dialog";
import DefaultAvatar from "../DefaultAvatar";
import Link from "next/link";
import FollowButton from "./FollowButton";

interface FollowListDialogProps {
  isOpen: boolean;
  onClose: () => void;
  followers: { username: string; avatar: string | null }[];
  following: { username: string; avatar: string | null }[];
  myFollowing: { username: string; avatar: string | null }[];
  currentUsername?: string;
  defaultTab?: "following" | "followers";
}

export default function FollowListDialog({
  isOpen,
  onClose,
  followers,
  following,
  myFollowing,
  currentUsername,
  defaultTab = "following",
}: FollowListDialogProps) {
  const [activeTab, setActiveTab] = useState<"following" | "followers">(
    defaultTab
  );

  useEffect(() => {
    if (isOpen) {
      setActiveTab(defaultTab);
    }
  }, [isOpen, defaultTab]);

  const list = activeTab === "following" ? following : followers;

  const header = (
    <div className="flex gap-4 w-full justify-center mt-3">
      <button
        onClick={() => setActiveTab("following")}
        className={`px-4 py-4 font-extrabold text-[14px] tracking-wide transition-colors uppercase ${
          activeTab === "following"
            ? "text-[#4fc3f7] border-b-2 border-[#4fc3f7]"
            : "text-[rgba(255,255,255,0.5)] border-b-2 border-transparent hover:text-white"
        }`}
      >
        TAKİP EDİLEN
      </button>
      <button
        onClick={() => setActiveTab("followers")}
        className={`px-4 py-4 font-extrabold text-[14px] tracking-wide transition-colors uppercase ${
          activeTab === "followers"
            ? "text-[#4fc3f7] border-b-2 border-[#4fc3f7]"
            : "text-[rgba(255,255,255,0.5)] border-b-2 border-transparent hover:text-white"
        }`}
      >
        TAKİPÇİ
      </button>
    </div>
  );

  return (
    <Dialog isOpen={isOpen} onClose={onClose} header={header}>
      <div className="flex flex-col">
        {list.length === 0 ? (
          <div className="p-8 text-center text-[rgba(255,255,255,0.5)] font-bold">
            Henüz kimse yok.
          </div>
        ) : (
          list.map((u) => (
            <Link
              key={u.username}
              href={`/profile/${u.username}`}
              onClick={onClose}
              className="flex items-center gap-4 p-4 border-b border-[rgba(255,255,255,0.05)] hover:bg-white/5 transition-colors cursor-pointer text-decoration-none last:border-0"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden bg-[#1a2b2a] border-2 border-[rgba(255,255,255,0.1)] shrink-0">
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
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-[17px] font-extrabold text-white truncate">
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
    </Dialog>
  );
}
