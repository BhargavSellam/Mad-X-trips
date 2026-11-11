import { useEffect, useRef, type ReactNode } from "react";

export function Reveal({ children, className = "", as: Tag = "div" }: { children: ReactNode; className?: string; as?: "div" | "section" }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  // @ts-expect-error ref type is compatible for div/section
  return <Tag ref={ref} className={`reveal ${className}`}>{children}</Tag>;
}

export function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="mb-10 max-w-2xl space-y-3">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="heading-lg">{title}</h2>
      {text && <p className="text-muted-foreground">{text}</p>}
    </div>
  );
}
