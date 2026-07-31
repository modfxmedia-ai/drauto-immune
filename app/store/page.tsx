import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import StorePage from "@/components/pages/StorePage";
import { buildMetadata, getPageContent } from "@/lib/content";

export function generateMetadata(): Metadata {
  return buildMetadata("store");
}

export default function Page() {
  const page = getPageContent("store");

  return (
    <>
      {page && <JsonLd blocks={page.jsonLd} />}
      <StorePage />
    </>
  );
}
