export const APP_LOCALE = "tr-TR";

const HOUR_MINUTE: Intl.DateTimeFormatOptions = {
  hour: "2-digit",
  minute: "2-digit",
};

const formatterCache = new Map<string, Intl.DateTimeFormat>();

const getFormatter = (
  timeZone: string,
  options: Intl.DateTimeFormatOptions
): Intl.DateTimeFormat => {
  const key = `${timeZone}|${JSON.stringify(options)}`;
  const cached = formatterCache.get(key);
  if (cached) return cached;

  let formatter: Intl.DateTimeFormat;
  try {
    formatter = new Intl.DateTimeFormat(APP_LOCALE, { ...options, timeZone });
  } catch {
    formatter = new Intl.DateTimeFormat(APP_LOCALE, options);
  }
  formatterCache.set(key, formatter);
  return formatter;
};

export const formatTimeInZone = (iso: string, timeZone: string): string => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return getFormatter(timeZone, HOUR_MINUTE).format(date);
};

export const formatOptionalTimeInZone = (
  iso: string | null | undefined,
  timeZone: string
): string => (iso ? formatTimeInZone(iso, timeZone) : "");

export const localDateInZone = (date: Date, timeZone: string): string => {
  const parts = getFormatter(timeZone, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";

  return `${get("year")}-${get("month")}-${get("day")}`;
};
