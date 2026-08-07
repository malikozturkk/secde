import type { ClientErrorSource } from "./enums/telemetry.enums";

export interface ClientErrorReportPayload {
  message: string;
  source: ClientErrorSource;
  stack?: string;
  url?: string;
  digest?: string;
}
