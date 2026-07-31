import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import AboutUsPage from "@/components/pages/AboutUsPage";
import { buildMetadata, getPageContent } from "@/lib/content";

export function generateMetadata(): Metadata {
  return buildMetadata("about-us");
}

export default function Page() {
  const page = getPageContent("about-us");

  return (
    <>
      {page && <JsonLd blocks={page.jsonLd} />}
      <AboutUsPage />
    </>
  );
}
