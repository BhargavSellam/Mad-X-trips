import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { X } from "lucide-react";
import { z } from "zod";
import { departureCities, destinations, trips } from "@/content/trips";
import { formatPrice } from "@/content/site";
import { availableMonths, filterTrips, monthLabel } from "@/lib/trip-filters";
import { pageMeta } from "@/lib/meta";
import { TripCard } from "@/components/site/TripCard";
import { selectCls } from "@/components/site/SearchPanel";
import { Button } from "@/components/ui/button";

const searchSchema = z.object({
  destination: z.string().optional(),
  month: z.string().optional(),
  city: z.string().optional(),
  duration: z.enum(["day", "short", "long"]).optional(),
  maxPrice: z.coerce.number().optional(),
  sort: z.enum(["date", "price-asc", "price-desc", "duration"]).optional(),
});
type S = z.infer<typeof searchSchema>;

export const Route = createFileRoute("/trips/")({
  validateSearch: searchSchema,
  head: () => ({ meta: pageMeta("Trips", "Browse MADX trips by destination, date, departure city, duration and price.") }),
  component: TripsPage,
});

const durationLabels = { day: "Day trip", short: "2–3 days", long: "4+ days" };
const prices = [100, 200, 300, 500];

function TripsPage() {
  const s = Route.useSearch();
  const navigate = useNavigate({ from: "/trips/" });
  const set = (patch: Partial<S>) => navigate({ search: (prev) => ({ ...prev, ...patch }), replace: true });
  const results = filterTrips(trips, s);

  const chips: { key: keyof S; label: string }[] = [];
  if (s.destination) chips.push({ key: "destination", label: s.destination });
  if (s.month) chips.push({ key: "month", label: monthLabel(s.month) });
  if (s.city) chips.push({ key: "city", label: `From ${s.city}` });
  if (s.duration) chips.push({ key: "duration", label: durationLabels[s.duration] });
  if (s.maxPrice) chips.push({ key: "maxPrice", label: `Up to ${formatPrice(s.maxPrice)}` });

  return (
    <div className="container-site py-12">
      <p className="eyebrow">Trips</p>
      <h1 className="heading-lg mt-2">Find your next trip</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">These are illustrative sample trips, not confirmed MADX departures.</p>

      <div className="mt-8 grid gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft sm:grid-cols-2 lg:grid-cols-6">
        <Sel label="Destination" value={s.destination} onChange={(v) => set({ destination: v })} options={destinations.map((d) => [d, d])} any="Anywhere" />
        <Sel label="Date" value={s.month} onChange={(v) => set({ month: v })} options={availableMonths(trips).map((m) => [m, monthLabel(m)])} any="Any month" />
        <Sel label="Departure city" value={s.city} onChange={(v) => set({ city: v })} options={departureCities.map((c) => [c, c])} any="Any city" />
        <Sel label="Duration" value={s.duration} onChange={(v) => set({ duration: v as S["duration"] })} options={Object.entries(durationLabels)} any="Any length" />
        <Sel label="Max price" value={s.maxPrice?.toString()} onChange={(v) => set({ maxPrice: v ? Number(v) : undefined })} options={prices.map((p) => [String(p), formatPrice(p)])} any="Any price" />
        <Sel label="Sort by" value={s.sort} onChange={(v) => set({ sort: v as S["sort"] })} options={[["price-asc", "Price: low to high"], ["price-desc", "Price: high to low"], ["duration", "Duration"]]} any="Soonest date" />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2" aria-live="polite">
        <span className="mr-2 text-sm text-muted-foreground">{results.length} trip{results.length === 1 ? "" : "s"}</span>
        {chips.map((c) => (
          <button key={c.key} onClick={() => set({ [c.key]: undefined })} className="inline-flex min-h-11 items-center gap-1 rounded-full border border-primary bg-accent px-4 text-sm" aria-label={`Remove filter ${c.label}`}>
            {c.label} <X className="size-3.5" />
          </button>
        ))}
        {chips.length > 0 && <Button variant="link" asChild><Link to="/trips" search={{}}>Clear all</Link></Button>}
      </div>

      {results.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-border p-12 text-center">
          <h2 className="text-3xl">No trips match those filters</h2>
          <p className="mt-2 text-muted-foreground">Try removing a filter, or ask us about a group trip.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild variant="outline"><Link to="/trips" search={{}}>Clear all</Link></Button>
            <Button asChild><Link to="/events">Enquire about a group trip</Link></Button>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {results.map((t) => <div key={t.slug} className="animate-in fade-in duration-500"><TripCard trip={t} month={s.month} /></div>)}
        </div>
      )}
    </div>
  );
}

function Sel({ label, value, onChange, options, any }: { label: string; value?: string | undefined; onChange: (v: string | undefined) => void; options: (readonly [string, string] | string[])[]; any: string }) {
  return (
    <label className="space-y-2 text-sm font-semibold">
      <span>{label}</span>
      <select className={selectCls} value={value ?? ""} onChange={(e) => onChange(e.target.value || undefined)}>
        <option value="">{any}</option>
        {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
    </label>
  );
}
