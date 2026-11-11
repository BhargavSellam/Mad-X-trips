import lake from "@/assets/lake-district.jpg";
import cornwall from "@/assets/cornwall.jpg";
import highlands from "@/assets/highlands.jpg";
import peak from "@/assets/peak-district.jpg";
import york from "@/assets/york.jpg";

/**
 * SAMPLE TRIPS — illustrative only, not confirmed MADX offerings.
 * Replace with real trips. Dates, prices and pickup points are editable here.
 */
export type PickupPoint = { city: string; location: string; time: string };
export type ItineraryDay = { title: string; detail: string };

export type Trip = {
  slug: string;
  title: string;
  destination: string;
  region: string;
  image: string;
  gallery: string[];
  summary: string;
  overview: string;
  departures: string[]; // ISO dates
  durationDays: number;
  type: "day" | "weekend" | "multi-day";
  pricePerPerson: number;
  pickups: PickupPoint[];
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  accommodation?: string;
  activityLevel: string;
  whatToBring: string[];
  faqs: { q: string; a: string }[];
  isSample: true;
};

const TBC = "To be confirmed by MADX before publishing.";

export const trips: Trip[] = [
  {
    slug: "lake-district-escape",
    title: "Lake District Escape",
    destination: "Lake District",
    region: "England",
    image: lake,
    gallery: [lake, peak, york],
    summary: "Lakes, fells and slow mornings in Cumbria.",
    overview:
      "A sample weekend among England's best-loved lakes and fells — time for scenic walks, lakeside villages and shared evenings with your group.",
    departures: ["2027-05-14", "2027-06-18", "2027-08-20"],
    durationDays: 3,
    type: "weekend",
    pricePerPerson: 249,
    pickups: [
      { city: "London", location: "Sample pickup point", time: "06:30" },
      { city: "Birmingham", location: "Sample pickup point", time: "08:30" },
      { city: "Manchester", location: "Sample pickup point", time: "09:45" },
    ],
    itinerary: [
      { title: "Day 1 · Arrival", detail: "Travel north, settle in and enjoy an evening by the water." },
      { title: "Day 2 · Lakes & fells", detail: "A full day exploring lakeside villages and viewpoints." },
      { title: "Day 3 · Return", detail: "A relaxed morning before the journey home." },
    ],
    inclusions: [TBC],
    exclusions: [TBC],
    accommodation: TBC,
    activityLevel: "Moderate — " + TBC,
    whatToBring: ["Waterproof jacket", "Comfortable walking shoes", "Layers for changeable weather"],
    faqs: [{ q: "Is this trip confirmed?", a: "No — this is an illustrative sample. Enquire to hear about real departures." }],
    isSample: true,
  },
  {
    slug: "cornwall-coastal-trip",
    title: "Cornwall Coastal Trip",
    destination: "Cornwall",
    region: "England",
    image: cornwall,
    gallery: [cornwall, lake, peak],
    summary: "Turquoise coves and clifftop paths in the far south-west.",
    overview:
      "A sample coastal break taking in golden beaches, harbour towns and clifftop walks along the Cornish coast.",
    departures: ["2027-07-02", "2027-08-06"],
    durationDays: 4,
    type: "multi-day",
    pricePerPerson: 349,
    pickups: [
      { city: "London", location: "Sample pickup point", time: "06:00" },
      { city: "Bristol", location: "Sample pickup point", time: "08:45" },
    ],
    itinerary: [
      { title: "Day 1 · Head west", detail: "Travel to Cornwall with a stop along the way." },
      { title: "Day 2 · Coves & harbours", detail: "Beaches, coastal paths and harbour towns." },
      { title: "Day 3 · Free day", detail: "Explore at your own pace." },
      { title: "Day 4 · Return", detail: "Journey home." },
    ],
    inclusions: [TBC],
    exclusions: [TBC],
    accommodation: TBC,
    activityLevel: "Easy to moderate — " + TBC,
    whatToBring: ["Swimwear", "Sun cream", "Walking shoes"],
    faqs: [{ q: "Is this trip confirmed?", a: "No — this is an illustrative sample." }],
    isSample: true,
  },
  {
    slug: "scottish-highlands-adventure",
    title: "Scottish Highlands Adventure",
    destination: "Scottish Highlands",
    region: "Scotland",
    image: highlands,
    gallery: [highlands, lake, york],
    summary: "Misty glens, lochs and heather-covered hills.",
    overview:
      "A sample journey into the Highlands — dramatic glens, still lochs and wide-open landscapes to share with your group.",
    departures: ["2027-06-04", "2027-09-10"],
    durationDays: 5,
    type: "multi-day",
    pricePerPerson: 495,
    pickups: [
      { city: "London", location: "Sample pickup point", time: "05:30" },
      { city: "Manchester", location: "Sample pickup point", time: "09:00" },
    ],
    itinerary: [
      { title: "Day 1 · North to Scotland", detail: "Travel day with scenic stops." },
      { title: "Day 2 · Glens", detail: "Explore valleys and viewpoints." },
      { title: "Day 3 · Lochs", detail: "Lochside villages and walks." },
      { title: "Day 4 · Free day", detail: "Optional activities." },
      { title: "Day 5 · Return", detail: "Journey home." },
    ],
    inclusions: [TBC],
    exclusions: [TBC],
    accommodation: TBC,
    activityLevel: "Moderate — " + TBC,
    whatToBring: ["Waterproofs", "Warm layers", "Insect repellent"],
    faqs: [{ q: "Is this trip confirmed?", a: "No — this is an illustrative sample." }],
    isSample: true,
  },
  {
    slug: "peak-district-day-trip",
    title: "Peak District Day Trip",
    destination: "Peak District",
    region: "England",
    image: peak,
    gallery: [peak, lake, cornwall],
    summary: "Rolling hills and stone-walled trails in a single day.",
    overview: "A sample day out among the Peak District's rolling hills, ridges and market towns.",
    departures: ["2027-04-24", "2027-05-29", "2027-07-17"],
    durationDays: 1,
    type: "day",
    pricePerPerson: 59,
    pickups: [
      { city: "Birmingham", location: "Sample pickup point", time: "07:30" },
      { city: "Manchester", location: "Sample pickup point", time: "08:30" },
    ],
    itinerary: [
      { title: "Morning", detail: "Travel and a guided-style ridge walk." },
      { title: "Afternoon", detail: "Time in a market town." },
      { title: "Evening", detail: "Return journey." },
    ],
    inclusions: [TBC],
    exclusions: [TBC],
    activityLevel: "Moderate walking — " + TBC,
    whatToBring: ["Walking shoes", "Packed lunch", "Water"],
    faqs: [{ q: "Is this trip confirmed?", a: "No — this is an illustrative sample." }],
    isSample: true,
  },
  {
    slug: "historic-york-weekend",
    title: "Historic York Weekend",
    destination: "York",
    region: "England",
    image: york,
    gallery: [york, peak, lake],
    summary: "Cobbled lanes, city walls and cosy evenings.",
    overview: "A sample city weekend wandering medieval streets, walls and independent cafés.",
    departures: ["2027-10-15", "2027-11-26"],
    durationDays: 2,
    type: "weekend",
    pricePerPerson: 179,
    pickups: [{ city: "London", location: "Sample pickup point", time: "07:00" }],
    itinerary: [
      { title: "Day 1 · Old town", detail: "Arrive and explore the historic centre." },
      { title: "Day 2 · Walls & return", detail: "Walk the city walls before heading home." },
    ],
    inclusions: [TBC],
    exclusions: [TBC],
    accommodation: TBC,
    activityLevel: "Easy — " + TBC,
    whatToBring: ["Comfortable shoes", "Umbrella"],
    faqs: [{ q: "Is this trip confirmed?", a: "No — this is an illustrative sample." }],
    isSample: true,
  },
];

export const getTrip = (slug: string) => trips.find((t) => t.slug === slug);

export const destinations = Array.from(new Set(trips.map((t) => t.destination)));
export const departureCities = Array.from(
  new Set(trips.flatMap((t) => t.pickups.map((p) => p.city))),
).sort();
