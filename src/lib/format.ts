import type { DayCode, HoursRow, Locale } from "@/config/types";
import { localeTags } from "@/lib/i18n";

const dayOrder: DayCode[] = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function dayName(day: DayCode, locale: Locale): string {
  // 2024-01-01 was a Monday.
  const date = new Date(Date.UTC(2024, 0, 1 + dayOrder.indexOf(day)));
  const name = new Intl.DateTimeFormat(localeTags[locale], { weekday: "short", timeZone: "UTC" }).format(date);
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function time(value: string, locale: Locale): string {
  const [hours, minutes] = value.split(":").map(Number);
  const date = new Date(Date.UTC(2024, 0, 1, hours, minutes));
  return new Intl.DateTimeFormat(localeTags[locale], { hour: "numeric", minute: "2-digit", timeZone: "UTC" }).format(date);
}

/** "Mon – Fri" for consecutive days, "Mon, Wed" otherwise. */
export function formatDays(days: DayCode[], locale: Locale): string {
  const sorted = [...days].sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
  const consecutive = sorted.every((day, i) => i === 0 || dayOrder.indexOf(day) === dayOrder.indexOf(sorted[i - 1]) + 1);
  if (consecutive && sorted.length > 2) {
    return `${dayName(sorted[0], locale)} – ${dayName(sorted[sorted.length - 1], locale)}`;
  }
  return sorted.map((day) => dayName(day, locale)).join(", ");
}

/** Days of the week not covered by any hours row, i.e. when the office is closed. */
export function closedDays(rows: HoursRow[]): DayCode[] {
  const open = new Set(rows.flatMap((row) => row.days));
  return dayOrder.filter((day) => !open.has(day));
}

export function formatHours(row: HoursRow, locale: Locale): string {
  return `${time(row.opens, locale)} – ${time(row.closes, locale)}`;
}

export function formatDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(localeTags[locale], { dateStyle: "long", timeZone: "UTC" }).format(new Date(iso));
}

/** All hours in one line, e.g. "Mon – Fri, 9:00 AM – 4:00 PM". */
export function formatHoursSummary(rows: HoursRow[], locale: Locale): string {
  return rows.map((row) => `${formatDays(row.days, locale)}, ${formatHours(row, locale)}`).join(" · ");
}
