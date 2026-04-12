import { createMetadata } from "@/src/lib/metadata";
import ForgotPasswordForm from "./ForgotPasswordForm";

export const metadata = createMetadata({
  title: "Şifremi Unuttum",
  description:
    "NamazGo hesabının şifresini sıfırlamak için e-posta adresini gir.",
  path: "/forgot-password",
});

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
