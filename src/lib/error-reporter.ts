import { telemetryService } from "@/src/services/telemetry.service";
import { ClientErrorSource } from "@/src/types/enums/telemetry.enums";

const MESSAGE_MAX = 500;
const STACK_MAX = 8000;
const URL_MAX = 300;
const DIGEST_MAX = 100;
const MAX_REPORTS_PER_SESSION = 10;

const reportedKeys = new Set<string>();
let reportCount = 0;

interface ReportInput {
  message: string | undefined;
  source: ClientErrorSource;
  stack?: string;
  digest?: string;
}

function currentPath(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return window.location.pathname.slice(0, URL_MAX);
}

export function reportClientError({
  message,
  source,
  stack,
  digest,
}: ReportInput): void {
  try {
    if (typeof window === "undefined") return;

    const trimmed = (message ?? "Bilinmeyen hata").slice(0, MESSAGE_MAX);

    if (trimmed === "Script error.") return;
    if (trimmed.includes("/telemetry/client-errors")) return;

    const key = `${source}:${trimmed}`;
    if (reportedKeys.has(key) || reportCount >= MAX_REPORTS_PER_SESSION) return;
    reportedKeys.add(key);
    reportCount += 1;

    telemetryService.reportClientError({
      message: trimmed,
      source,
      stack: stack?.slice(0, STACK_MAX),
      url: currentPath(),
      digest: digest?.slice(0, DIGEST_MAX),
    });
  } catch {
  }
}
