"use client";

import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import styles from "./AppLayout.module.css";

interface AppLayoutProps {
  children: React.ReactNode;
  rightPanel?: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, rightPanel }) => {
  return (
    <div className={styles.appShell}>
      <Sidebar />
      <div className={styles.mainContainer}>
        <main
          className={`${styles.mainContent} ${
            rightPanel ? styles.mainContentWithRightPanel : ""
          }`}
        >
          {children}
        </main>
        {rightPanel && (
          <aside className={styles.rightPanelWrapper}>
            <div className={styles.rightPanelInner}>{rightPanel}</div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default AppLayout;
