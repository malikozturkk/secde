import { createMetadata } from "@/src/lib/metadata";
import NotificationsSettingsClient from "./NotificationsSettingsClient";

export const metadata = createMetadata({
  title: "Bildirimler",
  description:
    "Namaz vakti, işaretleme hatırlatması ve seri bildirimlerini yönet.",
  path: "/settings/notifications",
  noIndex: true,
});

export default function NotificationsSettingsPage() {
  return <NotificationsSettingsClient />;
}
