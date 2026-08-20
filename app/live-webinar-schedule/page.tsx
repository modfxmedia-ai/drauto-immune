import type { Metadata } from "next";
import LiveWebinarSchedulePage from "@/components/pages/LiveWebinarSchedulePage";

export function generateMetadata(): Metadata {
  return {
    title: "Live Webinar Schedule | Dr. Autoimmune",
    description:
      "Upcoming live webinar sessions with Dr. Autoimmune on autoimmune and thyroid health, with registration links for each date.",
  };
}

export default function Page() {
  return <LiveWebinarSchedulePage />;
}
