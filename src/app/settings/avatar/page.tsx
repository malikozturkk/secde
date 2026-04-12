import { createMetadata } from "@/src/lib/metadata";
import AvatarSettingsClient from "./AvatarSettingsClient";

export const metadata = createMetadata({
  title: "Avatarını Düzenle",
  description:
    "NamazGo avatarının görüntüsünü özelleştir. Cilt, saç, göz ve kıyafet renklerini seç istediğin aksesuarı tak.",
  path: "/settings/avatar",
  noIndex: true,
});

export default function AvatarSettingsPage() {
  return <AvatarSettingsClient />;
}
