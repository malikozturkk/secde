const MINUTE = 60;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const MONTH = 30 * DAY;
const YEAR = 365 * DAY;

export const formatDistanceToNowTr = (iso: string, now: Date = new Date()): string => {
  const then = new Date(iso).getTime();
  if (!Number.isFinite(then)) return "";

  const seconds = Math.max(0, Math.floor((now.getTime() - then) / 1000));

  if (seconds < 45) return "az önce";
  if (seconds < HOUR) {
    const m = Math.max(1, Math.round(seconds / MINUTE));
    return `${m} dakika önce`;
  }
  if (seconds < DAY) {
    const h = Math.round(seconds / HOUR);
    return `${h} saat önce`;
  }
  if (seconds < MONTH) {
    const d = Math.round(seconds / DAY);
    return d === 1 ? "dün" : `${d} gün önce`;
  }
  if (seconds < YEAR) {
    const mo = Math.round(seconds / MONTH);
    return `${mo} ay önce`;
  }
  const y = Math.round(seconds / YEAR);
  return `${y} yıl önce`;
};

export const formatJoinedAtTr = (iso: string, now?: Date): string => {
  const rel = formatDistanceToNowTr(iso, now);
  return rel ? `${rel} katıldı` : "";
};
