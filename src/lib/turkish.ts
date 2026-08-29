export function upperTr(value: string): string {
  return value.toLocaleUpperCase("tr-TR");
}

export function capitalizeTr(value: string): string {
  if (!value) return value;
  return value.charAt(0).toLocaleUpperCase("tr-TR") + value.slice(1);
}

const UNIT_LOCATIVE = [
  "da",
  "de",
  "de",
  "te",
  "te",
  "te",
  "da",
  "de",
  "de",
  "da",
];

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

const BACK_VOWELS = "aıouâû";
const FRONT_VOWELS = "eiöüî";
const VOICELESS = "fstkçşhp";

const LOCATIVE_EXCEPTIONS: Record<string, string> = {
  Kırklareli: "Kırklareli'nde",
};

export function locative(name: string): string {
  const exception = LOCATIVE_EXCEPTIONS[name];
  if (exception) return exception;

  const lowered = name.toLocaleLowerCase("tr-TR");

  let lastVowel = "";
  for (const char of lowered) {
    if (BACK_VOWELS.includes(char) || FRONT_VOWELS.includes(char)) {
      lastVowel = char;
    }
  }

  const vowel = FRONT_VOWELS.includes(lastVowel) ? "e" : "a";
  const consonant = VOICELESS.includes(lowered.at(-1) ?? "") ? "t" : "d";

  return `${name}'${consonant}${vowel}`;
}
