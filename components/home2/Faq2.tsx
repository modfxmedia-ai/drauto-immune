"use client";

import { useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import { FAQ } from "@/content/home-content";
import SectionHeading from "./SectionHeading";
import { SECTION_PADDING, TEXT } from "./theme";

/**
 * FAQ accordion matching the real `FAQ.items` data shape (`answer: string`
 * plus an optional `list: string[]`) — a Home2-local component since the
 * shared `FaqAccordion` expects `answer: string[]`, a different shape.
 * Two-column layout: accordion on the left, a supporting consultation
 * photo on the right (hidden on mobile, where the accordion runs full
 * width).
 */
export default function Faq2() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className={`${SECTION_PADDING} bg-white`}>
      <Container>
        <SectionHeading eyebrow="FAQ" heading={FAQ.heading} />

        <div className="mt-14 grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div className="divide-y divide-gray rounded-2xl border border-gray bg-white px-6 sm:px-8">
            {FAQ.items.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={item.question}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-6 text-left transition-colors hover:text-primary"
                  >
                    <span className={`${TEXT.h3} text-lg`}>{item.question}</span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
                    >
                      <Icon name="plus" className="h-4 w-4" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pb-6">
                      <p className={TEXT.body}>{item.answer}</p>
                      {item.list && (
                        <ul className="mt-3 space-y-2">
                          {item.list.map((li) => (
                            <li key={li} className="flex items-start gap-2 text-sm text-ink-soft">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                              {li}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="relative hidden aspect-[4/5] w-full overflow-hidden rounded-2xl border border-gray lg:block">
            <Image
              src="/images/approach/main.webp"
              alt="Functional medicine consultation between a doctor and a patient"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
