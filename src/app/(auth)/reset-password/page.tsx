import { notFound } from "next/navigation";
import { authService } from "@/src/services/auth.service";
import { createMetadata } from "@/src/lib/metadata";
import ResetPasswordClient from "./ResetPasswordClient";

export const metadata = createMetadata({
  title: "Şifre Sıfırla",
  description: "NamazGo hesabın için yeni bir şifre belirle.",
  path: "/reset-password",
});

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
