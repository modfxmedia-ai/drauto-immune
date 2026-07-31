import type { Metadata } from "next";
import BookAnAppointmentPage from "@/components/pages/BookAnAppointmentPage";
import { buildMetadata } from "@/lib/content";

export function generateMetadata(): Metadata {
  return buildMetadata("book-an-appointment");
}

export default function Page() {
  return <BookAnAppointmentPage />;
}
