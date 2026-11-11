import { createFileRoute } from "@tanstack/react-router";
import eventsImg from "@/assets/events.jpg";
import { eventTypes } from "@/content/info";
import { pageMeta } from "@/lib/meta";
import { EnquiryForm } from "@/components/site/EnquiryForm";

export const Route = createFileRoute("/events")({
  head: () => ({ meta: pageMeta("Events & group trips", "Enquire about private group trips and events with MADX.") }),
  component: Page,
});

function Page() {
  return (
    <div className="container-site py-12">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="animate-rise space-y-5">
          <p className="eyebrow">Events & private groups</p>
          <h1 className="heading-xl">Travel together.</h1>
          <p className="text-lg text-muted-foreground">Share your group’s plans and MADX will be in touch about what’s possible.</p>
        </div>
        <img src={eventsImg} alt="Group celebrating at sunset" width={1280} height={960} className="aspect-[4/3] w-full rounded-3xl object-cover shadow-soft" />
      </div>
      <div className="my-16 grid gap-6 md:grid-cols-3">
        {eventTypes.map((e) => (
          <div key={e.title} className="rounded-2xl border border-border bg-ivory p-6">
            <div className="gold-rule mb-4" />
            <h2 className="text-2xl">{e.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{e.text}</p>
          </div>
        ))}
      </div>
      <h2 className="heading-lg mb-6">Group enquiry</h2>
      <EnquiryForm group />
    </div>
  );
}
