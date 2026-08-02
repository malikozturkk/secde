import { createMetadata } from "@/src/lib/metadata";
import { QiblaClient } from "./QiblaClient";

export const metadata = createMetadata({
  title: "Kıble Bulucu",
  description:
    "Bulunduğun yerden Kâbe'nin hangi yönde olduğunu pusulayla göster.",
  path: "/tools/qibla",
});

export default function QiblaPage() {
  return <QiblaClient />;
}
