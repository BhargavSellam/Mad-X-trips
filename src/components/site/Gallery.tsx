import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { gallery } from "@/content/info";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function Gallery() {
  const cats = ["All", ...Array.from(new Set(gallery.map((g) => g.category)))];
  const [cat, setCat] = useState("All");
  const [idx, setIdx] = useState<number | null>(null);
  const items = gallery.filter((g) => cat === "All" || g.category === cat);
  const touch = useRef(0);
  const go = (d: number) => setIdx((i) => (i == null ? i : (i + d + items.length) % items.length));

  useEffect(() => {
    if (idx == null) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  });

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter gallery">
        {cats.map((c) => (
          <Button key={c} size="sm" variant={c === cat ? "default" : "outline"} aria-pressed={c === cat} onClick={() => setCat(c)}>{c}</Button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {items.map((g, i) => (
          <button key={g.alt} onClick={() => setIdx(i)} className="group aspect-square overflow-hidden rounded-2xl" aria-label={`Open image: ${g.alt}`}>
            <img src={g.src} alt={g.alt} loading="lazy" width={1280} height={960} className="img-zoom h-full w-full object-cover" />
          </button>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">Destination imagery for inspiration — not photos of past MADX trips.</p>
      <Dialog open={idx != null} onOpenChange={(o) => !o && setIdx(null)}>
        <DialogContent className="max-w-5xl border-none bg-ink p-2 [&>button]:hidden">
          {idx != null && items[idx] && (
            <div onTouchStart={(e) => (touch.current = (e.touches[0]?.clientX ?? 0))} onTouchEnd={(e) => { const dx = (e.changedTouches[0]?.clientX ?? 0) - touch.current; if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1); }}>
              <DialogTitle className="sr-only">{items[idx].alt}</DialogTitle>
              <img src={items[idx].src} alt={items[idx].alt} className="max-h-[80vh] w-full rounded-xl object-contain animate-in fade-in" />
              <div className="flex items-center justify-between p-2">
                <Button size="icon" variant="secondary" onClick={() => go(-1)} aria-label="Previous image"><ChevronLeft /></Button>
                <Button size="icon" variant="secondary" onClick={() => setIdx(null)} aria-label="Close"><X /></Button>
                <Button size="icon" variant="secondary" onClick={() => go(1)} aria-label="Next image"><ChevronRight /></Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
