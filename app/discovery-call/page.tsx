import type { Metadata } from "next";
import DiscoveryCallPage from "@/components/pages/DiscoveryCallPage";
import { buildMetadata } from "@/lib/content";

export function generateMetadata(): Metadata {
  return buildMetadata("discovery-call");
}

export default function Page() {
  return <DiscoveryCallPage />;
}
