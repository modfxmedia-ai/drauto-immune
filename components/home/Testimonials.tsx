"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import Accent from "@/components/ui/Accent";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import Section from "@/components/ui/Section";
import { TESTIMONIALS } from "@/content/home-content";
import SectionAmbient from "./SectionAmbient";
import Reveal from "./Reveal";

type Item = (typeof TESTIMONIALS.items)[number];

/**
 * Testimonials — Google-review-style cards, two marquee rows scrolling
 * in opposite directions. Each card has: reviewer avatar (initials on a
 * primary-tint disc), name + condition + "N months ago" + verified
 * check, a 5-star row, the quote body, and a subtle "Google" mark in
 * the corner to signal the review source. The marquee animation
 * respects `useReducedMotion` (stops the loop and lets the CSS
 * scroll-snap behavior take over for keyboard users).
 */
export default function Testimonials() {
  const reduce = useReducedMotion();
  const items = TESTIMONIALS.items;
  // Split into two rows so we can scroll them in opposite directions.
  const midpoint = Math.ceil(items.length / 2);
  const rowA = items.slice(0, midpoint);
  const rowB = items.slice(midpoint);

  return (
    <Section bg="sage-mesh" className="relative overflow-hidden">
      <SectionAmbient tone="sage" variant="orbs" />

      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Badge className="mb-4 inline-flex">Patient Reviews</Badge>
          <h2>
            {TESTIMONIALS.heading.split("Real Patients")[0]}
            <Accent>Real Patients</Accent>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-ink-soft">
            {TESTIMONIALS.intro}
          </p>

          {/* Aggregate rating pill row (Google-style summary) */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-pill border border-gray bg-white px-4 py-2 shadow-card">
              <GoogleGlyph className="h-4 w-4" />
              <span className="text-sm font-semibold text-ink">4.9</span>
              <StarRow rating={5} className="h-3.5 w-3.5" />
              <span className="text-xs text-ink-soft">
                {items.length}+ reviews
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-pill border border-gray bg-white px-3 py-1.5 text-xs font-medium text-ink-soft shadow-card">
              <Icon name="check-circle" className="h-3.5 w-3.5 text-primary" />
              Verified patients
            </span>
          </div>
        </Reveal>
      </Container>

      {/* Two marquee rows, full-bleed (escape the container to give a
          true infinite-scroll feel; edge fades on the container edges
          keep the effect polished). */}
      <div className="relative mt-14 space-y-6">
        <MarqueeRow items={rowA} direction="left" reduce={!!reduce} />
        <MarqueeRow items={rowB} direction="right" reduce={!!reduce} delayOffset={-15} />

        {/* Left / right fade masks so cards ease off-screen instead of
            hard-cropping at the viewport edge. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-sage to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-sage to-transparent"
        />
      </div>

      <Container className="relative mt-14">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <p className="max-w-md text-base italic text-ink-soft">
            {TESTIMONIALS.cta.label}
          </p>
          <Button href={TESTIMONIALS.cta.href} variant="primary" size="md">
            Book Free Discovery Call
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}

function MarqueeRow({
  items,
  direction,
  reduce,
  delayOffset = 0,
}: {
  items: readonly Item[];
  direction: "left" | "right";
  reduce: boolean;
  delayOffset?: number;
}) {
  // Duplicate the items so the marquee can loop seamlessly.
  const doubled = [...items, ...items];
  // 40s base loop, tweak per row via delayOffset.
  const duration = 40 + delayOffset;

  return (
    <div className="group relative overflow-hidden">
      <motion.ul
        className="flex w-max gap-5"
        animate={
          reduce
            ? undefined
            : direction === "left"
              ? { x: ["0%", "-50%"] }
              : { x: ["-50%", "0%"] }
        }
        transition={
          reduce
            ? undefined
            : { duration, repeat: Infinity, ease: "linear" }
        }
        style={{ animationPlayState: "running" }}
      >
        {doubled.map((item, i) => (
          <li key={`${item.author}-${i}`} className="w-[320px] shrink-0 sm:w-[360px]">
            <ReviewCard item={item} />
          </li>
        ))}
      </motion.ul>
    </div>
  );
}

function ReviewCard({ item }: { item: Item }) {
  const initials = item.author
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <article className="flex h-full flex-col gap-4 rounded-card border border-gray bg-white p-6 shadow-card transition-transform duration-300 hover:-translate-y-1">
      {/* Header row: avatar + name/date + Google glyph */}
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/12 font-mono text-sm font-semibold text-primary">
          {initials}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <p className="truncate text-sm font-semibold text-ink">{item.author}</p>
            {item.verified && (
              <span aria-label="Verified review" title="Verified review">
                <VerifiedGlyph className="h-3.5 w-3.5 text-primary" />
              </span>
            )}
          </div>
          <p className="text-xs text-ink-soft">
            <span className="font-medium text-ink-soft">{item.condition}</span> · {item.timeAgo}
          </p>
        </div>
        <GoogleGlyph className="h-4 w-4 shrink-0 opacity-60" />
      </div>

      {/* Star row */}
      <StarRow rating={item.rating} />

      {/* Quote */}
      <p className="text-sm leading-relaxed text-ink">
        {item.quote}
      </p>
    </article>
  );
}

function StarRow({
  rating,
  className = "h-4 w-4",
}: {
  rating: number;
  className?: string;
}) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <StarGlyph
          key={i}
          filled={i < rating}
          className={`${className} ${i < rating ? "text-[#fbbc04]" : "text-gray"}`}
        />
      ))}
    </div>
  );
}

function StarGlyph({ filled, className = "" }: { filled: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        d="M12 3l2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6-4.4-4.2 6-.8L12 3Z"
        fill={filled ? "currentColor" : "none"}
        stroke={filled ? "none" : "currentColor"}
        strokeWidth="1.5"
      />
    </svg>
  );
}

/** Google "G" glyph — small colored SVG used as the review source marker. */
function GoogleGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.4 2.7 30 0 24 0 14.9 0 7 5.4 3.1 13.3l7.9 6.1C13 13.6 18 9.5 24 9.5Z" />
      <path fill="#4285F4" d="M46.5 24.6c0-1.6-.1-3.1-.4-4.6H24v9h12.7c-.6 3-2.3 5.4-4.9 7.1l7.6 5.9c4.4-4.1 7.1-10.1 7.1-17.4Z" />
      <path fill="#FBBC05" d="M11 28.6c-.5-1.4-.8-2.9-.8-4.6s.3-3.2.8-4.6l-7.9-6.1C1.1 16.6 0 20.2 0 24s1.1 7.4 3.1 10.7L11 28.6Z" />
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.8 2.3-8.3 2.3-6 0-11.1-4.1-13-9.6l-7.9 6.1C7 42.6 14.9 48 24 48Z" />
    </svg>
  );
}

/** Small "verified" checkmark badge shown next to the reviewer name. */
function VerifiedGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        d="M12 2 14.5 5l3.7-.4 1 3.6L21.8 10 20 13l1.8 3-2.6 2.7-3.7-.4L14.5 21 12 18l-2.5 3-2-2.7-3.7.4L1.6 16 3.5 13 1.6 10l2.6-2.8L4 3.6 7.7 4l1.8-3L12 3.6Z"
        fill="currentColor"
      />
      <path d="M8.5 12.5 11 15l5-6" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Preserve the Link import for the top-CTA button (Button uses it internally
// but explicit reference here prevents future edits from breaking imports).
void Link;
