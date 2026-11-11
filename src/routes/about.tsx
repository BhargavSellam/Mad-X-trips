import { createFileRoute, Link } from "@tanstack/react-router";
import highlands from "@/assets/highlands.jpg";
import { pageMeta } from "@/lib/meta";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: pageMeta("About", "Meet MADX Trips and Events — exploration, shared experiences and lasting memories.") }),
  component: Page,
});

function Page() {
  return (
    <div className="container-site py-12">
      <div className="mx-auto max-w-3xl space-y-6 text-center">
        <p className="eyebrow">About MADX</p>
        <h1 className="heading-xl">Exploration, shared.</h1>
        <p className="text-lg text-muted-foreground">MADX Trips and Events brings people together to discover new places and make memories that last.</p>
      </div>
      <img src={highlands} alt="Scottish Highlands glen" width={1280} height={960} className="my-14 aspect-[21/9] w-full rounded-3xl object-cover" />
      <div className="grid gap-10 md:grid-cols-2">
        <section className="space-y-3">
          <h2 className="text-3xl">Our story</h2>
          <p className="text-muted-foreground">[Space for the MADX story — to be supplied by the business.]</p>
        </section>
        <section className="space-y-3">
          <h2 className="text-3xl">How we travel</h2>
          <p className="text-muted-foreground">[Space for MADX’s travel approach — to be supplied by the business.]</p>
        </section>
      </div>
      <div className="mt-14 rounded-3xl border border-dashed border-border p-10 text-center text-muted-foreground">Team photographs will appear here once supplied.</div>
      <div className="mt-14 text-center"><Button asChild size="lg"><Link to="/trips">Explore Trips</Link></Button></div>
    </div>
  );
}
