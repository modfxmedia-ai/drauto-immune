import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import Container from "@/components/ui/Container";
import { BLOG_INSIGHTS } from "@/content/home-content";
import SectionHeading from "./SectionHeading";
import { SECTION_PADDING } from "./theme";

type Post = (typeof BLOG_INSIGHTS.posts)[number];

/**
 * Same featured + 2-stacked-secondary grid alignment as the live
 * homepage's `BlogInsights` (left: one large dark featured card, right:
 * two horizontal image-left cards) — restyled with Home2's plain CSS
 * hover transitions instead of framer-motion, since Home2 stays server-
 * rendered with no client components.
 */
export default function BlogInsights2() {
  const [featured, ...rest] = BLOG_INSIGHTS.posts;

  return (
    <section className={`${SECTION_PADDING} bg-white`}>
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Latest News" heading={BLOG_INSIGHTS.heading} intro={BLOG_INSIGHTS.intro} />
          <Link
            href="/blog/"
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
          >
            View All Articles
            <Icon name="arrow-right" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          <FeaturedCard post={featured} />

          <div className="flex flex-col gap-6">
            {rest.map((post) => (
              <SecondaryCard key={post.href} post={post} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function FeaturedCard({ post }: { post: Post }) {
  return (
    <Link
      href={post.href}
      className="group relative flex h-full min-h-[440px] flex-col overflow-hidden rounded-2xl bg-ink text-white shadow-[0_1px_2px_rgba(26,26,26,0.04),0_10px_24px_-8px_rgba(26,26,26,0.08)] transition-shadow duration-300 hover:shadow-[0_24px_44px_-16px_rgba(26,26,26,0.35)]"
    >
      <Image
        src={post.image}
        alt={post.title}
        fill
        sizes="(min-width: 1024px) 55vw, 100vw"
        className="object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-95"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/50 to-transparent" />

      <span className="absolute left-5 top-5 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
        <Icon name="clock" className="h-3 w-3" />
        {post.readTime}
      </span>

      <div className="relative z-10 mt-auto flex flex-col gap-4 p-6 sm:p-8">
        <span className="inline-flex w-fit items-center rounded-full bg-white/15 px-3 py-1 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md">
          {post.category}
        </span>
        <h3 className="text-2xl font-semibold leading-tight text-white sm:text-3xl">{post.title}</h3>
        <p className="max-w-xl text-sm leading-relaxed text-white/85">{post.excerpt}</p>
        <div className="mt-2 flex items-center gap-3">
          <span className="text-sm font-medium text-white">Read article</span>
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          >
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function SecondaryCard({ post }: { post: Post }) {
  return (
    <Link
      href={post.href}
      className="group relative flex h-full items-stretch overflow-hidden rounded-2xl border border-gray bg-white shadow-[0_1px_2px_rgba(26,26,26,0.04),0_10px_24px_-8px_rgba(26,26,26,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_24px_44px_-16px_rgba(63,128,106,0.28)]"
    >
      <div className="relative w-36 shrink-0 overflow-hidden sm:w-44 lg:w-48">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 192px, (min-width: 640px) 176px, 144px"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/25 via-transparent to-transparent" />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-3 p-5 sm:p-6">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-primary">
              {post.category}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-ink-soft">
              <Icon name="clock" className="h-3 w-3" />
              {post.readTime}
            </span>
          </div>
          <h3 className="text-base font-semibold leading-snug text-ink sm:text-lg">{post.title}</h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-ink-soft">{post.excerpt}</p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
          Read article
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>

      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100"
      />
    </Link>
  );
}

/** Inline arrow-up-right glyph (external-link style) for "Read article ↗". */
function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path d="M4 12 12 4M6 4h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
