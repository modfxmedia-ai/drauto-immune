import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import FeaturedInterviewsPage from "@/components/pages/FeaturedInterviewsPage";
import { buildMetadata, getPageContent } from "@/lib/content";

export function generateMetadata(): Metadata {
  return buildMetadata("featured-interviews");
}

export default function Page() {
  const page = getPageContent("featured-interviews");

  return (
    <>
      {page && <JsonLd blocks={page.jsonLd} />}
      <FeaturedInterviewsPage />
    </>
  );
}
