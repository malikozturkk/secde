"use client";

import { useState, use } from "react";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { useAuthStore } from "@/src/store/auth.store";
import { useProfile } from "@/src/hooks/auth/useProfile";
import { useGetFollowers } from "@/src/hooks/auth/useGetFollowers";
import { useGetFollowing } from "@/src/hooks/auth/useGetFollowing";
import { Button } from "@/src/components/ui/Button";
import AppLayout from "@/src/components/layout/AppLayout";
import DefaultAvatar from "./DefaultAvatar";
import ProfileSkeleton from "./ProfileSkeleton";
import NotFound from "./NotFound";
import FollowNetworkCard from "./components/FollowNetworkCard";
import AddFriendCard from "./components/AddFriendCard";
import FollowButton from "./components/FollowButton";
import FollowListDialog from "./components/FollowListDialog";

interface ProfilePageProps {
  params: Promise<{ username: string }>;
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const { username } = use(params);
  const { user: currentUser } = useAuthStore();
  const {
    data: profile,
    isLoading: isProfileLoading,
    isError,
  } = useProfile(username);
  const { data: followersData } = useGetFollowers(username);
  const { data: followingData } = useGetFollowing(username);
  const { data: myFollowingData } = useGetFollowing(
    currentUser?.username || ""
  );

  const followers = followersData ?? [];
  const following = followingData ?? [];
  const myFollowing = myFollowingData ?? [];

  const isOwner = currentUser?.username === username;
  const isFollowing =
    profile?.isFollowing ??
    followers.some((f) => f.username === currentUser?.username);
  const followersCount = profile?.followerCount ?? followers.length;
  const followingCount = profile?.followingCount ?? following.length;
  const mutualFollowers = profile?.mutualFollowers?.preview || [];
  const mutualCount = profile?.mutualFollowers?.count || 0;

  const [isFollowListOpen, setIsFollowListOpen] = useState(false);
  const [activeListTab, setActiveListTab] = useState<"following" | "followers">(
    "following"
  );

  const isLoading = isProfileLoading;

  const joinDate = profile
    ? new Date(profile.createdAt).toLocaleDateString("tr-TR", {
        year: "numeric",
        month: "long",
      })
    : "";

  return (
    <AppLayout
      rightPanel={
        <div className="w-full flex flex-col">
          <FollowNetworkCard
            followers={followers}
            following={following}
            myFollowing={myFollowing}
            currentUsername={currentUser?.username}
          />
          <AddFriendCard />
        </div>
      }
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');

        @keyframes ng-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ng-pop {
          0%   { opacity: 0; transform: scale(0.82); }
          70%  { transform: scale(1.04); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes ng-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes ng-shimmer {
          0%   { background-position: -600px 0; }
          100% { background-position:  600px 0; }
        }

        .ng-animate-up    { animation: ng-up 0.4s ease both; }
        .ng-animate-pop   { animation: ng-pop 0.5s cubic-bezier(0.34, 1.4, 0.64, 1) 0.1s both; }
        .ng-animate-float { animation: ng-float 3s ease-in-out infinite; }
        .ng-animate-ske   {
          background: linear-gradient(90deg, #1c2e35 25%, #223540 50%, #1c2e35 75%);
          background-size: 1200px 100%;
          animation: ng-shimmer 1.8s infinite linear;
        }
      `}</style>

      <div
        style={{ fontFamily: "'Nunito', 'Segoe UI', system-ui, sans-serif" }}
        className="text-white"
      >
        {isLoading ? (
          <ProfileSkeleton />
        ) : isError || !profile ? (
          <NotFound username={username} />
        ) : (
          <div className="ng-animate-up max-w-[1056px] w-full">
            <div className="bg-[#1c2e35] border border-white/[0.08] rounded-3xl overflow-hidden shadow-[0_4px_28px_rgba(0,0,0,0.45)]">
              <div
                className="min-h-[210px] flex items-end justify-center border-b border-white/[0.06] relative"
                style={{
                  backgroundColor:
                    profile.avatarCustomization.colors.background,
                }}
              >
                <div className="ng-animate-pop w-[190px] h-[210px] shrink-0">
                  <DefaultAvatar
                    username={profile.username}
                    config={profile.avatarCustomization}
                  />
                </div>

                {isOwner && (
                  <div className="absolute right-4 top-4">
                    <Link href="/settings/profile">
                      <Button variant="primary" size="sm">
                        <Pencil size={20} strokeWidth={2.5} />
                      </Button>
                    </Link>
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col gap-2">
                <h1 className="text-[26px] font-black tracking-tight m-0 mb-[3px] leading-[1.15]">
                  {profile.username}
                </h1>
                {profile.email && (
                  <span className="text-[13px] font-bold text-white/40 leading-none whitespace-nowrap">
                    {profile.email}
                  </span>
                )}
                <span className="text-[13px] font-bold text-white/90 leading-none whitespace-nowrap mb-2">
                  {joinDate} tarihinde katıldı
                </span>

                <div className="flex gap-4 items-center mb-4">
                  <span
                    onClick={() => {
                      setActiveListTab("following");
                      setIsFollowListOpen(true);
                    }}
                    className="text-[14px] font-extrabold text-[#4fc3f7] whitespace-nowrap cursor-pointer hover:underline"
                  >
                    {followingCount} Takip Edilen
                  </span>
                  <span
                    onClick={() => {
                      setActiveListTab("followers");
                      setIsFollowListOpen(true);
                    }}
                    className="text-[14px] font-extrabold text-[#4fc3f7] whitespace-nowrap cursor-pointer hover:underline"
                  >
                    {followersCount} Takipçi
                  </span>
                </div>

                {!isOwner && mutualCount > 0 && (
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex -space-x-2 overflow-hidden">
                      {mutualFollowers.slice(0, 3).map((f) => (
                        <div
                          key={f.username}
                          className="inline-block h-6 w-6 rounded-full ring-2 ring-[#1c2e35] overflow-hidden"
                          style={{
                            backgroundColor:
                              f.avatarCustomization.colors.background,
                          }}
                        >
                          <DefaultAvatar
                            username={f.username}
                            config={f.avatarCustomization}
                          />
                        </div>
                      ))}
                    </div>
                    <p className="text-[13px] font-bold text-white/60 m-0">
                      {mutualFollowers
                        .slice(0, 2)
                        .map((f) => f.username)
                        .join(", ")}
                      {mutualCount > 2 && ` ve diğer ${mutualCount - 2} kişi`}{" "}
                      takip ediyor
                    </p>
                  </div>
                )}

                {!isOwner && currentUser && (
                  <div className="mt-2 border-t border-[rgba(255,255,255,0.06)] pt-6 pb-2">
                    <FollowButton
                      username={username}
                      isFollowing={isFollowing}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <FollowListDialog
        isOpen={isFollowListOpen}
        onClose={() => setIsFollowListOpen(false)}
        followers={followers}
        following={following}
        myFollowing={myFollowing}
        currentUsername={currentUser?.username}
        defaultTab={activeListTab}
      />
    </AppLayout>
  );
}
