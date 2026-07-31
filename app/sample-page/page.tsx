import type { Metadata } from "next";
import ContentRoute from "@/components/ContentRoute";
import { buildMetadata } from "@/lib/content";

export function generateMetadata(): Metadata {
  return buildMetadata("sample-page");
}

export default function Page() {
  return <ContentRoute routeKey="sample-page" />;
}
