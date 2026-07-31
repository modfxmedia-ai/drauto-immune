"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in seconds — use for sequential items in a list/grid. */
  delay?: number;
  /** Vertical travel distance in px. */
  y?: number;
}

/**
 * Scroll-triggered fade/slide-up reveal. Animates once when the element
 * enters the viewport; respects reduced-motion via a small, subtle default
 * distance rather than disabling entirely.
 */
export default function Reveal({ children, className, delay = 0, y = 20 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
