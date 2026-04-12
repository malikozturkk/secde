import { createMetadata } from "@/src/lib/metadata";
import ProfileSettingsClient from "./ProfileSettingsClient";

export const metadata = createMetadata({
  title: "Hesap Ayarları",
  description:
    "NamazGo hesap ayarlarını düzenle. Kullanıcı adını, şifreni ve profil bilgilerini güncelle.",
  path: "/settings/profile",
  noIndex: true,
});

export default function SettingsProfilePage() {
  return <ProfileSettingsClient />;
}
