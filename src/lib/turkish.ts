const UNIT_LOCATIVE = ["da", "de", "de", "te", "te", "te", "da", "de", "de", "da"];
const TENS_LOCATIVE = ["da", "da", "de", "da", "ta", "de"];

function locativeForNumber(value: number): string {
  const unit = value % 10;
  const tens = Math.floor(value / 10);

  if (unit !== 0) return UNIT_LOCATIVE[unit];
  if (tens === 0) return UNIT_LOCATIVE[0];
  return TENS_LOCATIVE[tens] ?? "da";
}

export function timeLocativeSuffix(time: string): string {
  const match = /^(\d{1,2}):(\d{2})/.exec(time.trim());
  if (!match) return "da";

  const hour = Number(match[1]);
  const minute = Number(match[2]);

  return minute === 0 ? locativeForNumber(hour) : locativeForNumber(minute);
}
