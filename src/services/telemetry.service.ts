import type { ClientErrorReportPayload } from "@/src/types/telemetry.types";

export const telemetryService = {
  reportClientError: (payload: ClientErrorReportPayload): void => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) return;

    void fetch(`${baseUrl}/telemetry/client-errors`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify(payload),
    }).catch(() => undefined);
  },
};
