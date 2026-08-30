import { AvatarCustomization, Gender } from "@/src/types/auth.types";
import FemaleAvatar from "./FemaleAvatar";
import MaleAvatar from "./MaleAvatar";

export default function DefaultAvatar({
  username,
  config,
}: {
  username: string;
  config: AvatarCustomization;
}) {
  const gender = String(config.gender ?? "").toUpperCase();

  if (gender === Gender.FEMALE) {
    return <FemaleAvatar username={username} config={config} />;
  }

  return <MaleAvatar username={username} config={config} />;
}
