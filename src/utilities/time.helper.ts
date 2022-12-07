import dayjs from "dayjs";
import duration, { DurationUnitType } from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(duration);
dayjs.extend(relativeTime);

export function timeToHours(rawIsoTime: string, format = "HH:mm:ss") {
  return dayjs(rawIsoTime).format(format);
}

export function timeToDate(rawIsoTime: string, format = "DD/MM/YYYY") {
  return dayjs(rawIsoTime).format(format);
}

export function formatTime(time: number, unit: DurationUnitType) {
  return dayjs.duration(time, unit).humanize();
}

export function ageTilToday(date: Date, withoutSuffix = true) {
  return dayjs(date).toNow(withoutSuffix);
}

/**
 * Convert iso format date string to a suitable viewing format.
 * @param date iso-format
 * @param format
 */
export function formatDate(date: string, format = "DD/MM/YYYY") {
  return dayjs(new Date(date)).format(format);
}
