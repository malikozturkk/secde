import { notFound } from "next/navigation";
import { authService } from "@/src/services/auth.service";
import ResetPasswordClient from "./ResetPasswordClient";

interface ResetPasswordPageProps {
  searchParams: Promise<{
    user_id?: string;
    token?: string;
  }>;
}

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const { user_id, token } = await searchParams;

  if (!user_id || !token) notFound();
  try {
    const { data } = await authService.validateResetToken({
      userId: user_id,
      token,
    });

    if (!data.data) notFound();
  } catch {
    notFound();
  }

  return <ResetPasswordClient userId={user_id} token={token} />;
}
