import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import PatientStoriesPage from "@/components/pages/PatientStoriesPage";
import { buildMetadata, getPageContent } from "@/lib/content";

export function generateMetadata(): Metadata {
  return buildMetadata("patient-stories");
}

export default function Page() {
  const page = getPageContent("patient-stories");

  return (
    <>
      {page && <JsonLd blocks={page.jsonLd} />}
      <PatientStoriesPage />
    </>
  );
}
