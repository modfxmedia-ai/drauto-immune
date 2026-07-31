import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import ConditionsWeSupportPage from "@/components/pages/ConditionsWeSupportPage";
import { buildMetadata, getPageContent } from "@/lib/content";

export function generateMetadata(): Metadata {
  return buildMetadata("conditions-we-support");
}

export default function Page() {
  const page = getPageContent("conditions-we-support");
  return (
    <>
      {page && <JsonLd blocks={page.jsonLd} />}
      <ConditionsWeSupportPage />
    </>
  );
}
