import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import ConditionPageTemplate from "@/components/pages/conditions/ConditionPageTemplate";
import { buildMetadata, getPageContent } from "@/lib/content";

export function generateMetadata(): Metadata {
  return buildMetadata("adhd-add");
}

export default function Page() {
  const page = getPageContent("adhd-add");
  return (
    <>
      {page && <JsonLd blocks={page.jsonLd} />}
      <ConditionPageTemplate slug="adhd-add" />
    </>
  );
}
