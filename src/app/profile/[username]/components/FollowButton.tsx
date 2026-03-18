import { UserCheck, UserPlus } from "lucide-react";
import { useToggleFollow } from "@/src/hooks/auth/useToggleFollow";
import { Button } from "@/src/components/ui/Button";

interface FollowButtonProps {
  username: string;
  isFollowing: boolean;
  size?: "xs" | "sm" | "md" | "lg";
}

const ICON_SIZE = { xs: 14, default: 18 } as const;

export default function FollowButton({
  username,
  isFollowing,
  size,
}: FollowButtonProps) {
  const { mutate, isPending } = useToggleFollow();

  const iconSize = size === "xs" ? ICON_SIZE.xs : ICON_SIZE.default;
  const showLabel = size !== "xs";

  const Icon = isFollowing ? UserCheck : UserPlus;
  const label = isFollowing ? "TAKİP EDİYORSUN" : "TAKİP ET";

  return (
    <Button
      onClick={(e) => {
        e.preventDefault();
        mutate(username);
      }}
      size={size}
      className="gap-1"
      variant={isFollowing ? "ghost" : "primary"}
      disabled={isPending}
    >
      {isPending ? (
        "BEKLENİYOR..."
      ) : (
        <>
          <Icon size={iconSize} strokeWidth={3} />
          {showLabel && label}
        </>
      )}
    </Button>
  );
}
