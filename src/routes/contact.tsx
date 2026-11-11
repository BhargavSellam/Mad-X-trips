import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { siteConfig } from "@/content/site";
import { pageMeta } from "@/lib/meta";
import { EnquiryForm } from "@/components/site/EnquiryForm";

export const Route = createFileRoute("/contact")({
  validateSearch: z.object({ trip: z.string().optional() }),
  head: () => ({ meta: pageMeta("Contact", "Get in touch with MADX Trips and Events about trips, dates or group plans.") }),
  component: Page,
});

function Page() {
  const { trip } = Route.useSearch();
  const c = siteConfig.contact;
  const has = c.email || c.phone || c.address;
  return (
    <div className="container-site grid gap-12 py-12 lg:grid-cols-[1fr_1.4fr]">
      <div className="space-y-5">
        <p className="eyebrow">Contact</p>
        <h1 className="heading-lg">Let’s plan something.</h1>
        <p className="text-muted-foreground">Send an enquiry and MADX will reply about availability and next steps.</p>
        {has && (
          <ul className="space-y-2 text-sm">
            {c.email && <li><a href={`mailto:${c.email}`} className="underline decoration-primary">{c.email}</a></li>}
            {c.phone && <li><a href={`tel:${c.phone}`}>{c.phone}</a></li>}
            {c.address && <li>{c.address}</li>}
          </ul>
        )}
      </div>
      <EnquiryForm defaultInterest={trip ?? ""} />
    </div>
  );
}
