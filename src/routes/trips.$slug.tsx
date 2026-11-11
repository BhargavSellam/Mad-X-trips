import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CalendarDays, Clock, MapPin, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { getTrip } from "@/content/trips";
import { formatDate, formatPrice } from "@/content/site";
import { estimateTotal } from "@/lib/trip-filters";
import { Button } from "@/components/ui/button";
import { Faq } from "@/components/site/Faq";
import { whatsappLink } from "@/components/site/WhatsAppButton";
import { selectCls } from "@/components/site/SearchPanel";

export const Route = createFileRoute("/trips/$slug")({
  loader: ({ params }) => {
    const trip = getTrip(params.slug);
    if (!trip) throw notFound();
    return { trip };
  },
  head: ({ loaderData }) => {
    const t = loaderData?.trip;
    const title = t ? `${t.title} | MADX Trips and Events` : "Trip not found | MADX";
    const desc = t?.summary ?? "Trip not found.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(t ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  component: TripPage,
});

function TripPage() {
  const { trip } = Route.useLoaderData();
  const [date, setDate] = useState<string>(trip.departures[0] ?? "");
  const [pickup, setPickup] = useState<string>(trip.pickups[0]?.city ?? "");
  const [n, setN] = useState(2);
  const [img, setImg] = useState(0);
  const total = estimateTotal(trip.pricePerPerson, n);
  const interest = `${trip.title} — ${formatDate(date)} — ${n} traveller(s) from ${pickup}`;
  const wa = whatsappLink(`Hello MADX, I'd like to enquire about ${trip.title} on ${formatDate(date)} for ${n} traveller(s). ${typeof window !== "undefined" ? window.location.href : ""}`);

  const summary = (
    <div className="space-y-4">
      <p><span className="font-serif text-3xl font-semibold">{formatPrice(trip.pricePerPerson)}</span> <span className="text-sm text-muted-foreground">per person</span></p>
      <label className="block space-y-2 text-sm font-semibold"><span>Departure date</span>
        <select className={selectCls} value={date} onChange={(e) => setDate(e.target.value)}>{trip.departures.map((d) => <option key={d} value={d}>{formatDate(d)}</option>)}</select>
      </label>
      <label className="block space-y-2 text-sm font-semibold"><span>Pickup point</span>
        <select className={selectCls} value={pickup} onChange={(e) => setPickup(e.target.value)}>{trip.pickups.map((p) => <option key={p.city} value={p.city}>{p.city} · {p.time}</option>)}</select>
      </label>
      <div className="space-y-2 text-sm font-semibold"><span>Travellers</span>
        <div className="flex items-center gap-3">
          <Button size="icon" variant="outline" onClick={() => setN(Math.max(1, n - 1))} aria-label="Fewer travellers"><Minus /></Button>
          <span className="w-8 text-center text-lg" aria-live="polite">{n}</span>
          <Button size="icon" variant="outline" onClick={() => setN(Math.min(20, n + 1))} aria-label="More travellers"><Plus /></Button>
        </div>
      </div>
      <dl className="space-y-1 border-t border-border pt-4 text-sm">
        <div className="flex justify-between"><dt>{formatPrice(trip.pricePerPerson)} × {n}</dt><dd>{formatPrice(total)}</dd></div>
        <div className="flex justify-between font-semibold"><dt>Estimated total</dt><dd>{formatPrice(total)}</dd></div>
      </dl>
      <p className="text-xs text-muted-foreground">Sample trip — online booking isn’t available. An enquiry does not confirm a place.</p>
      <Button asChild size="lg" className="w-full"><Link to="/contact" search={{ trip: interest }}>Enquire to Book</Link></Button>
      {wa && <Button asChild variant="outline" className="w-full"><a href={wa} target="_blank" rel="noreferrer">Ask on WhatsApp</a></Button>}
    </div>
  );

  return (
    <div className="container-site py-10 pb-32 lg:pb-10">
      <Link to="/trips" className="inline-flex min-h-11 items-center text-sm text-muted-foreground hover:text-foreground">← All trips</Link>
      <div className="mt-4 grid gap-3 md:grid-cols-[3fr_1fr]">
        <img src={trip.gallery[img] ?? trip.image} alt={trip.title} width={1280} height={960} className="aspect-[16/10] w-full rounded-3xl object-cover" />
        <div className="grid grid-cols-3 gap-3 md:grid-cols-1">
          {trip.gallery.map((g, i) => (
            <button key={i} onClick={() => setImg(i)} aria-label={`Show image ${i + 1}`} className={`overflow-hidden rounded-2xl ring-offset-2 ${i === img ? "ring-2 ring-primary" : ""}`}>
              <img src={g} alt="" loading="lazy" width={1280} height={960} className="aspect-[4/3] h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_380px]">
        <div className="min-w-0 space-y-12">
          <header className="space-y-3">
            <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold">Sample trip — illustrative only</span>
            <p className="eyebrow">{trip.destination}, {trip.region}</p>
            <h1 className="heading-lg">{trip.title}</h1>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><Clock className="size-4 text-primary-deep" />{trip.durationDays === 1 ? "Day trip" : `${trip.durationDays} days`}</span>
              <span className="flex items-center gap-2"><CalendarDays className="size-4 text-primary-deep" />{trip.departures.length} sample dates</span>
            </div>
            <p className="text-lg text-muted-foreground">{trip.overview}</p>
          </header>
          <Block title="Departure dates"><ul className="flex flex-wrap gap-2">{trip.departures.map((d) => <li key={d} className="rounded-full border border-border px-4 py-2 text-sm">{formatDate(d)}</li>)}</ul></Block>
          <Block title="Pickup points">
            <ul className="divide-y divide-border rounded-2xl border border-border">{trip.pickups.map((p) => <li key={p.city} className="flex items-center justify-between gap-4 p-4 text-sm"><span className="flex items-center gap-2"><MapPin className="size-4 text-primary-deep" />{p.city} — {p.location}</span><span className="font-semibold">{p.time}</span></li>)}</ul>
          </Block>
          <Block title="Itinerary">
            <ol className="space-y-4 border-l-2 border-primary pl-6">{trip.itinerary.map((d) => <li key={d.title}><h3 className="text-xl">{d.title}</h3><p className="text-muted-foreground">{d.detail}</p></li>)}</ol>
          </Block>
          <div className="grid gap-8 sm:grid-cols-2">
            <Block title="Included"><List items={trip.inclusions} /></Block>
            <Block title="Not included"><List items={trip.exclusions} /></Block>
          </div>
          {trip.accommodation && <Block title="Accommodation"><p className="text-muted-foreground">{trip.accommodation}</p></Block>}
          <Block title="Activity level"><p className="text-muted-foreground">{trip.activityLevel}</p></Block>
          <Block title="What to bring"><List items={trip.whatToBring} /></Block>
          <Block title="Cancellation"><p className="text-muted-foreground">See our <Link to="/cancellation-policy" className="underline decoration-primary">cancellation policy</Link> (draft, pending confirmation).</p></Block>
          <Block title="FAQs"><Faq items={trip.faqs} /></Block>
        </div>
        <aside className="hidden lg:block"><div className="sticky top-28 rounded-2xl border border-border bg-card p-6 shadow-soft">{summary}</div></aside>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background p-3 shadow-soft lg:hidden">
        <div className="container-site flex items-center justify-between gap-3">
          <p className="text-sm"><span className="font-serif text-xl font-semibold">{formatPrice(trip.pricePerPerson)}</span> pp</p>
          <Button asChild><a href="#mobile-summary">Check dates & enquire</a></Button>
        </div>
      </div>
      <section id="mobile-summary" className="mt-12 rounded-2xl border border-border bg-card p-6 shadow-soft lg:hidden">{summary}</section>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="space-y-4"><h2 className="text-3xl">{title}</h2>{children}</section>;
}
function List({ items }: { items: string[] }) {
  return <ul className="list-disc space-y-1 pl-5 text-muted-foreground marker:text-primary-deep">{items.map((i) => <li key={i}>{i}</li>)}</ul>;
}
