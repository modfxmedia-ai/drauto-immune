"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";

/**
 * Thin sage-green bar pinned to the very top of the viewport (above the
 * sticky header) whose horizontal scale tracks whole-page scroll progress
 * — a lightweight "reading progress" indicator for long blog posts.
 * Hidden entirely under `prefers-reduced-motion` (a moving progress
 * indicator is a nice-to-have, not essential UI).
 */
export default function ReadingProgressBar() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-primary"
      style={{ scaleX }}
    />
  );
}
