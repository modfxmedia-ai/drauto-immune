import type { Metadata } from "next";
import BookNewPatientEvaluationPage from "@/components/pages/BookNewPatientEvaluationPage";
import { buildMetadata } from "@/lib/content";

export function generateMetadata(): Metadata {
  return buildMetadata("book-new-patient-evaluation");
}

export default function Page() {
  return <BookNewPatientEvaluationPage />;
}
