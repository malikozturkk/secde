"use client";

import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import styles from "./AppLayout.module.css";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className={styles.appShell}>
      <Sidebar />
      <main className={styles.mainContent}>{children}</main>
      {/* Right panel slot — empty for now, reserved for future widgets */}
      {/* <aside className={styles.rightPanel} /> */}
    </div>
  );
};

export default AppLayout;
