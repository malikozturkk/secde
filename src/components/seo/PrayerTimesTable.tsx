import {
  PRAYER_LABELS,
  type PublicPrayerDay,
} from "@/src/types/prayer-times.types";
import { ELEVATION, TEXT } from "@/src/constants/surface";
import { cn } from "@/src/lib/utils";

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
    <div className={cn(ELEVATION.surface, "overflow-x-auto")}>
      <table className="w-full min-w-[520px] border-collapse text-left">
        <caption className={cn("px-5 pb-2 pt-5 text-left", TEXT.h3)}>
          {caption}
        </caption>
        <thead>
          <tr>
            <th
              scope="col"
              className="px-5 py-3 text-[11px] font-black uppercase tracking-[0.1em] text-[var(--ng-text-3)]"
            >
              Tarih
            </th>
            {PRAYER_LABELS.map(({ key, label }) => (
              <th
                key={key}
                scope="col"
                className="px-3 py-3 text-[11px] font-black uppercase tracking-[0.1em] text-[var(--ng-text-3)]"
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
                    ? "border-y-[length:var(--ng-stroke)] border-[var(--ng-green)] bg-[rgba(23,217,160,0.14)]"
                    : "border-t border-[var(--ng-edge)]"
                }
              >
                <th
                  scope="row"
                  className="px-5 py-3 text-left text-[13px] font-extrabold text-white"
                >
                  {day.gregorianLabel}
                  <span className="mt-0.5 block text-[11px] font-bold text-[var(--ng-text-3)]">
                    {isToday ? (
                      <span className="text-[var(--ng-green)]">Bugün · </span>
                    ) : null}
                    {day.weekdayName}
                  </span>
                </th>
                {PRAYER_LABELS.map(({ key }) => (
                  <td
                    key={key}
                    className={cn(
                    "px-3 py-3 text-[15px] font-black tabular-nums",
                    isToday ? "text-white" : "text-[var(--ng-text-2)]"
                  )}
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
