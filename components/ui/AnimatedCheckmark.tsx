"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Small circular checkmark whose stroke "draws" itself in via an animated
 * SVG path (`pathLength` 0 → 1) once it scrolls into view — used for
 * confirmation/success-style moments (e.g. a completed step in a booking
 * flow). Kept deliberately quick and subtle per the conversion-page brief:
 * clarity and fast load over decorative motion. Respects
 * `prefers-reduced-motion` by rendering fully drawn immediately.
 */
export default function AnimatedCheckmark({
  className = "h-6 w-6",
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <motion.circle
        cx="12"
        cy="12"
        r="10.5"
        stroke="currentColor"
        strokeWidth="1.6"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.path
        d="M7.5 12.5 10.5 15.5 16.5 8.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.35, delay: delay + 0.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}
