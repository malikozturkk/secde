import { createMetadata } from "@/src/lib/metadata";
import VerifyOtpForm from "./VerifyOtpForm";

export const metadata = createMetadata({
  title: "E-posta Doğrulama",
  description:
    "NamazGo hesabını etkinleştirmek için e-posta adresine gönderilen doğrulama kodunu gir.",
  path: "/verify-otp",
  noIndex: true,
});

export default function VerifyOtpPage() {
  return <VerifyOtpForm />;
}
