import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroCoach } from "@/components/site/HeroCoach";
import eventsImg from "@/assets/events.jpg";
import { Bus, CalendarDays, MapPin, MessageCircle, Sparkles, Users } from "lucide-react";
import york from "@/assets/york.jpg";
import { trips, destinations } from "@/content/trips";
import { faqs, highlights, testimonials } from "@/content/info";
import { pageMeta } from "@/lib/meta";
import { filterTrips } from "@/lib/trip-filters";
import { Button } from "@/components/ui/button";
import { TripCard } from "@/components/site/TripCard";
import { Reveal, SectionHeading } from "@/components/site/Reveal";
import { Gallery } from "@/components/site/Gallery";
import { Faq } from "@/components/site/Faq";

export const Route = createFileRoute("/")({
  head: () => ({ meta: pageMeta("Go somewhere unforgettable", "Trips, weekend escapes and group events with MADX Trips and Events.") }),
  component: Home,
});

function Home() {
  const upcoming = filterTrips(trips, {}).filter((t) => t.type !== "day").slice(0, 4);
  const icons = { Bus, CalendarDays, MapPin, MessageCircle, Sparkles, Users };
  return (
    <>
      <HeroCoach />


      <Reveal as="section" className="container-site my-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Upcoming" title="Upcoming trips" text="Sample departures to show how trips will appear." />
          <Button asChild variant="outline" className="mb-10"><Link to="/trips">See all trips</Link></Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">{upcoming.map((t) => <TripCard key={t.slug} trip={t} />)}</div>
      </Reveal>

      <Reveal as="section" className="bg-ivory py-20">
        <div className="container-site">
          <SectionHeading eyebrow="Destinations" title="Explore destinations" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {destinations.map((d) => {
              const t = trips.find((x) => x.destination === d)!;
              return (
                <Link key={d} to="/trips" search={{ destination: d }} className="group relative block aspect-[3/4] overflow-hidden rounded-2xl">
                  <img src={t.image} alt={d} loading="lazy" width={1280} height={960} className="img-zoom h-full w-full object-cover" />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-4 font-serif text-xl text-ink-foreground">{d}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="container-site my-24">
        <SectionHeading eyebrow="Why MADX" title="What makes travelling with us different" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((h) => {
            const Icon = icons[h.icon];
            return (
              <div key={h.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft transition-transform duration-300 hover:-translate-y-1">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-accent text-primary-deep"><Icon className="size-5" /></span>
                <h3 className="mt-4 text-2xl">{h.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{h.text}</p>
              </div>
            );
          })}
        </div>
      </Reveal>

      <Reveal as="section" className="bg-ivory py-20">
        <div className="container-site grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-5">
            <p className="eyebrow">About MADX</p>
            <h2 className="heading-lg">Exploration, together.</h2>
            <p className="text-muted-foreground">MADX Trips and Events is about discovering new places and making memories with the people you travel with.</p>
            <Button asChild variant="outline"><Link to="/about">Our story</Link></Button>
          </div>
          <img src={york} alt="Historic cobbled street" loading="lazy" width={1280} height={960} className="aspect-[16/10] w-full rounded-3xl object-cover" />
        </div>
      </Reveal>

      <Reveal as="section" className="container-site my-24">
        <SectionHeading eyebrow="Gallery" title="Travel inspiration" />
        <Gallery />
      </Reveal>

      <Reveal as="section" className="container-site my-24">
        <div className="relative overflow-hidden rounded-3xl">
          <img src={eventsImg} alt="" loading="lazy" width={1280} height={960} className="absolute inset-0 h-full w-full object-cover" />
          <div className="relative bg-ink/70 px-6 py-16 text-center text-ink-foreground sm:px-12">
            <p className="eyebrow">Plan your trip today</p>
            <h2 className="heading-lg mx-auto mt-3 max-w-2xl">Travel made easy. Memories made forever.</h2>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg"><Link to="/trips">Explore Trips</Link></Button>
              <Button asChild size="lg" variant="outline"><Link to="/contact">Contact Us</Link></Button>
            </div>
          </div>
        </div>
      </Reveal>

      {testimonials.length > 0 && <section />}

      <Reveal as="section" className="container-site my-24 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <SectionHeading eyebrow="FAQ" title="Frequently asked questions" text="Draft answers, pending confirmation from MADX." />
        <Faq items={faqs} />
      </Reveal>
    </>
  );
}
