import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Image from "next/image";
import Link from "next/link";

const components: Components = {
  h2: ({ children }) => (
    <h2 className="mt-10 text-2xl font-extrabold text-ink first:mt-0 sm:text-3xl">{children}</h2>
  ),
  h3: ({ children }) => <h3 className="mt-8 text-xl font-extrabold text-ink">{children}</h3>,
  h4: ({ children }) => <h4 className="mt-6 text-lg font-extrabold text-ink">{children}</h4>,
  p: ({ node, children }) => {
    // A paragraph whose only child is a single image gets promoted out of
    // the `<p>` wrapper so the image renderer can use a block-level `span`
    // without nesting it inside a `<p>` (invalid HTML / hydration error).
    const onlyChild = node?.children?.length === 1 ? node.children[0] : null;
    const isImageOnly = !!onlyChild && onlyChild.type === "element" && onlyChild.tagName === "img";
    if (isImageOnly) return <>{children}</>;
    return <p className="mt-4 text-base leading-relaxed text-ink-soft">{children}</p>;
  },
  ul: ({ children }) => <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-ink-soft">{children}</ul>,
  ol: ({ children }) => <ol className="mt-4 list-decimal space-y-2 pl-6 text-base leading-relaxed text-ink-soft">{children}</ol>,
  li: ({ children }) => <li className="pl-1 marker:text-primary">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  blockquote: ({ children }) => (
    <blockquote className="mt-6 rounded-r-lg border-l-4 border-primary bg-sage py-3 pl-5 pr-4 text-base italic leading-relaxed text-ink">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-10 border-gray" />,
  a: ({ href = "", children }) => {
    const isInternal = href.startsWith("/");
    if (isInternal) {
      return (
        <Link href={href} className="font-medium text-primary underline decoration-primary/40 underline-offset-2 hover:text-primary-hover">
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-primary underline decoration-primary/40 underline-offset-2 hover:text-primary-hover"
      >
        {children}
      </a>
    );
  },
  img: ({ src, alt }) => {
    if (!src || typeof src !== "string") return null;
    return (
      <span className="relative my-6 block aspect-[16/9] w-full overflow-hidden rounded-card bg-sage">
        <Image src={src} alt={alt ?? ""} fill sizes="(min-width: 1024px) 640px, 100vw" className="object-cover" />
      </span>
    );
  },
  table: ({ children }) => (
    <div className="mt-6 overflow-x-auto rounded-card border border-gray">
      <table className="w-full border-collapse text-left text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-sage text-ink">{children}</thead>,
  th: ({ children }) => <th className="border-b border-gray px-4 py-3 font-semibold">{children}</th>,
  td: ({ children }) => <td className="border-b border-gray px-4 py-3 text-ink-soft">{children}</td>,
};

/**
 * Renders a blog post's migrated body markdown with the site's brand
 * typography (headings/paragraphs/lists/links/images/tables), matching
 * the card-content styling used elsewhere in the app rather than the
 * bare unstyled output of `MigratedContent`.
 */
export default function BlogMarkdown({ markdown }: { markdown: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={components}>
      {markdown}
    </ReactMarkdown>
  );
}
