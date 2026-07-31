import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { MigratedVideo } from "@/lib/content";

/**
 * Renders a migrated page's body content (markdown pulled from the live
 * site, with images localized and internal links rewritten to the new
 * route structure). Intentionally unstyled — no visual design yet.
 */
export default function MigratedContent({
  markdown,
  videos,
}: {
  markdown: string;
  videos?: MigratedVideo[];
}) {
  return (
    <article>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
      {videos?.map((video) => (
        <iframe
          key={video.src}
          src={video.src}
          title={video.title ?? "Embedded video"}
          loading="lazy"
          allowFullScreen
          width={560}
          height={315}
        />
      ))}
    </article>
  );
}
