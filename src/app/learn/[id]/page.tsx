import type { Metadata } from "next";
import { siteConfig } from "@/src/config/site";
import GuideClient from "./GuideClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `İbadet Rehberi`,
    description: `İbadetlerin konusunu adım adım öğren. NamazGo interaktif rehberiyle pratik yap.`,
    alternates: {
      canonical: `${siteConfig.url}/learn/${id}`,
    },
    openGraph: {
      title: `İbadet Rehberi`,
      description: `İbadetlerin konusunu adım adım öğren.`,
      url: `${siteConfig.url}/learn/${id}`,
    },
  };
}

export default function GuidePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <GuideClient params={params} />;
}
