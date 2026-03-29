"use client";

import React from "react";
import Sidebar from "./Sidebar/Sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
  rightPanel?: React.ReactNode;
  mainClassName?: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  rightPanel,
  mainClassName,
}) => {
  return (
    <div
      className="block bg-[var(--color-bg)] h-screen overflow-hidden pl-[var(--sidebar-width)]
        max-lg:h-auto max-lg:overflow-visible max-lg:pl-0
        max-lg:pb-[calc(var(--mobile-bar-height,80px)+env(safe-area-inset-bottom,0px))]"
    >
      <Sidebar />
      <div
        className="flex w-full max-w-[1056px] gap-4 mx-auto h-screen min-w-0
          max-lg:flex-col max-lg:h-auto max-lg:max-w-full max-lg:px-0 max-lg:py-4"
      >
        <main
          className={[
            "flex-1 h-screen overflow-y-auto overflow-x-hidden bg-transparent",
            "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            "px-4 py-6 min-w-0",
            rightPanel ? "max-w-[600px]" : "",
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
