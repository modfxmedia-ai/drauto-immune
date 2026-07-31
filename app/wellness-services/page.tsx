import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import WellnessServicesPage from "@/components/pages/WellnessServicesPage";
import { buildMetadata, getPageContent } from "@/lib/content";

export function generateMetadata(): Metadata {
  return buildMetadata("wellness-services");
}

export default function Page() {
  const page = getPageContent("wellness-services");

  return (
    <>
      {page && <JsonLd blocks={page.jsonLd} />}
      <WellnessServicesPage />
    </>
  );
}
