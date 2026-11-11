import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/content/site";

export const whatsappLink = (text: string) =>
  siteConfig.contact.whatsapp ? `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(text)}` : "";

/** Hidden until a verified WhatsApp number is set in src/content/site.ts */
export function WhatsAppButton({ bottomOffset = false }: { bottomOffset?: boolean }) {
  const href = whatsappLink("Hello MADX, I would like to enquire about your trips and events.");
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label="Chat with MADX on WhatsApp" className={`fixed right-4 z-30 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-gold ${bottomOffset ? "bottom-24 lg:bottom-6" : "bottom-6"}`}>
      <MessageCircle className="size-6" />
    </a>
  );
}
