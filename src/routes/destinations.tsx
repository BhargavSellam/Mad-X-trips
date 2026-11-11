import { createFileRoute, Link } from "@tanstack/react-router";
import { destinations, trips } from "@/content/trips";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/destinations")({
  head: () => ({ meta: pageMeta("Destinations", "Explore the places MADX trips can take you across the UK.") }),
  component: Page,
});

function Page() {
  return (
    <div className="container-site py-12">
      <p className="eyebrow">Destinations</p>
      <h1 className="heading-lg mt-2">Where to next?</h1>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map((d) => {
          const list = trips.filter((t) => t.destination === d); const first = list[0]!;
          return (
            <Link key={d} to="/trips" search={{ destination: d }} className="group block overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
              <div className="aspect-[4/3] overflow-hidden"><img src={first.image} alt={d} loading="lazy" width={1280} height={960} className="img-zoom h-full w-full object-cover" /></div>
              <div className="p-5">
                <h2 className="text-3xl">{d}</h2>
                <p className="text-sm text-muted-foreground">{list.length} sample trip{list.length > 1 ? "s" : ""} · {first.region}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
