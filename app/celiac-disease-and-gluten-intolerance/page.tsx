import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import ConditionPageTemplate from "@/components/pages/conditions/ConditionPageTemplate";
import { buildMetadata, getPageContent } from "@/lib/content";

export function generateMetadata(): Metadata {
  return buildMetadata("celiac-disease-and-gluten-intolerance");
}

export default function Page() {
  const page = getPageContent("celiac-disease-and-gluten-intolerance");
  return (
    <>
      {page && <JsonLd blocks={page.jsonLd} />}
      <ConditionPageTemplate slug="celiac-disease-and-gluten-intolerance" />
    </>
  );
}
