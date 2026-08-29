import { createMetadata } from "@/src/lib/metadata";
import DataSettingsClient from "./DataSettingsClient";

export const metadata = createMetadata({
  title: "Verilerim",
  description: "Kişisel verilerinin bir kopyasını JSON olarak indir.",
  path: "/settings/data",
  noIndex: true,
});

export default function DataSettingsPage() {
  return <DataSettingsClient />;
}
