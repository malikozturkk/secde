"use client";

import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import PublicTopBar from "./PublicTopBar";
import { useAuthStore } from "@/src/store/auth.store";
import { useAuthHydrated } from "@/src/hooks/auth/useAuthHydrated";

interface AppLayoutProps {
  children: React.ReactNode;
  rightPanel?: React.ReactNode;
  mainClassName?: string;
  forcePublicShell?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  rightPanel,
  mainClassName,
  forcePublicShell = false,
}) => {
  const hydrated = useAuthHydrated();
  const user = useAuthStore((state) => state.user);
  const isGuest = forcePublicShell || (hydrated && !user);

  return (
    <div
      className={[
        "block bg-[var(--ng-canvas)]",
        isGuest ? "min-h-screen" : "h-screen overflow-hidden",
        isGuest ? "pl-0" : "pl-[var(--sidebar-width)]",
        "max-lg:h-auto max-lg:overflow-visible max-lg:pl-0",
        isGuest
          ? ""
          : "max-lg:pb-[calc(var(--mobile-bar-height,80px)+env(safe-area-inset-bottom,0px))]",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {isGuest ? <PublicTopBar /> : <Sidebar />}
      <div
        className={[
          "flex w-full max-w-[1536px] justify-center gap-4 mx-auto min-w-0",
          isGuest ? "h-auto" : "h-screen",
          "max-lg:flex-col max-lg:h-auto max-lg:max-w-full max-lg:px-0 max-lg:py-4",
        ].join(" ")}
      >
        <main
          className={[
            "flex-1 overflow-y-auto overflow-x-hidden bg-transparent",
            "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            "px-4 py-6 min-w-0",
            isGuest
              ? "h-auto overflow-visible"
              : "[height:calc(100vh-var(--cookie-banner-offset,0px))]",
            rightPanel ? "max-w-[860px]" : "",
            "max-lg:max-w-full max-lg:h-auto max-lg:overflow-visible max-lg:px-4 max-lg:py-0",
            mainClassName ?? "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {children}
        </main>

        {rightPanel && (
          <aside
            className="w-[368px] shrink-0 h-screen overflow-hidden
              max-lg:w-full max-lg:h-auto max-lg:overflow-visible"
          >
            <div className="h-full w-full px-4 py-6 max-lg:h-auto max-lg:px-4 max-lg:py-0">
              {rightPanel}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default AppLayout;
