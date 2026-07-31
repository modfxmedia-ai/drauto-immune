import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import ServicesPage from "@/components/pages/ServicesPage";
import { buildMetadata, getPageContent } from "@/lib/content";

export function generateMetadata(): Metadata {
  return buildMetadata("services");
}

export default function Page() {
  const page = getPageContent("services");

  return (
    <>
      {page && <JsonLd blocks={page.jsonLd} />}
      <ServicesPage />
    </>
  );
}
