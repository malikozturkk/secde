import { createMetadata } from "@/src/lib/metadata";
import RegisterForm from "./RegisterForm";

export const metadata = createMetadata({
  title: "Kayıt Ol",
  description:
    "NamazGo'ya ücretsiz kayıt ol. Oyunlaştırılmış derslerle namaz kılmayı ve abdest almayı öğren, ibadetlerini takip et.",
  path: "/register",
});

export default function RegisterPage() {
  return <RegisterForm />;
}
