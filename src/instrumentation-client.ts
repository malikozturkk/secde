import { reportClientError } from "@/src/lib/error-reporter";
import { ClientErrorSource } from "@/src/types/enums/telemetry.enums";

window.addEventListener("error", (event) => {
  reportClientError({
    message: event.message,
    source: ClientErrorSource.WindowError,
    stack: event.error instanceof Error ? event.error.stack : undefined,
  });
});

window.addEventListener("unhandledrejection", (event) => {
  const reason: unknown = event.reason;
  reportClientError({
    message: reason instanceof Error ? reason.message : String(reason),
    source: ClientErrorSource.UnhandledRejection,
    stack: reason instanceof Error ? reason.stack : undefined,
  });
});
