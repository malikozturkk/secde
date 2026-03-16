"use client";

import { useAuthStore } from "@/src/store/auth.store";
import { LandingView } from "@/src/components/landing/LandingView";
import { DashboardView } from "@/src/components/dashboard/DashboardView";

export default function Home() {
  const { user } = useAuthStore();

  if (user) {
    return <DashboardView />;
  }

  return <LandingView />;
}
