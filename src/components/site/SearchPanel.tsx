import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState, type FormEvent } from "react";
import { departureCities, destinations, trips } from "@/content/trips";
import { availableMonths, monthLabel } from "@/lib/trip-filters";
import { Button } from "@/components/ui/button";

const selectCls =
  "min-h-12 w-full rounded-xl border border-input bg-background px-3 text-sm focus-visible:outline-2 focus-visible:outline-primary-deep";

export function SearchPanel() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [month, setMonth] = useState("");
  const [city, setCity] = useState("");
  function submit(e: FormEvent) {
    e.preventDefault();
    navigate({
      to: "/trips",
      search: {
        destination: destination || undefined,
        month: month || undefined,
        city: city || undefined,
      },
    });
  }
  return (
    <form onSubmit={submit} aria-label="Search trips" className="grid gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end">
      <label className="space-y-2 text-sm font-semibold">
        <span>Destination</span>
        <select className={selectCls} value={destination} onChange={(e) => setDestination(e.target.value)}>
          <option value="">Anywhere</option>
          {destinations.map((d) => <option key={d}>{d}</option>)}
        </select>
      </label>
      <label className="space-y-2 text-sm font-semibold">
        <span>Travel month</span>
        <select className={selectCls} value={month} onChange={(e) => setMonth(e.target.value)}>
          <option value="">Any month</option>
          {availableMonths(trips).map((m) => <option key={m} value={m}>{monthLabel(m)}</option>)}
        </select>
      </label>
      <label className="space-y-2 text-sm font-semibold">
        <span>Departure city</span>
        <select className={selectCls} value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="">Any city</option>
          {departureCities.map((c) => <option key={c}>{c}</option>)}
        </select>
      </label>
      <Button type="submit" size="lg" className="sm:col-span-2 lg:col-span-1">
        <Search /> Search
      </Button>
    </form>
  );
}

export { selectCls };
