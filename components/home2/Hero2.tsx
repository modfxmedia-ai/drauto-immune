"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { HERO } from "@/content/home-content";
import { SECTION_PADDING, TEXT } from "./theme";

// Hero copy renders over a dark video scrim, so swap the shared dark-on-light
// text tokens for white/translucent-white variants instead of layering a
// second color utility on top (avoids Tailwind utility-ordering ambiguity).
const HEADING_TEXT = TEXT.h1.replace("text-ink", "text-white");
const CAPTION_TEXT = TEXT.caption.replace("text-ink-soft", "text-white/80");
const MISSION_TEXT = TEXT.bodyLg.replace("text-ink-soft", "text-white/85");

/**
 * Full-bleed, continuously looping background video behind the hero,
 * kept genuinely visible (only a light brand tint + gentle edge vignette,
 * no heavy scrim) since text legibility comes from the dedicated content
 * panel in `Hero2` below instead of darkening the whole frame. Paused for
 * `prefers-reduced-motion`; the poster frame covers the paint before the
 * video is ready either way.
 */
function HeroBackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduceMotion, setReduceMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduceMotion(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reduceMotion) {
      video.pause();
    } else {
      video.play().catch(() => {
        // Autoplay can be blocked by the browser — the poster frame still
        // covers the paint either way.
      });
    }
  }, [reduceMotion]);

  return (
    <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden bg-primary">
      <video
        ref={videoRef}
        className="h-full w-full scale-105 object-cover blur-[2px]"
        poster="/images/home2/hero-antibody-poster.jpg"
        autoPlay={!reduceMotion}
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/videos/antibody-virus-particle-animation.mp4" type="video/mp4" />
      </video>
      {/* Light forest-green tint: unifies the footage with the brand
          palette without hiding it. */}
      <div className="absolute inset-0 bg-[#0f3a2e]/25 mix-blend-multiply" />
      {/* Gentle edge vignette for depth \u2014 leaves the center clearly visible. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,30,24,0.45)_100%)]" />
    </div>
  );
}

/**
 * Clean, centered hero: a full-bleed, clearly-visible looping background
 * video, with the eyebrow, headline, mission and CTAs stacked in one
 * centered frosted-glass content panel on top \u2014 the panel (not a whole-
 * video scrim) is what guarantees legible, on-brand contrast, so the
 * video itself stays vivid around it. Deliberately a single centered
 * column with no split layout, framed video window, or floating badges
 * (unlike the original homepage's hero).
 */
export default function Hero2() {
  return (
    <section className={`relative overflow-hidden ${SECTION_PADDING}`}>
      <HeroBackgroundVideo />

      <Container className="relative z-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center rounded-[2rem] border border-white/15 bg-ink/55 px-6 py-12 text-center shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55)] backdrop-blur-md sm:px-14 sm:py-16">
          {HERO.tags.length > 0 && (
            <ul className="mb-6 flex flex-wrap justify-center gap-2">
              {HERO.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-white/30 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}

          <p className={CAPTION_TEXT}>{HERO.eyebrow}</p>
          <h1 className={`mt-3 ${HEADING_TEXT}`}>{HERO.headline}</h1>
          <span aria-hidden="true" className="mt-6 h-px w-16 bg-white/30" />
          <p className={`mt-6 max-w-xl ${MISSION_TEXT}`}>{HERO.mission}</p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href={HERO.primaryCta.href} variant="primary" size="lg" className="uppercase tracking-wide">
              {HERO.primaryCta.label}
            </Button>
            <Button href={HERO.secondaryCta.href} variant="secondary" size="lg">
              {HERO.secondaryCta.label}
            </Button>
          </div>

          <div className="mt-10 flex w-full flex-wrap justify-center gap-x-8 gap-y-5 border-t border-white/15 pt-6">
            {HERO.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-0.5">
                <span className="accent-serif text-xl text-white sm:text-2xl">{stat.value}</span>
                <span className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-white/55">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

