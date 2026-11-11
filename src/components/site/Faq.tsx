import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <Accordion type="single" collapsible className="divide-y divide-border rounded-2xl border border-border bg-card px-5">
      {items.map((f) => (
        <AccordionItem key={f.q} value={f.q} className="border-none">
          <AccordionTrigger className="min-h-14 text-left text-base font-semibold hover:no-underline">{f.q}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
