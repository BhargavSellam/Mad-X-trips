import type { Trip } from "@/content/trips";

export type TripFilters = {
  destination?: string | undefined;
  month?: string | undefined; // "YYYY-MM"
  city?: string | undefined;
  duration?: "day" | "short" | "long" | undefined;
  maxPrice?: number | undefined;
  sort?: "date" | "price-asc" | "price-desc" | "duration" | undefined;
};

export const nextDeparture = (t: Trip, month?: string): string =>
  [...t.departures].sort().find((d) => !month || d.startsWith(month)) ?? t.departures[0] ?? "";

export function filterTrips(list: Trip[], f: TripFilters): Trip[] {
  const out = list.filter((t) => {
    if (f.destination && t.destination !== f.destination) return false;
    if (f.month && !t.departures.some((d) => d.startsWith(f.month!))) return false;
    if (f.city && !t.pickups.some((p) => p.city === f.city)) return false;
    if (f.duration === "day" && t.durationDays !== 1) return false;
    if (f.duration === "short" && (t.durationDays < 2 || t.durationDays > 3)) return false;
    if (f.duration === "long" && t.durationDays < 4) return false;
    if (f.maxPrice != null && t.pricePerPerson > f.maxPrice) return false;
    return true;
  });
  const sort = f.sort ?? "date";
  return out.sort((a, b) => {
    if (sort === "price-asc") return a.pricePerPerson - b.pricePerPerson;
    if (sort === "price-desc") return b.pricePerPerson - a.pricePerPerson;
    if (sort === "duration") return a.durationDays - b.durationDays;
    return nextDeparture(a, f.month).localeCompare(nextDeparture(b, f.month));
  });
}

export const estimateTotal = (pricePerPerson: number, travellers: number) =>
  pricePerPerson * Math.max(1, Math.floor(travellers));

export function availableMonths(list: Trip[]) {
  return Array.from(new Set(list.flatMap((t) => t.departures.map((d) => d.slice(0, 7))))).sort();
}

export const monthLabel = (ym: string) =>
  new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric" }).format(
    new Date(ym + "-01T00:00:00"),
  );
