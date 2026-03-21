"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, LayoutGroup } from "framer-motion";
import { NavItem, MobileNavItem } from "./NavItem";
import styles from "./Sidebar.module.css";
import { useAuthStore } from "@/src/store/auth.store";
import DefaultAvatar from "@/src/app/profile/[username]/DefaultAvatar";

/** 🔥 Serilerim — Flame with warm gradient feel */
const IconSeries = () => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M16 3C16 3 8 11 8 18C8 22.4 11.6 26 16 26C20.4 26 24 22.4 24 18C24 11 16 3 16 3Z"
      fill="#FF6B35"
    />
    <path
      d="M16 9C16 9 11.5 14.5 11.5 18.5C11.5 21 13.5 23 16 23C18.5 23 20.5 21 20.5 18.5C20.5 14.5 16 9 16 9Z"
      fill="#FFAB00"
    />
    <path
      d="M16 14C16 14 13.5 17 13.5 19C13.5 20.4 14.6 21.5 16 21.5C17.4 21.5 18.5 20.4 18.5 19C18.5 17 16 14 16 14Z"
      fill="#FFD54F"
    />
    <circle cx="11" cy="8" r="1.2" fill="#FF9A6C" opacity="0.7" />
    <circle cx="21" cy="7" r="0.9" fill="#FF9A6C" opacity="0.5" />
  </svg>
);

/** 💧 Abdest — Water drop with sparkle lines */
const IconLearn = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="46"
    height="46"
    viewBox="0 0 46 46"
    fill="none"
  >
    <rect x="4" y="11" width="19" height="30" rx="4" fill="#1899D6" />
    <rect x="23" y="11" width="19" height="30" rx="4" fill="#1899D6" />

    <rect x="4" y="8" width="19" height="30" rx="4" fill="#1CB0F6" />
    <rect x="23" y="8" width="19" height="30" rx="4" fill="#1CB0F6" />

    <rect x="8" y="14" width="15" height="22" rx="2" fill="#E5E5E5" />
    <rect x="23" y="14" width="15" height="22" rx="2" fill="#E5E5E5" />

    <rect x="8" y="11" width="15" height="23" rx="2" fill="#FFFFFF" />
    <rect x="23" y="11" width="15" height="23" rx="2" fill="#FFFFFF" />

    <line
      x1="23"
      y1="11"
      x2="23"
      y2="34"
      stroke="#F0F0F0"
      strokeWidth="2"
      strokeLinecap="round"
    />

    <path d="M12 11V27L15.5 24L19 27V11H12Z" fill="#FFC800" />

    <rect x="26" y="16" width="9" height="3" rx="1.5" fill="#E5E5E5" />
    <rect x="26" y="22" width="9" height="3" rx="1.5" fill="#E5E5E5" />
    <rect x="26" y="28" width="6" height="3" rx="1.5" fill="#E5E5E5" />

    <rect
      x="5.5"
      y="10"
      width="1.5"
      height="10"
      rx="0.75"
      fill="white"
      opacity="0.4"
    />
    <rect
      x="39"
      y="10"
      width="1.5"
      height="10"
      rx="0.75"
      fill="white"
      opacity="0.4"
    />
  </svg>
);

/** 🏆 Puan Tabloları — Trophy cup, cartoon style */
const IconLeaderboard = () => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M10 6H22V15C22 18.9 19.3 22 16 22C12.7 22 10 18.9 10 15V6Z"
      fill="#F5A623"
    />
    <path
      d="M12 8H14V14C14 15.5 14.8 16.8 16 17.5"
      stroke="#FFD54F"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.6"
    />
    <path
      d="M10 8H7.5C6.7 8 6 8.7 6 9.5V11C6 12.7 7.3 14 9 14H10"
      stroke="#C47D0A"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="#F5A623"
    />
    <path
      d="M22 8H24.5C25.3 8 26 8.7 26 9.5V11C26 12.7 24.7 14 23 14H22"
      stroke="#C47D0A"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="#F5A623"
    />
    <rect x="14" y="22" width="4" height="3" rx="1" fill="#C47D0A" />
    <rect x="11" y="25" width="10" height="2.5" rx="1.2" fill="#C47D0A" />
    <path
      d="M16 10L17 12.5L19.5 12.8L17.8 14.4L18.2 17L16 15.8L13.8 17L14.2 14.4L12.5 12.8L15 12.5L16 10Z"
      fill="#FFF176"
    />
  </svg>
);

/** ⚡ Görevler — Lightning bolt inside a shield */
const IconQuests = () => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M16 3L6 8V15C6 21 10.2 26.4 16 28C21.8 26.4 26 21 26 15V8L16 3Z"
      fill="#EF5350"
    />
    <path
      d="M16 3L6 8V15C6 15 6 12 10 9L16 6L16 3Z"
      fill="#EF9A9A"
      opacity="0.4"
    />
    <path d="M17 8L12 17H15.5L14.5 24L20 14H16.5L17 8Z" fill="#FFD54F" />
    <path
      d="M17 8L12 17H15.5L14.5 24L20 14H16.5L17 8Z"
      stroke="#FFF176"
      strokeWidth="0.8"
      strokeLinejoin="round"
      opacity="0.5"
    />
  </svg>
);

/** 🛍️ Mağaza — Cute bag with a star */
const IconShop = () => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M7 12H25L23 27H9L7 12Z" fill="#9C27B0" />
    <rect x="6" y="10" width="20" height="4" rx="2" fill="#AB47BC" />
    <path
      d="M12 10V7.5C12 5.6 13.8 4 16 4C18.2 4 20 5.6 20 7.5V10"
      stroke="#7B1FA2"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M16 16L17.4 18.8L20.5 19.3L18.2 21.5L18.8 24.6L16 23.1L13.2 24.6L13.8 21.5L11.5 19.3L14.6 18.8L16 16Z"
      fill="#FFD54F"
    />
    <path
      d="M10 14L10.5 22"
      stroke="#CE93D8"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.4"
    />
  </svg>
);

/** 📊 İstatistik — Bar chart with upward arrow */
const IconStats = () => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect x="5" y="19" width="6" height="9" rx="2" fill="#4FC3F7" />
    <rect x="13" y="13" width="6" height="15" rx="2" fill="#29B6F6" />
    <rect x="21" y="6" width="6" height="22" rx="2" fill="#0288D1" />
    <path
      d="M24 4L26.5 7"
      stroke="#4FC3F7"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path
      d="M24 4L21.5 7"
      stroke="#4FC3F7"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path
      d="M24 4V9"
      stroke="#4FC3F7"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <rect
      x="7"
      y="21"
      width="2"
      height="3"
      rx="1"
      fill="#81D4FA"
      opacity="0.5"
    />
    <rect
      x="15"
      y="15"
      width="2"
      height="3"
      rx="1"
      fill="#81D4FA"
      opacity="0.5"
    />
    <rect
      x="23"
      y="8"
      width="2"
      height="3"
      rx="1"
      fill="#4FC3F7"
      opacity="0.5"
    />
  </svg>
);

/** ⚙️ Ayarlar — Clean gear/cog SVG, stroke-based */
const IconSettings = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

interface NavItemConfig {
  label: string;
  href: string;
  icon: React.ReactNode;
  hideOnMobile: boolean;
}
export interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const pathname = usePathname();
  const { user } = useAuthStore();

  if (!user) return;

  const NAV_ITEMS: NavItemConfig[] = [
    {
      label: "Serilerim",
      href: "/",
      icon: <IconSeries />,
      hideOnMobile: false,
    },
    {
      label: "Öğren",
      href: "/learn",
      icon: <IconLearn />,
      hideOnMobile: true,
    },
    {
      label: "Puan Tabloları",
      href: "/leaderboard",
      icon: <IconLeaderboard />,
      hideOnMobile: false,
    },
    {
      label: "Görevler",
      href: "/quests",
      icon: <IconQuests />,
      hideOnMobile: false,
    },
    {
      label: "Mağaza",
      href: "/shop",
      icon: <IconShop />,
      hideOnMobile: false,
    },
    {
      label: "İstatistik",
      href: "/stats",
      icon: <IconStats />,
      hideOnMobile: true,
    },
    {
      label: "Profil",
      href: `/profile/${user.username}`,
      icon: (
        <div
          className="rounded-full"
          style={{
            background: "linear-gradient(170deg, #142830 0%, #1a3842 100%)",
            width: 32,
            height: 32,
          }}
        >
          <DefaultAvatar username={user.username} />
        </div>
      ),
      hideOnMobile: false,
    },
  ];

  const isRouteActive = (href: string): boolean => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <LayoutGroup>
      <motion.aside
        className={`${styles.sidebar} ${className ?? ""}`}
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        transition={{
          duration: 0.4,
          ease: [0.34, 1.56, 0.64, 1],
        }}
        role="navigation"
        aria-label="Ana navigasyon"
      >
        <Link href="/" className={styles.logo}>
          NamazGo
        </Link>

        <ul className={styles.navList}>
          {NAV_ITEMS.map((item, index) => (
            <NavItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              isActive={isRouteActive(item.href)}
              hideOnMobile={item.hideOnMobile}
              index={index}
            />
          ))}
        </ul>

        <div className={styles.bottomSection}>
          <Link
            href="/settings/profile"
            className={styles.settingsItem}
            aria-label="Ayarlar"
          >
            <span className={styles.settingsIcon}>
              <IconSettings />
            </span>
            <span className={styles.settingsLabel}>Ayarlar</span>
          </Link>
        </div>
      </motion.aside>

      <nav className={styles.mobileBar} aria-label="Ana navigasyon">
        {NAV_ITEMS.map((item) => (
          <MobileNavItem
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            isActive={isRouteActive(item.href)}
            hideOnMobile={item.hideOnMobile}
          />
        ))}
      </nav>
    </LayoutGroup>
  );
};

export default Sidebar;
