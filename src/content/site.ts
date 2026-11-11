/**
 * MADX public content & configuration.
 * Developers: edit values here — components read from this file only.
 * Leave a contact field as an empty string to hide it from the website.
 * Never store customer data, bookings, secrets or live seat counts here.
 */

export const siteConfig = {
  name: "MADX Trips and Events",
  shortName: "MADX",
  intro: "Discover new places. Make lasting memories with MADX Trips and Events.",
  currency: "GBP",
  locale: "en-GB",
  /** Live booking & payments are not connected — trips use "Enquire to Book". */
  liveBookingEnabled: false,
  contact: {
    phone: "",
    email: "",
    /** International format, digits only, e.g. "447700900000". Empty hides the WhatsApp button. */
    whatsapp: "",
    address: "",
  },
  social: {
    instagram: "",
    facebook: "",
    tiktok: "",
  },
};

export const navLinks = [
  { to: "/destinations", label: "Destinations" },
  { to: "/trips", label: "Our trips" },
  { to: "/events", label: "Events" },
  { to: "/about", label: "About us" },
  { to: "/contact", label: "Contact" },
] as const;

export const formatPrice = (amount: number) =>
  new Intl.NumberFormat(siteConfig.locale, {
    style: "currency",
    currency: siteConfig.currency,
    maximumFractionDigits: 0,
  }).format(amount);

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat(siteConfig.locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso + "T00:00:00"));
