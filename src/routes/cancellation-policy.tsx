import { createFileRoute } from "@tanstack/react-router";
import { policies } from "@/content/info";
import { pageMeta } from "@/lib/meta";
import { PolicyPage } from "@/components/site/PolicyPage";

export const Route = createFileRoute("/cancellation-policy")({
  head: () => ({ meta: pageMeta("Cancellation policy", "Cancellation policy for MADX Trips and Events (draft for business review).") }),
  component: () => <PolicyPage {...policies.cancellation} />,
});
