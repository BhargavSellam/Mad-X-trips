import { Link } from "@tanstack/react-router";
import logo from "@/assets/madx-logo.png.asset.json";

export function Logo({ size = "md" }: { size?: "md" | "lg" }) {
  const dim = size === "lg" ? "h-24 w-24" : "h-14 w-14";
  return (
    <Link
      to="/"
      aria-label="MADX Trips and Events — home"
      className={`block shrink-0 overflow-hidden rounded-xl bg-ink p-1 shadow-soft ${dim}`}
    >
      <img src={logo.url} alt="MADX Trips and Events logo" width={96} height={96} className="h-full w-full object-contain" />
    </Link>
  );
}
