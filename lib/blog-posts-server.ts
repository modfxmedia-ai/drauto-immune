/**
 * Server-only blog data helpers — these read `content/data/<slug>.json`
 * via `getPageContent` (which uses `node:fs`), so this module must only
 * ever be imported from server components/route files, never from a
 * `"use client"` component (see `lib/blog-posts.ts` for the client-safe
 * slug/formatting utilities used by `BlogCard`/`BlogPostTemplate`/`BlogHubPage`).
 */
import { getPageContent } from "./content";
import { blogPostSlugs, stripSiteSuffix, type BlogPostSlug, type BlogPostSummary } from "./blog-posts";

function toSummary(slug: BlogPostSlug): BlogPostSummary | null {
  const page = getPageContent(slug);
  if (!page) return null;
  return {
    slug,
    title: stripSiteSuffix(page.title),
    excerpt: page.metaDescription ?? "",
    image: page.featuredImage ? { src: page.featuredImage.src, alt: page.featuredImage.alt } : null,
    datePublished: page.datePublished ?? null,
    readingTime: page.readingTime ?? null,
  };
}

/** Every blog post, newest first (posts with no known publish date sort last). */
export function getAllBlogPosts(): BlogPostSummary[] {
  return blogPostSlugs
    .map(toSummary)
    .filter((post): post is BlogPostSummary => post !== null)
    .sort((a, b) => {
      if (!a.datePublished && !b.datePublished) return 0;
      if (!a.datePublished) return 1;
      if (!b.datePublished) return -1;
      return new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime();
    });
}

/** The `count` most recent posts excluding `excludeSlug` — backs the post template's "Recent Blogs" sidebar. */
export function getRecentBlogPosts(excludeSlug: string, count = 5): BlogPostSummary[] {
  return getAllBlogPosts()
    .filter((post) => post.slug !== excludeSlug)
    .slice(0, count);
}
