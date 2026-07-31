import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import ConditionPageTemplate from "@/components/pages/conditions/ConditionPageTemplate";
import { buildMetadata, getPageContent } from "@/lib/content";

export function generateMetadata(): Metadata {
  return buildMetadata("hashimotos-thyroiditis-graves");
}

export default function Page() {
  const page = getPageContent("hashimotos-thyroiditis-graves");
  return (
    <>
      {page && <JsonLd blocks={page.jsonLd} />}
      <ConditionPageTemplate slug="hashimotos-thyroiditis-graves" />
    </>
  );
}
