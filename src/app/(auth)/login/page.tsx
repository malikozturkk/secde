import { Suspense } from "react";
import { createMetadata } from "@/src/lib/metadata";
import LoginForm from "./LoginForm";

export const metadata = createMetadata({
  title: "Giriş Yap",
  description:
    "NamazGo hesabına giriş yap ve namaz öğrenme yolculuğuna devam et.",
  path: "/login",
});

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[var(--ng-canvas)]" aria-hidden="true" />
      }
    >
      <LoginForm />
    </Suspense>
  );
}
