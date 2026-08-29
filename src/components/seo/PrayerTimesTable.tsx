import {
  PRAYER_LABELS,
  type PublicPrayerDay,
} from "@/src/types/prayer-times.types";

export function PrayerTimesTable({
  days,
  caption,
  todayDate,
}: {
  days: readonly PublicPrayerDay[];
  caption: string;
  todayDate: string;
}) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-white/[0.06] bg-[#1C2E35]">
      <table className="w-full min-w-[520px] border-collapse text-left">
        <caption className="px-5 pb-1 pt-5 text-left text-[17px] font-black text-white">
          {caption}
        </caption>
        <thead>
          <tr>
            <th
              scope="col"
              className="px-5 py-3 text-[11px] font-black uppercase tracking-[0.1em] text-white/40"
            >
              Tarih
            </th>
            {PRAYER_LABELS.map(({ key, label }) => (
              <th
                key={key}
                scope="col"
                className="px-3 py-3 text-[11px] font-black uppercase tracking-[0.1em] text-white/40"
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((day) => {
            const isToday = day.date === todayDate;
            return (
              <tr
                key={day.date}
                className={
                  isToday
                    ? "bg-[rgba(37,180,154,0.10)]"
                    : "border-t border-white/[0.05]"
                }
              >
                <th
                  scope="row"
                  className="px-5 py-3 text-left text-[13px] font-extrabold text-white"
                >
                  {day.gregorianLabel}
                  <span className="mt-0.5 block text-[11px] font-bold text-white/40">
                    {isToday ? "Bugün · " : ""}
                    {day.weekdayName}
                  </span>
                </th>
                {PRAYER_LABELS.map(({ key }) => (
                  <td
                    key={key}
                    className="px-3 py-3 text-[14px] font-bold tabular-nums text-white/80"
                  >
                    {day.times[key]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
