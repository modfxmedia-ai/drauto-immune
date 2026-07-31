import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import ContactUsPage from "@/components/pages/ContactUsPage";
import { buildMetadata, getPageContent } from "@/lib/content";

export function generateMetadata(): Metadata {
  return buildMetadata("contact-us");
}

export default function Page() {
  const page = getPageContent("contact-us");

  return (
    <>
      {page && <JsonLd blocks={page.jsonLd} />}
      <ContactUsPage />
    </>
  );
}
