"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Accent from "@/components/ui/Accent";
import Badge from "@/components/ui/Badge";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import Section from "@/components/ui/Section";
import { FAQ } from "@/content/home-content";
import SectionAmbient from "./SectionAmbient";
import Reveal from "./Reveal";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section className="relative overflow-hidden">
      <SectionAmbient tone="sage" variant="orbs" />
      <Container className="relative">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <Badge className="mb-4">Common Questions</Badge>
            <h2>
              Frequently <Accent>Asked Questions</Accent>
            </h2>
            <p className="mt-4 max-w-sm text-ink-soft">
              Straightforward answers about our root-cause, functional medicine approach.
            </p>
          </Reveal>

          <div className="divide-y divide-gray">
            {FAQ.items.map((item, i) => {
              const open = openIndex === i;
              return (
                <Reveal key={item.question} delay={Math.min(i * 0.06, 0.24)}>
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
                        <div className="pb-5 pl-8 text-sm leading-relaxed text-ink-soft">
                          <p>{item.answer}</p>
                          {item.list && (
                            <ul className="mt-3 flex flex-col gap-1.5">
                              {item.list.map((li) => (
                                <li key={li} className="flex gap-2">
                                  <Icon name="check-circle" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                  <span>{li}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
