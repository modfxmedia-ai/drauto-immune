import type { Metadata } from "next";
import PatientPortalPage from "@/components/pages/PatientPortalPage";
import { buildMetadata } from "@/lib/content";

export function generateMetadata(): Metadata {
  return buildMetadata("patient-portal");
}

export default function Page() {
  return <PatientPortalPage />;
}
