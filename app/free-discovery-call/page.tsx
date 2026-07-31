import type { Metadata } from "next";
import FreeDiscoveryCallPage from "@/components/pages/FreeDiscoveryCallPage";
import { buildMetadata } from "@/lib/content";

export function generateMetadata(): Metadata {
  return buildMetadata("free-discovery-call");
}

export default function Page() {
  return <FreeDiscoveryCallPage />;
}
