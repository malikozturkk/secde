"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/src/store/auth.store";
import { LandingView } from "@/src/components/landing/LandingView";
import { DashboardView } from "@/src/components/dashboard/DashboardView";

export default function Home() {
  const { user } = useAuthStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-[#070F12] flex items-center justify-center">
        <span
          className="text-3xl text-white animate-pulse"
          style={{ fontFamily: "'Fredoka One', cursive" }}
        >
          NamazGo
        </span>
      </div>
    );
  }

  if (user) {
    return <DashboardView />;
  }

  return <LandingView />;
}
