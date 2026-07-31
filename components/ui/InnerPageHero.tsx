"use client";

import { motion, useReducedMotion } from "motion/react";
import Accent from "./Accent";
import Container from "./Container";

const EASE = [0.22, 1, 0.36, 1] as const;

interface InnerPageHeroProps {
  /** Small uppercase caption under the headline, e.g. "Conditions We Support". */
  eyebrow?: string;
  title: string;
  /**
   * A contiguous substring of `title` to render in the italic serif
   * "accent" style with a hand-drawn underline (matches the homepage
   * Hero's "Autoimmune Wellness" treatment). Must match `title` exactly;
   * omit to render the whole title in the plain white style.
   */
  accent?: string;
  /** Optional single-line supporting copy under the headline. */
  subhead?: string;
}

/** Renders `title` with the `accent` substring (if present) styled via `Accent`. */
function Headline({ title, accent }: { title: string; accent?: string }) {
  if (!accent) return <>{title}</>;
  const index = title.indexOf(accent);
  if (index === -1) return <>{title}</>;
  const before = title.slice(0, index);
  const after = title.slice(index + accent.length);
  return (
    <>
      {before}
      <Accent tone="cream" as="span">
        {accent}
      </Accent>
      {after}
    </>
  );
}

/**
 * Shared full-width inner-page hero band — dark charcoal/sage gradient
 * with a subtle checkered grid pattern overlay, large centered headline
 * (optionally with an italic serif `accent` phrase + hand-drawn underline,
 * matching the homepage Hero's "Autoimmune Wellness" treatment) and a
 * mono-caps caption below it, + optional one-line subhead. Fades/slides
 * up on load with Framer Motion; respects `prefers-reduced-motion` by
 * rendering in its final, settled state immediately instead of animating.
 */
export default function InnerPageHero({ eyebrow, title, accent, subhead }: InnerPageHeroProps) {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-section-xl md:py-section-2xl">
      {/* Base gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(135deg,var(--ink)_0%,color-mix(in_srgb,var(--ink)_42%,var(--primary))_58%,var(--primary-active)_100%)]"
      />

      {/* Checkered grid pattern overlay — a clean, modern alternative to a
          photo background. Blended with `mix-blend-overlay` (instead of a
          flat white layer) and faded out toward the edges with a radial
          mask so it reads as a soft texture merging into the gradient
          rather than a hard, uniformly-visible grid of boxes. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 75% 75% at 50% 45%, black 20%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 75% at 50% 45%, black 20%, transparent 85%)",
        }}
      />

      {/* Ambient glow orbs — purely decorative, matches the homepage's glow language. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-white/5 blur-3xl"
      />

      <Container className="relative">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <h1 className="text-4xl font-semibold text-white sm:text-5xl md:text-6xl">
            <Headline title={title} accent={accent} />
          </h1>
          {eyebrow && (
            <p className="mt-4 font-mono text-xs font-medium uppercase tracking-[0.12em] text-white/70 sm:text-sm">
              {eyebrow}
            </p>
          )}
          {subhead && <p className="mx-auto mt-5 max-w-2xl text-lg text-white/80 md:text-xl">{subhead}</p>}
        </motion.div>
      </Container>
    </section>
  );
}

