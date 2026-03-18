"use client";

import { use } from "react";
import Link from "next/link";
import { Mail, Hash, Pencil } from "lucide-react";
import { useAuthStore } from "@/src/store/auth.store";
import { useProfile } from "@/src/hooks/auth/useProfile";
import { Button } from "@/src/components/ui/Button";
import AppLayout from "@/src/components/layout/AppLayout";
import DefaultAvatar from "./DefaultAvatar";
import ProfileSkeleton from "./ProfileSkeleton";
import NotFound from "./NotFound";
import InfoBlock from "./InfoBlock";

interface ProfilePageProps {
  params: Promise<{ username: string }>;
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const { username } = use(params);
  const { user: currentUser } = useAuthStore();
  const { data: profile, isLoading, isError } = useProfile(username);

  const isOwner = currentUser?.username === username;

  const joinDate = profile
    ? new Date(profile.createdAt).toLocaleDateString("tr-TR", {
        year: "numeric",
        month: "long",
      })
    : "";

  return (
    <AppLayout
      rightPanel={
        <div className="h-full bg-white/5 rounded-2xl border border-white/5 p-6 flex items-center justify-center text-white/50 font-bold tracking-wide">
          Right Panel (Profile)
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
            <div className="bg-[#1c2e35] border border-white/[0.08] rounded-3xl overflow-hidden shadow-[0_4px_28px_rgba(0,0,0,0.45)] mb-3">
              <div
                className="min-h-[210px] flex items-end justify-center border-b border-white/[0.06] relative"
                style={{
                  background:
                    "linear-gradient(170deg, #142830 0%, #1a3842 100%)",
                }}
              >
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt={profile.username}
                    className="ng-animate-pop w-[110px] h-[110px] rounded-full object-cover border-4 border-[#1c2e35] outline outline-[3px] outline-[#25B49A] shadow-[0_0_32px_rgba(37,180,154,0.3)] mb-[14px]"
                  />
                ) : (
                  <div className="ng-animate-pop w-[190px] h-[210px] shrink-0">
                    <DefaultAvatar username={profile.username} />
                  </div>
                )}

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
                <span className="text-[13px] font-bold text-white/90 leading-none whitespace-nowrap">
                  {joinDate} tarihinde katıldı
                </span>
              </div>
            </div>

            {isOwner && (profile as any).id && (
              <div className="flex flex-col gap-[10px]">
                <InfoBlock
                  icon={<Hash strokeWidth={2.5} />}
                  label="Kullanıcı ID"
                  value={(profile as any).id}
                  accentBg="rgba(167,139,250,0.15)"
                  accentIcon="#a78bfa"
                />
                {profile.email && (
                  <InfoBlock
                    icon={<Mail strokeWidth={2.5} />}
                    label="E-posta Adresi"
                    value={profile.email}
                    accentBg="rgba(79,195,247,0.13)"
                    accentIcon="#4FC3F7"
                  />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
