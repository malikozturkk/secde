import {
  PRAYER_LABELS,
  type PublicPrayerDay,
} from "@/src/types/prayer-times.types";

export function TodayPrayerTimes({
  day,
  cityName,
}: {
  day: PublicPrayerDay;
  cityName: string;
}) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-[rgba(37,180,154,0.30)] bg-gradient-to-br from-[rgba(37,180,154,0.18)] via-[#1C2E35] to-[#1C2E35] to-70% p-5 sm:p-6">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full bg-[radial-gradient(closest-side,rgba(37,180,154,0.22),transparent_70%)] blur-xl"
      />
      <div className="relative">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-[19px] font-black leading-tight text-white">
            {cityName} — bugünün namaz vakitleri
          </h2>
          <p className="text-[12px] font-bold text-white/50">
            {day.gregorianLabel} {day.weekdayName} · {day.hijriDate}
          </p>
        </div>

        <dl className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
          {PRAYER_LABELS.map(({ key, label }) => (
            <div
              key={key}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.03] px-2 py-3 text-center"
            >
              <dt className="text-[11px] font-black uppercase tracking-[0.08em] text-white/45">
                {label}
              </dt>
              <dd className="mt-1 text-[19px] font-black tabular-nums text-white">
                {day.times[key]}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
