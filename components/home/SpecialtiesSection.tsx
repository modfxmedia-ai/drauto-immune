"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Accent from "@/components/ui/Accent";
import Badge from "@/components/ui/Badge";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { SPECIALTIES } from "@/content/home-content";
import Reveal from "./Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * "Our Specialties" interactive spotlight — a numbered condition list on
 * the left. Hovering a row activates it: the row expands to show its
 * description AND a portrait image panel fades in on the right showing
 * the condition's photo. When no row is hovered, the image panel shows
 * a subtle "Explore our specialties" placeholder rather than staying
 * empty. Clicking a row (or its arrow button) navigates to that
 * condition's page.
 *
 * The panel is desktop-only — on smaller viewports the list stands on
 * its own since hover isn't a viable input model.
 */
export default function SpecialtiesSection() {
  // Default to the first row so the panel isn't empty on initial load;
  // hovering another row activates it, mouse-leaving the list resets
  // back to index 0 (never null) so the first image is always the
  // fallback.
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);
  const reduce = useReducedMotion();
  const items = SPECIALTIES.items;
  const active = items[hoveredIndex];
  const total = items.length;

  return (
    <Section className="relative overflow-hidden">
      <Container>
        {/* Top row: heading + eyebrow (left) + short intro (right). */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.75fr)] lg:items-end">
          <Reveal>
            <Badge className="mb-4 inline-flex">{SPECIALTIES.eyebrow}</Badge>
            <h2>
              Care crafted <Accent>around you</Accent>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-sm text-base leading-relaxed text-ink-soft lg:ml-auto lg:text-right">
              {SPECIALTIES.intro}
            </p>
          </Reveal>
        </div>

        {/* Bottom row: interactive list (left) + hover-driven image panel (right). */}
        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <ul
              role="list"
              className="divide-y divide-primary/15"
              onMouseLeave={() => setHoveredIndex(0)}
            >
              {items.map((item, i) => {
                const isActive = i === hoveredIndex;
                return (
                  <SpecialtyRow
                    key={item.href}
                    index={i}
                    item={item}
                    isActive={isActive}
                    onHover={() => setHoveredIndex(i)}
                    reduce={!!reduce}
                  />
                );
              })}
            </ul>
          </Reveal>

          {/* Image panel — desktop-only, shows on row hover. */}
          <Reveal delay={0.12} className="hidden lg:block">
            <SpecialtyPanel
              active={active}
              activeIndex={hoveredIndex}
              total={total}
              reduce={!!reduce}
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function SpecialtyRow({
  index,
  item,
  isActive,
  onHover,
  reduce,
}: {
  index: number;
  item: (typeof SPECIALTIES.items)[number];
  isActive: boolean;
  onHover: () => void;
  reduce: boolean;
}) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <li className="relative" onMouseEnter={onHover}>
      <Link
        href={item.href}
        aria-label={item.title}
        className="group flex w-full items-start gap-5 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
        onFocus={onHover}
      >
        <span
          className={`accent-serif shrink-0 pt-1 text-lg leading-none transition-colors duration-300 ${
            isActive ? "text-primary" : "text-ink-soft/50 group-hover:text-primary/70"
          }`}
        >
          {num}
        </span>

        <div className="min-w-0 flex-1">
          <h3
            className={`text-xl font-extrabold leading-tight transition-colors duration-300 sm:text-2xl ${
              isActive ? "text-ink" : "text-ink-soft group-hover:text-ink"
            }`}
          >
            {item.title}
          </h3>

          <AnimatePresence initial={false}>
            {isActive && (
              <motion.div
                initial={reduce ? undefined : { height: 0, opacity: 0 }}
                animate={reduce ? undefined : { height: "auto", opacity: 1 }}
                exit={reduce ? undefined : { height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="overflow-hidden"
              >
                <p className="mt-2 pr-4 text-sm leading-relaxed text-ink-soft">
                  {item.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Trailing arrow-in-circle affordance; filled when active */}
        <span
          aria-hidden="true"
          className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
            isActive
              ? "border-primary bg-primary text-white shadow-[0_4px_14px_rgba(63,128,106,0.28)]"
              : "border-primary/25 bg-transparent text-primary group-hover:border-primary group-hover:bg-white"
          }`}
        >
          <ArrowUpRight
            className={`h-4 w-4 transition-transform duration-300 ${
              isActive ? "" : "group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            }`}
          />
        </span>
      </Link>
    </li>
  );
}

function SpecialtyPanel({
  active,
  activeIndex,
  total,
  reduce,
}: {
  active: (typeof SPECIALTIES.items)[number];
  activeIndex: number;
  total: number;
  reduce: boolean;
}) {
  return (
    <div className="relative mx-auto w-full max-w-[420px] overflow-hidden rounded-card border border-gray/60 bg-sage/40 shadow-card">
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.href}
            initial={reduce ? undefined : { opacity: 0, scale: 1.04 }}
            animate={reduce ? undefined : { opacity: 1, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="absolute inset-0"
          >
            <Image
              src={active.image}
              alt={active.title}
              fill
              sizes="(min-width: 1024px) 420px, 100vw"
              className="object-cover"
              priority={activeIndex === 0}
            />
            {/* Bottom gradient scrim for legibility */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6 sm:p-7">
              <p className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.14em] text-sage">
                {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </p>
              <p className="text-2xl font-medium leading-tight text-white sm:text-3xl">
                {active.title}
              </p>
              <Link
                href={active.href}
                className="mt-3 inline-flex w-fit items-center gap-1.5 font-mono text-xs font-medium uppercase tracking-[0.14em] text-white transition-colors hover:text-sage"
              >
                Learn more
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/** Inline "arrow up-right" glyph (external-link style) used by both the list rows and the panel CTA. */
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
