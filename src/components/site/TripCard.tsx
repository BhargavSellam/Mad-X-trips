import { Link } from "@tanstack/react-router";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import type { Trip } from "@/content/trips";
import { formatDate, formatPrice } from "@/content/site";
import { nextDeparture } from "@/lib/trip-filters";
import { Button } from "@/components/ui/button";

export function TripCard({ trip, month }: { trip: Trip; month?: string | undefined }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-transform duration-300 hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={trip.image} alt={trip.destination} loading="lazy" width={1280} height={960} className="img-zoom h-full w-full object-cover" />
        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold">Sample trip</span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="eyebrow">{trip.destination}</p>
        <h3 className="text-2xl">{trip.title}</h3>
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          <li className="flex items-center gap-2"><CalendarDays className="size-4 shrink-0 text-primary-deep" /> {formatDate(nextDeparture(trip, month))}</li>
          <li className="flex items-center gap-2"><Clock className="size-4 shrink-0 text-primary-deep" /> {trip.durationDays === 1 ? "Day trip" : `${trip.durationDays} days`}</li>
          <li className="flex items-start gap-2"><MapPin className="mt-0.5 size-4 shrink-0 text-primary-deep" /> {trip.pickups.map((p) => p.city).join(", ")}</li>
        </ul>
        <div className="mt-auto flex items-end justify-between gap-3 border-t border-border pt-4">
          <p>
            <span className="text-xs text-muted-foreground">From</span>
            <br />
            <span className="font-serif text-2xl font-semibold">{formatPrice(trip.pricePerPerson)}</span>
            <span className="text-xs text-muted-foreground"> pp</span>
          </p>
          <Button asChild size="sm">
            <Link to="/trips/$slug" params={{ slug: trip.slug }}>View Trip</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
