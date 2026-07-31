"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import InnerPageHero from "@/components/ui/InnerPageHero";
import SectionAmbient from "@/components/home/SectionAmbient";
import BlogCard from "./BlogCard";
import type { BlogPostSummary } from "@/lib/blog-posts";

const EASE = [0.22, 1, 0.36, 1] as const;
const PAGE_SIZE = 9;

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

/**
 * `/blog/` hub — a searchable, paginated grid of every migrated post
 * preview. The grid stagger-fades in on scroll and each `BlogCard`
 * hover-lifts with an image scale-up (see `BlogCard`). No live taxonomy
 * data was captured for the posts, so filtering is a simple client-side
 * title/excerpt search rather than fabricated categories.
 */
export default function BlogHubPage({ posts: allPosts }: { posts: BlogPostSummary[] }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allPosts;
    return allPosts.filter(
      (post) => post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q)
    );
  }, [allPosts, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function handleQueryChange(value: string) {
    setQuery(value);
    setPage(1);
  }

  return (
    <>
      <InnerPageHero
        eyebrow={`${allPosts.length} Articles`}
        title="Insights for Autoimmune & Gut Health"
        accent="Autoimmune & Gut Health"
        subhead="Root-cause explainers, symptom deep-dives, and practical guidance from our functional medicine team."
      />

      <Section bg="white" className="relative">
        <SectionAmbient tone="sage" variant="dots" />
        <Container className="relative">
          <div className="mx-auto max-w-xl">
            <label htmlFor="blog-search" className="sr-only">
              Search articles
            </label>
            <input
              id="blog-search"
              type="search"
              value={query}
              onChange={(event) => handleQueryChange(event.target.value)}
              placeholder="Search articles…"
              className="w-full rounded-pill border border-gray bg-white px-5 py-3 text-sm text-ink shadow-card transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          {paged.length === 0 ? (
            <p className="mt-16 text-center text-ink-soft">No articles match &ldquo;{query}&rdquo;.</p>
          ) : (
            <motion.ul
              key={`${currentPage}-${query}`}
              className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              variants={gridVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {paged.map((post) => (
                <motion.li key={post.slug} variants={cardVariants}>
                  <BlogCard post={post} />
                </motion.li>
              ))}
            </motion.ul>
          )}

          {totalPages > 1 && (
            <nav aria-label="Blog pagination" className="mt-14 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="rounded-pill border border-gray px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-sage disabled:pointer-events-none disabled:opacity-40"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPage(n)}
                  aria-current={n === currentPage ? "page" : undefined}
                  className={[
                    "h-9 w-9 rounded-full text-sm font-medium transition-colors",
                    n === currentPage ? "bg-primary text-white" : "text-ink hover:bg-sage",
                  ].join(" ")}
                >
                  {n}
                </button>
              ))}
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="rounded-pill border border-gray px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-sage disabled:pointer-events-none disabled:opacity-40"
              >
                Next
              </button>
            </nav>
          )}
        </Container>
      </Section>
    </>
  );
}
