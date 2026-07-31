"use client";

import { useReducedMotion, motion } from "motion/react";

/**
 * Ambient decorative background: two very soft, slowly-drifting brand-tint
 * blobs, plus a fine dot grid. Purely decorative (`aria-hidden`), respects
 * `prefers-reduced-motion`, and sits behind content with `-z-10` so it
 * never blocks interactions. Drop into any light-background section that
 * needs a bit more visual life.
 */
export default function SectionAmbient({
  tone = "primary",
  variant = "orbs",
}: {
  tone?: "primary" | "sage";
  variant?: "orbs" | "dots" | "both";
}) {
  const reduce = useReducedMotion();
  const orbColor =
    tone === "primary" ? "rgba(63,128,106,0.10)" : "rgba(223,232,221,0.55)";

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {(variant === "orbs" || variant === "both") && (
        <>
          <motion.div
            className="absolute -left-24 top-16 h-72 w-72 rounded-full blur-3xl"
            style={{ background: orbColor }}
            animate={reduce ? undefined : { y: [0, 18, 0], x: [0, 8, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -right-16 bottom-8 h-80 w-80 rounded-full blur-3xl"
            style={{ background: orbColor }}
            animate={reduce ? undefined : { y: [0, -22, 0], x: [0, -10, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          />
        </>
      )}
      {(variant === "dots" || variant === "both") && (
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(26,26,26,0.08) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      )}
    </div>
  );
}
