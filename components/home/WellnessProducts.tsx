"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import Badge from "@/components/ui/Badge";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import Section from "@/components/ui/Section";
import { PRODUCTS, PRODUCTS_CATALOG } from "@/content/home-content";
import Reveal from "./Reveal";

type Product = (typeof PRODUCTS_CATALOG)[number];

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Card-bg palette — each product cycles through a soft brand-tinted
 * pedestal so the row reads as an intentional composition rather than
 * five identical white cards on a white bg. `tint` is the base gradient
 * on the image pedestal; `accent` is the color used on the little
 * decorative flourishes floating inside each card.
 */
const CARD_TINTS = [
  { tint: "from-sage/60 to-white", accent: "bg-primary/10" },
  { tint: "from-[color-mix(in_srgb,var(--gray)_45%,var(--white))] to-white", accent: "bg-[color-mix(in_srgb,var(--gray)_60%,var(--white))]" },
  { tint: "from-primary/10 to-white", accent: "bg-primary/15" },
  { tint: "from-sage/50 to-white", accent: "bg-primary/10" },
  { tint: "from-[color-mix(in_srgb,var(--gray)_35%,var(--white))] to-white", accent: "bg-primary/10" },
] as const;

const SHOP_URL = "https://shop.drautoimmune.com/";

/**
 * Wellness products carousel — white section bg with each product card
 * on a soft brand-tinted pedestal. Big centered title, decorative
 * floating chevrons behind the row, and a shop CTA that opens the
 * external Shopify store in a new tab.
 */
export default function WellnessProducts() {
  const reduce = useReducedMotion();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
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
    const firstCard = el.querySelector<HTMLElement>("[data-product-card]");
    const step = firstCard ? firstCard.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: reduce ? "auto" : "smooth" });
  }, [reduce]);

  return (
    <Section bg="white" className="relative overflow-hidden">
      {/* Ambient decorations — very subtle sage tint blobs behind everything */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-16 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "rgba(63,128,106,0.06)" }}
        animate={reduce ? undefined : { y: [0, 18, 0], x: [0, 6, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-20 h-80 w-80 rounded-full blur-3xl"
        style={{ background: "rgba(223,232,221,0.35)" }}
        animate={reduce ? undefined : { y: [0, -22, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <Container className="relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Badge className="mb-6 inline-flex">Store</Badge>
          <h2 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            {PRODUCTS.heading.split(" ").map((word, i, arr) => (
              <span key={`${word}-${i}`} className="inline-block">
                {word}
                {i < arr.length - 1 ? "\u00A0" : ""}
              </span>
            ))}
          </h2>
          <p className="mt-6 text-lg italic leading-relaxed text-ink-soft sm:text-xl">
            {PRODUCTS.intro}
          </p>

          {/* Small trust pills under the heading */}
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {[
              { icon: "shield", label: "Clinically formulated" },
              { icon: "check-circle", label: "Third-party tested" },
              { icon: "sparkles", label: "Practitioner grade" },
            ].map((p) => (
              <li key={p.label}>
                <span className="inline-flex items-center gap-1.5 rounded-pill border border-gray bg-white px-3 py-1.5 text-xs font-medium text-ink-soft shadow-card">
                  <Icon name={p.icon as "shield" | "check-circle" | "sparkles"} className="h-3.5 w-3.5 text-primary" />
                  {p.label}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="relative mt-14">
          <CarouselButton
            dir="prev"
            enabled={canScrollLeft}
            onClick={() => scrollByCard(-1)}
            className="absolute -left-2 top-1/2 z-10 hidden -translate-y-1/2 md:flex"
          />
          <CarouselButton
            dir="next"
            enabled={canScrollRight}
            onClick={() => scrollByCard(1)}
            className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 md:flex"
          />

          <div
            ref={scrollerRef}
            className="scrollbar-none flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-6 md:px-14"
            style={{ scrollbarWidth: "none" }}
            aria-label="Wellness products carousel"
          >
            {PRODUCTS_CATALOG.map((product, i) => (
              <ProductCard
                key={product.slug}
                product={product}
                index={i}
                reduce={!!reduce}
                palette={CARD_TINTS[i % CARD_TINTS.length]}
              />
            ))}
          </div>
        </div>

        {/* Mobile arrows */}
        <div className="mt-4 flex items-center justify-center gap-3 md:hidden">
          <CarouselButton dir="prev" enabled={canScrollLeft} onClick={() => scrollByCard(-1)} />
          <CarouselButton dir="next" enabled={canScrollRight} onClick={() => scrollByCard(1)} />
        </div>

        {/* Shop link — opens external Shopify store in a new tab */}
        <Reveal className="mt-12 flex justify-center">
          <a
            href={SHOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-base font-medium text-ink underline decoration-primary/40 decoration-2 underline-offset-8 transition-all duration-300 hover:text-primary hover:decoration-primary"
          >
            {PRODUCTS.cta.label}
            <ExternalArrow className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </Reveal>
      </Container>
    </Section>
  );
}

function CarouselButton({
  dir,
  enabled,
  onClick,
  className = "",
}: {
  dir: "prev" | "next";
  enabled: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!enabled}
      aria-label={dir === "prev" ? "Previous products" : "Next products"}
      className={`group flex h-12 w-12 items-center justify-center rounded-full border border-primary/25 bg-white text-primary shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-white disabled:pointer-events-none disabled:opacity-30 ${className}`}
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

function ProductCard({
  product,
  index,
  reduce,
  palette,
}: {
  product: Product;
  index: number;
  reduce: boolean;
  palette: (typeof CARD_TINTS)[number];
}) {
  return (
    <motion.article
      data-product-card
      initial={reduce ? undefined : { y: 24 }}
      whileInView={reduce ? undefined : { y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.06, 0.24), ease: EASE }}
      className="w-[280px] shrink-0 snap-start sm:w-[320px] lg:w-[340px]"
    >
      <div
        className={`group relative flex h-full flex-col overflow-hidden rounded-card bg-gradient-to-b ${palette.tint} shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover`}
      >
        {/* Brand pill top-left */}
        <span className="absolute left-5 top-5 z-10 inline-flex items-center gap-1.5 rounded-pill border border-white/70 bg-white/95 px-3 py-1.5 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-primary shadow-card backdrop-blur-sm">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
          Dr. Autoimmune
        </span>

        {/* Product image on a soft-tinted pedestal */}
        <div className="relative aspect-square w-full overflow-hidden">
          {/* Floating decorative accents — small blur circles that gently drift */}
          <motion.div
            aria-hidden="true"
            className={`absolute -right-6 -top-4 h-24 w-24 rounded-full blur-2xl ${palette.accent}`}
            animate={reduce ? undefined : { y: [0, 8, 0], x: [0, -6, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
          />
          <motion.div
            aria-hidden="true"
            className={`absolute -left-8 bottom-2 h-20 w-20 rounded-full blur-2xl ${palette.accent}`}
            animate={reduce ? undefined : { y: [0, -6, 0], x: [0, 4, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 + 0.5 }}
          />
          {/* Radial spotlight behind the bottle */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 65%, rgba(63,128,106,0.14) 0%, transparent 55%)",
            }}
          />
          {/* Sparkle glyph that pulses on hover */}
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute right-6 top-16 text-primary/70"
            animate={reduce ? undefined : { rotate: [0, 12, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
          >
            <Icon name="sparkles" className="h-4 w-4" />
          </motion.span>

          <motion.div
            className="absolute inset-0 flex items-center justify-center p-10"
            animate={reduce ? undefined : { y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
            whileHover={reduce ? undefined : { rotate: -2 }}
          >
            <Image
              src={product.image}
              alt={product.name}
              width={800}
              height={800}
              sizes="(min-width: 1024px) 340px, (min-width: 640px) 320px, 280px"
              className="h-full w-full object-contain drop-shadow-[0_18px_28px_rgba(26,26,26,0.18)] transition-transform duration-500 group-hover:scale-105"
            />
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-3 bg-white p-6">
          <div>
            <h3 className="text-xl font-extrabold leading-tight text-ink">
              {product.name}
            </h3>
            <p className="mt-1 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-primary">
              {product.tagline}
            </p>
          </div>
          <p className="text-sm leading-relaxed text-ink-soft">{product.description}</p>
          <a
            href={product.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-pill border border-primary/25 px-4 py-2 text-sm font-medium text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-white"
          >
            View Product
            <Icon name="arrow-right" className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Bottom accent line drawn in on hover */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100"
        />
      </div>
    </motion.article>
  );
}

/** External-link ↗ glyph used on the Shop Now CTA. */
function ExternalArrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path
        d="M4 12 12 4M6 4h6v6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
