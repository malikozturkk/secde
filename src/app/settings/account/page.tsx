import { createMetadata } from "@/src/lib/metadata";
import AccountSettingsClient from "./AccountSettingsClient";

export const metadata = createMetadata({
  title: "Tercihler",
  description:
    "NamazGo hesap tercihlerini yönet. Kişisel bilgilerini ve dil tercihini güncelle.",
  path: "/settings/account",
  noIndex: true,
});

export default function SettingsAccountPage() {
  return <AccountSettingsClient />;
}
