"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import Accent from "@/components/ui/Accent";
import Badge from "@/components/ui/Badge";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import Section from "@/components/ui/Section";
import { BLOG_INSIGHTS } from "@/content/home-content";
import SectionAmbient from "./SectionAmbient";
import Reveal from "./Reveal";

type Post = (typeof BLOG_INSIGHTS.posts)[number];

/**
 * Editorial blog layout — matches the "Latest News · Insights & updates"
 * reference the user shared. Left column = one large featured card
 * with the read-time pill top-left, dark scrim, category pill + big
 * title + excerpt + circular Read-article arrow. Right column = two
 * stacked horizontal-media cards (image left, content right) with
 * their own category pill, read time, title, excerpt, and Read article
 * arrow. Section on cream-wash bg.
 */
export default function BlogInsights() {
  const [featured, ...rest] = BLOG_INSIGHTS.posts;
  const reduce = useReducedMotion();

  return (
    <Section bg="cream-wash" className="relative overflow-hidden">
      <SectionAmbient tone="primary" variant="dots" />

      <Container className="relative">
        {/* Header row: eyebrow + heading (left) + inline View all (right) */}
        <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,0.55fr)] md:gap-10">
          <Reveal>
            <div className="mb-4 flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-primary/40" />
              <Badge className="inline-flex">Latest News</Badge>
            </div>
            <h2>
              Insights for <Accent>Autoimmune Wellness</Accent>
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-soft">
              {BLOG_INSIGHTS.intro}
            </p>
          </Reveal>
          <Reveal delay={0.08} className="md:justify-self-end">
            <Link
              href="/blog/"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary-hover"
            >
              View All Articles
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          <Reveal>
            <FeaturedCard post={featured} reduce={!!reduce} />
          </Reveal>

          <div className="flex flex-col gap-6">
            {rest.map((post, i) => (
              <Reveal key={post.href} delay={0.1 + i * 0.08}>
                <SecondaryCard post={post} reduce={!!reduce} />
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

function FeaturedCard({ post, reduce }: { post: Post; reduce: boolean }) {
  return (
    <motion.div
      whileHover={reduce ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="h-full"
    >
      <Link
        href={post.href}
        className="group relative flex h-full min-h-[440px] flex-col overflow-hidden rounded-card bg-ink text-white shadow-card-hover transition-shadow duration-300 hover:shadow-[0_25px_50px_-12px_rgba(26,26,26,0.35)]"
      >
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-95"
        />
        {/* Strong bottom scrim so text is always readable */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/50 to-transparent" />

        {/* Top-left read-time pill */}
        <span className="absolute left-5 top-5 z-10 inline-flex items-center gap-1.5 rounded-pill bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
          <Icon name="clock" className="h-3 w-3" />
          {post.readTime}
        </span>

        {/* Content anchored bottom */}
        <div className="relative z-10 mt-auto flex flex-col gap-4 p-6 sm:p-8">
          <span className="inline-flex w-fit items-center rounded-pill bg-white/15 px-3 py-1 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md">
            {post.category}
          </span>
          <h3 className="text-2xl font-semibold leading-tight text-white sm:text-3xl">
            {post.title}
          </h3>
          <p className="max-w-xl text-sm leading-relaxed text-white/85">
            {post.excerpt}
          </p>
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
    </motion.div>
  );
}

function SecondaryCard({ post, reduce }: { post: Post; reduce: boolean }) {
  return (
    <motion.div
      whileHover={reduce ? undefined : { y: -3 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      <Link
        href={post.href}
        className="group relative flex h-full items-stretch overflow-hidden rounded-card bg-white shadow-card transition-all duration-300 hover:shadow-card-hover"
      >
        {/* Image left */}
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

        {/* Content right */}
        <div className="flex flex-1 flex-col justify-between gap-3 p-5 sm:p-6">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-pill bg-primary/10 px-2.5 py-1 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-primary">
                {post.category}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-ink-soft">
                <Icon name="clock" className="h-3 w-3" />
                {post.readTime}
              </span>
            </div>
            <h3 className="text-base font-semibold leading-snug text-ink sm:text-lg">
              {post.title}
            </h3>
            <p className="line-clamp-2 text-sm leading-relaxed text-ink-soft">
              {post.excerpt}
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
            Read article
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>

        {/* Bottom accent line drawn in on hover */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100"
        />
      </Link>
    </motion.div>
  );
}

/** Inline arrow-up-right glyph (external-link style) for "Read article ↗". */
function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path
        d="M4 12 12 4M6 4h6v6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

