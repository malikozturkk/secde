import type { Metadata } from "next";
import { siteConfig } from "@/src/config/site";
import ProfileClient from "./ProfileClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;

  return {
    title: `${username} Profili`,
    description: `${username} kullanıcısının NamazGo profili. Takipçilerini gör ve takip et.`,
    alternates: {
      canonical: `${siteConfig.url}/profile/${username}`,
    },
    openGraph: {
      title: `${username} — NamazGo Profili`,
      description: `${username} kullanıcısının NamazGo profili.`,
      url: `${siteConfig.url}/profile/${username}`,
    },
  };
}

export default function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  return <ProfileClient params={params} />;
}
