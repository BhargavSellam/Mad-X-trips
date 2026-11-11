import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navLinks } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="container-site flex h-20 items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-1 xl:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground data-[status=active]:underline data-[status=active]:decoration-primary data-[status=active]:decoration-2 data-[status=active]:underline-offset-8"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/trips" className="hidden min-h-11 items-center gap-1 rounded-full bg-ink px-6 text-sm font-semibold text-primary transition-transform hover:-translate-y-0.5 sm:inline-flex">
            Book a trip ↗
          </Link>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="xl:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm bg-background p-0 [&>button]:hidden">
              <div className="flex h-20 items-center justify-between border-b border-border px-5">
                <SheetTitle className="font-serif text-2xl">Menu</SheetTitle>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon" aria-label="Close menu">
                    <X />
                  </Button>
                </SheetClose>
              </div>
              <nav aria-label="Mobile" className="flex flex-col p-5">
                {navLinks.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    activeOptions={{ exact: l.to === "/" }}
                    className="flex min-h-12 items-center border-b border-border font-serif text-2xl data-[status=active]:text-primary-deep"
                  >
                    {l.label}
                  </Link>
                ))}
                <Button asChild size="lg" className="mt-6">
                  <Link to="/trips" onClick={() => setOpen(false)}>Book a trip ↗</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
