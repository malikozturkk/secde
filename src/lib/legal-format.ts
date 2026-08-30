import { APP_LOCALE } from "./time-format";

export function formatLegalDate(effectiveDate: string | null): string | null {
  if (!effectiveDate) return null;

  const parsed = Date.parse(`${effectiveDate}T00:00:00Z`);
  if (Number.isNaN(parsed)) return null;

  return new Intl.DateTimeFormat(APP_LOCALE, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(parsed));
}
