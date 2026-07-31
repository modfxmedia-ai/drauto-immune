import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import ConditionPageTemplate from "@/components/pages/conditions/ConditionPageTemplate";
import { buildMetadata, getPageContent } from "@/lib/content";

export function generateMetadata(): Metadata {
  return buildMetadata("multiple-sclerosis");
}

export default function Page() {
  const page = getPageContent("multiple-sclerosis");
  return (
    <>
      {page && <JsonLd blocks={page.jsonLd} />}
      <ConditionPageTemplate slug="multiple-sclerosis" />
    </>
  );
}
