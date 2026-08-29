import {
  PRAYER_LABELS,
  type PublicPrayerDay,
} from "@/src/types/prayer-times.types";
import { ACCENT, STAT_TILE, TEXT } from "@/src/constants/surface";
import { cn } from "@/src/lib/utils";

export function TodayPrayerTimes({
  day,
  cityName,
}: {
  day: PublicPrayerDay;
  cityName: string;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden p-5 sm:p-6",
        ACCENT.green.tintedCard
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full bg-[radial-gradient(closest-side,rgba(23,217,160,0.28),transparent_70%)] blur-xl"
      />
      <div className="relative">
        <span
          className={cn(
            "inline-flex items-center rounded-full px-3 py-1.5",
            ACCENT.green.chip,
            TEXT.eyebrow
          )}
        >
          BUGÜN
        </span>
        <div className="mt-3 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className={TEXT.h3}>{cityName} namaz vakitleri</h2>
          <p className={TEXT.muted}>
            {day.gregorianLabel} {day.weekdayName} · {day.hijriDate}
          </p>
        </div>

        <dl className="mt-4 grid grid-cols-3 gap-2.5 sm:grid-cols-6">
          {PRAYER_LABELS.map(({ key, label }) => (
            <div key={key} className={STAT_TILE}>
              <dt
                className={cn(
                  "text-[10px] font-black uppercase tracking-[0.10em] text-[var(--ng-text-3)]"
                )}
              >
                {label}
              </dt>
              <dd className={cn(TEXT.num, "text-[21px]")}>{day.times[key]}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
