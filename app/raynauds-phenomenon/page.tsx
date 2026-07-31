import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import ConditionPageTemplate from "@/components/pages/conditions/ConditionPageTemplate";
import { buildMetadata, getPageContent } from "@/lib/content";

export function generateMetadata(): Metadata {
  return buildMetadata("raynauds-phenomenon");
}

export default function Page() {
  const page = getPageContent("raynauds-phenomenon");
  return (
    <>
      {page && <JsonLd blocks={page.jsonLd} />}
      <ConditionPageTemplate slug="raynauds-phenomenon" />
    </>
  );
}
