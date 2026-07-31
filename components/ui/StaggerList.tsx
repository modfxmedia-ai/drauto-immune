"use client";

import { motion, useReducedMotion } from "motion/react";
import Icon from "./Icon";

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

/**
 * Bulleted (or numbered) checklist grid whose items stagger in one-by-one
 * as the section scrolls into view. Each item renders as a bordered,
 * lightly-tinted "checklist card" chip (modeled on renoregen.com's
 * "Who Is a Good Candidate" card grid) rather than a bare bullet, so
 * symptom/trigger lists read as distinct, scannable chips instead of a
 * flat run of text. Used for every symptom/trigger list across the
 * condition pages.
 */
export default function StaggerList({
  items,
  ordered = false,
  columns = 2,
}: {
  items: string[];
  ordered?: boolean;
  columns?: 1 | 2;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.ul
      variants={reduce ? undefined : container}
      initial={reduce ? undefined : "hidden"}
      whileInView={reduce ? undefined : "visible"}
      viewport={{ once: true, margin: "-60px" }}
      className={`mt-5 grid grid-cols-1 gap-3 ${columns === 2 ? "sm:grid-cols-2" : ""}`}
    >
      {items.map((text, i) => (
        <motion.li
          key={text}
          variants={reduce ? undefined : item}
          className="flex items-start gap-3 rounded-xl border border-gray bg-cream-wash/60 px-4 py-3.5 transition-colors hover:border-primary/30 hover:bg-sage/40"
        >
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[0.7rem] font-semibold text-white">
            {ordered ? i + 1 : <Icon name="check-circle" className="h-3.5 w-3.5" />}
          </span>
          <span className="text-sm font-medium leading-snug text-ink">{text}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
}
