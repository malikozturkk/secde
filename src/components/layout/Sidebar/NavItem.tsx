"use client";

import React, { useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Sidebar.module.css";

export interface NavItemProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  hideOnMobile?: boolean;
  index?: number;
}

export const NavItem: React.FC<NavItemProps> = ({
  href,
  label,
  icon,
  isActive,
  index = 0,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <motion.li
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: index * 0.06,
        duration: 0.35,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      style={{ listStyle: "none" }}
    >
      <Link
        href={href}
        className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
        aria-current={isActive ? "page" : undefined}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <AnimatePresence>
          {isActive && (
            <motion.span
              className={styles.activePill}
              layoutId="sidebar-active-pill"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
            />
          )}
        </AnimatePresence>

        <motion.span
          className={styles.navItemIcon}
          animate={
            isHovered && !isActive
              ? {
                  rotate: [0, -8, 8, -4, 0],
                  transition: { duration: 0.35, ease: "easeInOut" },
                }
              : { rotate: 0 }
          }
        >
          {icon}
        </motion.span>

        <span className={styles.navItemLabel}>{label}</span>
      </Link>
    </motion.li>
  );
};

export const MobileNavItem: React.FC<NavItemProps> = ({
  href,
  icon,
  label,
  isActive,
  hideOnMobile,
}) => {
  if (hideOnMobile) return null;

  return (
    <Link
      href={href}
      className={`${styles.mobileNavItem} ${
        isActive ? styles.mobileNavItemActive : ""
      }`}
      aria-label={label}
      aria-current={isActive ? "page" : undefined}
    >
      <span className={styles.mobileNavItemIcon}>{icon}</span>
      {isActive && (
        <motion.span
          className={styles.mobileActiveDot}
          layoutId="mobile-active-dot"
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
        />
      )}
    </Link>
  );
};
