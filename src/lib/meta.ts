export const pageMeta = (title: string, description: string) => [
  { title: `${title} | MADX Trips and Events` },
  { name: "description", content: description },
  { property: "og:title", content: `${title} | MADX Trips and Events` },
  { property: "og:description", content: description },
  { property: "og:type", content: "website" },
  { name: "twitter:card", content: "summary_large_image" },
];
