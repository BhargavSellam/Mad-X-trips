import { describe, expect, it } from "vitest";
import { trips } from "@/content/trips";
import { estimateTotal, filterTrips } from "@/lib/trip-filters";

describe("trip filters", () => {
  it("filters by departure city", () => {
    const r = filterTrips(trips, { city: "Bristol" });
    expect(r.map((t) => t.slug)).toEqual(["cornwall-coastal-trip"]);
  });
  it("day trips only returns 1-day trips", () => {
    expect(filterTrips(trips, { duration: "day" }).every((t) => t.durationDays === 1)).toBe(true);
  });
  it("sorts by price ascending", () => {
    const r = filterTrips(trips, { sort: "price-asc" });
    expect(r[0]?.pricePerPerson).toBe(59);
  });
  it("estimated total multiplies price by travellers", () => {
    expect(estimateTotal(249, 3)).toBe(747);
  });
});
