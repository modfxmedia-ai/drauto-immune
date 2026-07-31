import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import ConditionPageTemplate from "@/components/pages/conditions/ConditionPageTemplate";
import { buildMetadata, getPageContent } from "@/lib/content";

export function generateMetadata(): Metadata {
  return buildMetadata("thyroid-conditions");
}

export default function Page() {
  const page = getPageContent("thyroid-conditions");
  return (
    <>
      {page && <JsonLd blocks={page.jsonLd} />}
      <ConditionPageTemplate slug="thyroid-conditions" />
    </>
  );
}
