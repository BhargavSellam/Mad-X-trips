import lake from "@/assets/lake-district.jpg";
import cornwall from "@/assets/cornwall.jpg";
import highlands from "@/assets/highlands.jpg";
import peak from "@/assets/peak-district.jpg";
import york from "@/assets/york.jpg";
import events from "@/assets/events.jpg";

/** FAQs — DRAFT answers. Replace with business-confirmed wording before launch. */
export const faqs = [
  { q: "How do I book?", a: "Choose a trip and send an enquiry. MADX will reply to confirm availability and next steps. (Draft — awaiting confirmation.)" },
  { q: "Where are the pickup points?", a: "Each trip page lists its pickup cities and times. Exact locations are confirmed by MADX." },
  { q: "Which payment methods are accepted?", a: "To be confirmed by MADX." },
  { q: "What is the cancellation policy?", a: "See the cancellation policy page. The policy is a draft pending business review." },
  { q: "How much luggage can I bring?", a: "To be confirmed by MADX." },
  { q: "Are trips accessible?", a: "Please contact MADX with your needs before booking so they can advise. Accessibility details are to be confirmed." },
  { q: "Can you organise a private group trip?", a: "Yes, you can send a group enquiry from the Events page. An enquiry does not confirm availability." },
];

/** Gallery — destination imagery (illustrative, not photos of past MADX trips). */
export const gallery = [
  { src: lake, alt: "Lake District lake at sunset", category: "Lakes & mountains" },
  { src: cornwall, alt: "Cornish cove with turquoise sea", category: "Coast" },
  { src: highlands, alt: "Highland glen with heather", category: "Lakes & mountains" },
  { src: peak, alt: "Peak District stone wall trail", category: "Countryside" },
  { src: york, alt: "Cobbled street in York", category: "Cities" },
  { src: events, alt: "Group celebrating at sunset under string lights", category: "Events" },
];

/** Event types — keep only services MADX confirms it offers. */
export const eventTypes = [
  { title: "Private group trips", text: "Trips planned around your group, dates and departure point." },
  { title: "Celebrations & occasions", text: "Birthdays, reunions and get-togethers with travel built in." },
  { title: "Group experiences", text: "Day-out style experiences for friends, clubs and communities." },
];

/** Testimonials — leave empty until genuine reviews are supplied (section hides itself). */
export const testimonials: { quote: string; name: string }[] = [];

/** Policy drafts — for business review, not legal advice. */
export const policies = {
  privacy: {
    title: "Privacy Policy",
    body: [
      "DRAFT FOR BUSINESS REVIEW.",
      "MADX Trips and Events collects only the information you provide in enquiry forms (such as name, email, phone and trip preferences) to respond to your enquiry.",
      "Details of data retention, your rights and the data controller will be added once confirmed by the business.",
    ],
  },
  terms: {
    title: "Booking Terms",
    body: [
      "DRAFT FOR BUSINESS REVIEW.",
      "Online booking is not yet available. Submitting an enquiry does not confirm a place on any trip.",
      "Full booking terms will be published once confirmed by the business.",
    ],
  },
  cancellation: {
    title: "Cancellation Policy",
    body: [
      "DRAFT FOR BUSINESS REVIEW.",
      "Cancellation and refund terms have not yet been confirmed. Please contact MADX directly before booking.",
    ],
  },
};

/** "Why MADX" highlights — keep to statements the business can stand behind. */
export const highlights = [
  { icon: "MapPin", title: "Hand-picked UK destinations", text: "Lakes, coasts, cities and countryside worth the journey." },
  { icon: "Users", title: "Made for groups", text: "Travel with friends or meet new people along the way." },
  { icon: "CalendarDays", title: "Weekend-friendly", text: "Day trips and short breaks that fit around busy weeks." },
  { icon: "Bus", title: "Clear pickup points", text: "Each trip lists its departure cities and times up front." },
  { icon: "MessageCircle", title: "Simple enquiries", text: "Ask a question or request a place in a few clicks." },
  { icon: "Sparkles", title: "Lasting memories", text: "Shared experiences you’ll talk about long after you’re home." },
] as const;
