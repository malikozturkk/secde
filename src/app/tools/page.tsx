import { createMetadata } from "@/src/lib/metadata";
import { ToolsHubClient } from "./ToolsHubClient";

export const metadata = createMetadata({
  title: "Araçlar",
  description:
    "Kıble bulucu, zikirmatik ve zekât hesaplayıcı — ibadetinde işine yarayacak yardımcılar.",
  path: "/tools",
});

export default function ToolsPage() {
  return <ToolsHubClient />;
}
