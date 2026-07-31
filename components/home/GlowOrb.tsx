"use client";

import { motion } from "motion/react";

interface GlowOrbProps {
  className?: string;
  color?: "primary" | "sage";
  size?: number;
  delay?: number;
}

/**
 * Soft blurred gradient orb — the "gradient/atmosphere" motion layer used
 * behind hero and CTA sections. Brand-green tones only.
 */
export default function GlowOrb({ className = "", color = "primary", size = 420, delay = 0 }: GlowOrbProps) {
  const gradient =
    color === "primary"
      ? "radial-gradient(circle at 30% 30%, rgba(63,128,106,0.35), rgba(63,128,106,0) 70%)"
      : "radial-gradient(circle at 30% 30%, rgba(223,232,221,0.9), rgba(223,232,221,0) 70%)";

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      style={{ width: size, height: size, background: gradient }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}
