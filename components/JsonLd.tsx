import type { JsonLdBlock } from "@/lib/content";

/**
 * Renders every JSON-LD block captured from the live page verbatim (Rank
 * Math's WebPage/WebSite/BreadcrumbList graph, the homepage's MedicalBusiness
 * block, leftover Yoast graphs on older posts, etc.) so structured data
 * parity matches drautoimmune.com exactly.
 */
export default function JsonLd({ blocks }: { blocks: JsonLdBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          className={block.source ?? undefined}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block.data) }}
        />
      ))}
    </>
  );
}
