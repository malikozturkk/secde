import { createMetadata } from "@/src/lib/metadata";
import LoginForm from "./LoginForm";

export const metadata = createMetadata({
  title: "Giriş Yap",
  description:
    "NamazGo hesabına giriş yap ve namaz öğrenme yolculuğuna devam et.",
  path: "/login",
});

export default function LoginPage() {
  return <LoginForm />;
}
