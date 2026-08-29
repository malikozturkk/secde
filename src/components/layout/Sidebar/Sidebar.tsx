"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, LayoutGroup } from "framer-motion";
import { NavItem, MobileNavItem } from "./NavItem";
import styles from "./Sidebar.module.css";
import { useAuthStore } from "@/src/store/auth.store";
import DefaultAvatar from "@/src/app/profile/[username]/DefaultAvatar";
import { Series, Settings, Worship } from "@/src/icons/tsx/sidebar";
import NotificationBell from "@/src/components/notifications/NotificationBell";

interface NavItemConfig {
  label: string;
  href: string;
  icon: React.ReactNode;
  hideOnMobile: boolean;
  matchPrefix?: string;
}
interface SidebarProps {
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
      icon: <Series />,
      hideOnMobile: false,
    },
    {
      label: "Vakitler",
      href: "/worship",
      icon: <Worship />,
      hideOnMobile: false,
    },
    // {
    //   label: "Puan Tabloları",
    //   href: "/leaderboard",
    //   icon: <Leaderboard />,
    //   hideOnMobile: false,
    // },
    // {
    //   label: "Görevler",
    //   href: "/quests",
    //   icon: <Quests />,
    //   hideOnMobile: false,
    // },
    // {
    //   label: "Mağaza",
    //   href: "/shop",
    //   icon: <Shop />,
    //   hideOnMobile: false,
    // },
    // {
    //   label: "İstatistik",
    //   href: "/stats",
    //   icon: <Stats />,
    //   hideOnMobile: true,
    // },
    {
      label: "Profil",
      href: `/profile/${user.username}`,
      icon: (
        <div
          className="inline-block h-8 w-8 rounded-full overflow-hidden p-0.5"
          style={{
            background: user.avatarCustomization.colors.background,
          }}
        >
          <DefaultAvatar
            username={user.username}
            config={user.avatarCustomization}
          />
        </div>
      ),
      hideOnMobile: false,
    },
  ];

  const isRouteActive = (href: string): boolean => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const MOBILE_NAV_ITEMS: NavItemConfig[] = [
    ...NAV_ITEMS,
    {
      label: "Ayarlar",
      href: "/settings/profile",
      matchPrefix: "/settings",
      icon: <Settings className={styles.settingsMobileIcon} />,
      hideOnMobile: false,
    },
  ];

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
              isActive={isRouteActive(item.matchPrefix ?? item.href)}
              hideOnMobile={item.hideOnMobile}
              index={index}
            />
          ))}
        </ul>

        <div className={styles.bottomSection}>
          <NotificationBell
            variant="sidebar"
            classNames={{
              trigger: styles.settingsItem,
              icon: styles.settingsIcon,
              label: styles.settingsLabel,
            }}
          />

          <Link
            href="/settings/profile"
            className={styles.settingsItem}
            aria-label="Ayarlar"
          >
            <span className={styles.settingsIcon}>
              <Settings />
            </span>
            <span className={styles.settingsLabel}>Ayarlar</span>
          </Link>
        </div>
      </motion.aside>

      <nav className={styles.mobileBar} aria-label="Ana navigasyon">
        {MOBILE_NAV_ITEMS.map((item) => (
          <MobileNavItem
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            isActive={isRouteActive(item.matchPrefix ?? item.href)}
            hideOnMobile={item.hideOnMobile}
          />
        ))}

        <NotificationBell
          variant="mobile"
          classNames={{
            trigger: styles.mobileNavItem,
            triggerActive: styles.mobileNavItemActive,
            icon: styles.mobileNavItemIcon,
          }}
        />
      </nav>
    </LayoutGroup>
  );
};

export default Sidebar;
