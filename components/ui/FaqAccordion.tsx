"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/home/Reveal";

export interface FaqItem {
  question: string;
  /** One or more paragraphs (rendered in order). */
  answer: string[];
}

/**
 * Generic accordion for Q&A content — same visual language/interaction as
 * the homepage `Faq`, but takes its items as a prop so it can be reused
 * for page-specific FAQ content (e.g. the New Patient Evaluation page)
 * without touching the homepage's own FAQ data.
 */
export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-gray">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <Reveal key={item.question} delay={Math.min(i * 0.05, 0.25)}>
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              className="group flex w-full items-center justify-between gap-4 rounded-lg py-5 text-left transition-colors duration-200 hover:bg-sage/40"
            >
              <span className="flex items-center gap-3">
                <span
                  className={[
                    "font-mono text-xs transition-colors duration-200",
                    open ? "text-primary" : "text-primary/40 group-hover:text-primary/70",
                  ].join(" ")}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-base font-medium text-ink">{item.question}</span>
              </span>
              <motion.span
                animate={{ rotate: open ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage text-primary"
              >
                <Icon name="plus" className="h-4 w-4" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="space-y-3 pb-5 pl-8 text-sm leading-relaxed text-ink-soft">
                    {item.answer.map((p) => (
                      <p key={p.slice(0, 40)}>{p}</p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Reveal>
        );
      })}
    </div>
  );
}
