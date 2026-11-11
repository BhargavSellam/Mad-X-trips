import { Link } from "@tanstack/react-router";
import { navLinks, siteConfig } from "@/content/site";
import { Logo } from "./Logo";

export function Footer() {
  const { contact, social } = siteConfig;
  const socials = Object.entries(social).filter(([, url]) => url);
  return (
    <footer className="mt-24 border-t border-border bg-ivory">
      <div className="container-site grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo size="lg" />
          <p className="max-w-xs text-sm text-muted-foreground">{siteConfig.intro}</p>
        </div>
        <div>
          <h2 className="eyebrow mb-4">Explore</h2>
          <ul className="space-y-1">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="inline-flex min-h-11 items-center text-sm hover:text-primary-deep">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="eyebrow mb-4">Contact</h2>
          <ul className="space-y-2 text-sm">
            {contact.email && <li><a href={`mailto:${contact.email}`}>{contact.email}</a></li>}
            {contact.phone && <li><a href={`tel:${contact.phone}`}>{contact.phone}</a></li>}
            {contact.address && <li>{contact.address}</li>}
            {socials.map(([name, url]) => (
              <li key={name}><a href={url} target="_blank" rel="noreferrer" className="capitalize">{name}</a></li>
            ))}
            <li><Link to="/contact" className="inline-flex min-h-11 items-center hover:text-primary-deep">Send an enquiry</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="eyebrow mb-4">Policies</h2>
          <ul className="space-y-1 text-sm">
            <li><Link to="/privacy" className="inline-flex min-h-11 items-center hover:text-primary-deep">Privacy policy</Link></li>
            <li><Link to="/booking-terms" className="inline-flex min-h-11 items-center hover:text-primary-deep">Booking terms</Link></li>
            <li><Link to="/cancellation-policy" className="inline-flex min-h-11 items-center hover:text-primary-deep">Cancellation policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="container-site py-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
