import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import landscape from "@/assets/hero-landscape.jpg";
import coach from "@/assets/madx-coach.png";

export function HeroCoach() {
  const ref = useRef<HTMLElement>(null);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let inView = true;
    const update = () => setRunning(inView && !document.hidden);
    const io = new IntersectionObserver(([e]) => { inView = e.isIntersecting; update(); });
    io.observe(el);
    document.addEventListener("visibilitychange", update);
    return () => { io.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);

  const playState = { animationPlayState: running ? "running" : "paused" } as const;

  return (
    <section ref={ref} aria-labelledby="hero-title" className="relative overflow-hidden bg-background">
      <div className="container-site relative z-20 animate-rise pt-10 lg:absolute lg:inset-x-0 lg:top-0 lg:pt-[6vh]">
        <div className="max-w-2xl space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/80">Less planning. More memories.</p>
          <h1 id="hero-title" className="font-sans text-[clamp(2.4rem,5.6vw,5rem)] font-extrabold leading-[1.05] tracking-tight">
            <span className="block text-foreground">Good company.</span>
            <span className="block text-primary-deep">Great journeys.</span>
          </h1>
          <p className="max-w-md text-lg text-muted-foreground">Meet new people, discover new places and enjoy the ride.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1">
            <Link to="/trips" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-7 font-semibold text-primary shadow-soft transition-transform hover:-translate-y-0.5 hover:shadow-gold">
              Explore trips <ArrowUpRight className="size-4" />
            </Link>
            <Link to="/destinations" className="group inline-flex min-h-12 items-center gap-2 font-semibold text-foreground">
              View destinations <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      <div className="relative mt-6 h-[max(56.25vw,260px)] [container-type:inline-size] lg:mt-0 lg:h-[max(56.25vw,720px)] lg:max-h-[1080px]">
        <img src={landscape} alt="Lake District mountains, lake and a countryside road" width={1920} height={1088} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background to-transparent lg:h-1/3" />
        <div aria-hidden className="absolute inset-0 hidden bg-[radial-gradient(ellipse_55%_60%_at_15%_15%,var(--background)_35%,transparent_75%)] lg:block" />
        <div className="coach-drive absolute bottom-[10%] left-0 h-[28%]" style={playState}>
          <div className="coach-bob relative h-full" style={playState}>
            <span aria-hidden className="absolute bottom-[19%] left-[4%] h-[8%] w-[92%] rounded-[50%] bg-ink/40 blur-md" />
            <img src={coach} alt="MAD X TRIPS luxury coach" width={1536} height={640} className="relative h-full w-auto max-w-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
