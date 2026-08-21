"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import Section from "@/components/ui/Section";
import { SERVICES } from "@/content/home-content";
import GlowOrb from "./GlowOrb";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

type ServiceCard = (typeof SERVICES.cards)[number];

/**
 * Horizontal-scrolling services + conditions carousel.
 *
 * Design goals:
 * - Every service and every supported condition shown at a glance
 *   (17 cards on a single scroll track), matching the live-site nav.
 * - Native CSS scroll-snap so touch/trackpad flick behavior stays fast
 *   and the browser handles inertia; JS arrows just call `scrollBy`
 *   for keyboard and mouse users.
 * - Scroll-progress indicator bar underneath tracks position without
 *   dots (which would get crowded at 17 items).
 * - Cards animate a small parallax on hover (image scale + rotate) plus
 *   an upward lift, mirroring the motion language of the rest of the page.
 * - Above-the-fold text does not fade in from opacity 0 (see repo
 *   memory — the arrows/nav chrome uses position-only motion).
 */
export default function ServicesSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const reduce = useReducedMotion();

  const updateState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const p = max > 0 ? el.scrollLeft / max : 0;
    setProgress(p);
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < max - 2);
  }, []);

  useEffect(() => {
    updateState();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateState, { passive: true });
    window.addEventListener("resize", updateState);
    return () => {
      el.removeEventListener("scroll", updateState);
      window.removeEventListener("resize", updateState);
    };
  }, [updateState]);

  const scrollByCard = useCallback((dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    // Advance by ~one card + gap; the first card width is a reliable proxy
    // since all cards share the same width.
    const firstCard = el.querySelector<HTMLElement>("[data-card]");
    const step = firstCard ? firstCard.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: reduce ? "auto" : "smooth" });
  }, [reduce]);

  return (
    <Section bg="cream-wash" className="relative overflow-hidden">
      <GlowOrb className="-right-24 top-0 hidden lg:block" color="primary" size={420} />
      <GlowOrb className="-left-20 bottom-8 hidden lg:block" color="sage" size={340} delay={0.6} />

      <Container className="relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="What We Offer"
            heading={SERVICES.heading}
            accent="Wellness Services"
            intro={SERVICES.intro}
            align="left"
            className="md:max-w-2xl"
          />
          <Reveal delay={0.1} className="flex items-center gap-3">
            <div className="hidden items-center gap-2 md:flex">
              <CarouselButton
                dir="prev"
                enabled={canScrollLeft}
                onClick={() => scrollByCard(-1)}
              />
              <CarouselButton
                dir="next"
                enabled={canScrollRight}
                onClick={() => scrollByCard(1)}
              />
            </div>
            <Link
              href="/services/"
              className="group inline-flex shrink-0 items-center gap-1.5 rounded-pill border border-primary/30 bg-white px-5 py-2.5 text-sm font-medium text-primary shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-white"
            >
              View All Services
              <Icon name="arrow-right" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </Container>

      {/* Full-bleed scroller so cards can slide edge-to-edge on wide screens
          while the header + progress bar stay contained. Left/right padding
          matches the outer container gutter so the first/last card aligns
          with the SectionHeading above it. */}
      <div className="relative mt-12">
        <div
          ref={scrollerRef}
          className="scrollbar-none flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-6 pb-6 md:px-10 lg:px-[max(2.5rem,calc((100vw-var(--container-max))/2))]"
          style={{ scrollbarWidth: "none" }}
          aria-label="Services and conditions carousel"
        >
          {SERVICES.cards.map((card, i) => (
            <ServiceCard key={card.href} card={card} index={i} />
          ))}
        </div>

        {/* Edge fades hint at more content off-screen */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-sage to-transparent transition-opacity duration-300 ${
            canScrollLeft ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-sage to-transparent transition-opacity duration-300 ${
            canScrollRight ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <Container className="relative mt-4">
        {/* Scroll-progress bar */}
        <div className="mx-auto h-[3px] w-full max-w-md overflow-hidden rounded-full bg-primary/15">
          <motion.div
            className="h-full origin-left rounded-full bg-primary"
            style={{ scaleX: progress || 0.02, transformOrigin: "left" }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        {/* Mobile arrows underneath the track */}
        <div className="mt-6 flex items-center justify-center gap-3 md:hidden">
          <CarouselButton dir="prev" enabled={canScrollLeft} onClick={() => scrollByCard(-1)} />
          <CarouselButton dir="next" enabled={canScrollRight} onClick={() => scrollByCard(1)} />
        </div>
      </Container>
    </Section>
  );
}

function CarouselButton({
  dir,
  enabled,
  onClick,
}: {
  dir: "prev" | "next";
  enabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!enabled}
      aria-label={dir === "prev" ? "Previous services" : "Next services"}
      className="group flex h-11 w-11 items-center justify-center rounded-full border border-primary/25 bg-white text-primary shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-white disabled:pointer-events-none disabled:opacity-30"
    >
      <Icon
        name="arrow-right"
        className={`h-4 w-4 transition-transform duration-300 ${
          dir === "prev" ? "rotate-180 group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5"
        }`}
      />
    </button>
  );
}

function ServiceCard({ card, index }: { card: ServiceCard; index: number }) {
  const isService = card.category === "Service";
  return (
    <motion.div
      data-card
      initial={{ y: 24 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.04, 0.24), ease: [0.16, 1, 0.3, 1] }}
      className="w-[280px] shrink-0 snap-start sm:w-[320px] lg:w-[340px]"
    >
      <Link
        href={card.href}
        className="group relative flex h-full flex-col overflow-hidden rounded-card border border-white/60 bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover"
      >
        <div className="relative aspect-[5/4] w-full overflow-hidden">
          <Image
            src={card.image}
            alt={card.title}
            fill
            sizes="(min-width: 1024px) 340px, (min-width: 640px) 320px, 280px"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
          {/* Category badge — small pill anchored top-left */}
          <span
            className={`absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 font-mono text-[0.6rem] font-medium uppercase tracking-[0.1em] backdrop-blur-sm ${
              isService
                ? "bg-primary text-white"
                : "bg-white/85 text-primary"
            }`}
          >
            <span
              className={`inline-block h-1.5 w-1.5 rounded-full ${
                isService ? "bg-white" : "bg-primary"
              }`}
            />
            {card.category}
          </span>
          {/* Title sits over the image bottom-gradient for a strong hero look */}
          <h3 className="absolute inset-x-4 bottom-4 text-lg font-extrabold leading-tight text-white sm:text-xl">
            {card.title}
          </h3>
          {/* Rotate-on-hover icon top-right */}
          <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-primary shadow-card backdrop-blur-sm transition-transform duration-300 group-hover:rotate-12">
            <Icon name={isService ? "sparkles" : "heart-pulse"} className="h-4 w-4" />
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-6">
          <p className="text-sm leading-relaxed text-ink-soft">{card.description}</p>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-primary transition-transform duration-300 group-hover:translate-x-1">
            Learn more <Icon name="arrow-right" className="h-3.5 w-3.5" />
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

