"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import Accent from "@/components/ui/Accent";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Icon, { type IconName } from "@/components/ui/Icon";
import Section from "@/components/ui/Section";
import { PROCESS } from "@/content/home-content";
import Reveal from "./Reveal";

const STEP_ICONS: IconName[] = ["phone-call", "clipboard", "heart-pulse"];

/**
 * Care-process timeline: centered heading + intro, then three step cards
 * side-by-side, each with its own photo, numbered badge, icon, title, and
 * description. On desktop the badges align on a shared connecting rail
 * that draws in from left to right on scroll into view. Cards lift on
 * hover; image scales gently and gains a subtle sage tint overlay.
 */
export default function ProcessSteps() {
  const reduce = useReducedMotion();
  return (
    <Section bg="cream-wash" className="relative overflow-hidden">
      <Container className="relative">
        {/* Heading block — centered, with breathing room so the italic
            accent's SVG underline never collides with the intro below. */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <Badge className="mb-4 inline-flex">Care Process</Badge>
          <h2>
            How Our <Accent>Care Process</Accent> Works
          </h2>
          <p className="mt-8 text-base italic leading-relaxed text-ink-soft sm:text-lg">
            {PROCESS.intro}
          </p>
        </Reveal>

        {/* Connecting rail — a thin dashed line behind the number badges,
            drawn in from left to right when the row scrolls into view. */}
        <div className="relative mt-16">
          <div
            aria-hidden="true"
            className="absolute inset-x-[16.5%] top-8 hidden md:block"
          >
            <motion.div
              className="h-px w-full origin-left"
              style={{
                background:
                  "repeating-linear-gradient(to right, rgba(63,128,106,0.35) 0 6px, transparent 6px 12px)",
              }}
              initial={{ scaleX: reduce ? 1 : 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6">
            {PROCESS.steps.map((step, i) => (
              <ProcessCard key={step.title} step={step} index={i} />
            ))}
          </div>
        </div>

        <Reveal className="mt-16 flex justify-center">
          <Button href={PROCESS.cta.href} variant="primary" size="lg">
            {PROCESS.cta.label}
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}

function ProcessCard({
  step,
  index,
}: {
  step: (typeof PROCESS.steps)[number];
  index: number;
}) {
  const reduce = useReducedMotion();
  return (
    <Reveal delay={index * 0.12} className="group relative flex flex-col items-center">
      {/* Numbered badge sits on the connecting rail; ring blends with the
          sage section background so the badge feels detached from the rail. */}
      <motion.span
        className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white text-primary shadow-card ring-[6px] ring-[color-mix(in_srgb,var(--cream)_18%,var(--white))]"
        initial={reduce ? undefined : { scale: 0.6 }}
        whileInView={reduce ? undefined : { scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.12 + 0.15, type: "spring", stiffness: 220 }}
      >
        <span className="accent-serif text-2xl leading-none">{index + 1}</span>
      </motion.span>

      <div className="mt-6 flex h-full w-full flex-col overflow-hidden rounded-card bg-white shadow-card transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-card-hover">
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={step.image}
            alt={step.title}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Subtle sage tint on hover — hints the interaction without
              obscuring the photo. */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-ink/5 to-transparent" />
          <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-primary shadow-card backdrop-blur-sm transition-transform duration-300 group-hover:rotate-6">
            <Icon name={STEP_ICONS[index % STEP_ICONS.length]} className="h-4 w-4" />
          </span>
          <span className="absolute right-4 top-4 rounded-pill bg-primary/90 px-3 py-1 font-mono text-[0.6rem] font-medium uppercase tracking-[0.12em] text-white backdrop-blur-sm">
            Step {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-6">
          <h3 className="text-lg font-medium leading-tight text-ink sm:text-xl">
            {step.title}
          </h3>
          <p className="text-sm leading-relaxed text-ink-soft">{step.description}</p>
        </div>

        {/* Bottom accent line drawn in on hover */}
        <span
          aria-hidden="true"
          className="h-1 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100"
        />
      </div>
    </Reveal>
  );
}

