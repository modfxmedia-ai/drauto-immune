"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "motion/react";
import { NAV_LINKS, DISCOVERY_CALL_HREF } from "@/components/layout/nav-links";
import Button from "./Button";
import Icon from "./Icon";

const CONDITION_LINKS = NAV_LINKS.find((item) => item.label === "Conditions")?.children ?? [];

/**
 * Sticky right-rail sidebar for condition pages, modeled on
 * renoregen.com's bordered-card aside pattern: a dark "Get Started" quick
 * CTA card up top, followed by a bordered white card listing every
 * condition in the exact same order/hrefs as the header's Conditions
 * mega-menu (single source of truth: `nav-links.ts`), so internal
 * cross-linking matches the live site's own structure. The active
 * condition gets a solid sage-green pill; hovering a different link
 * slides a soft highlight pill between items via a shared `layoutId`
 * (same FLIP technique used by the header's own hover indicator).
 */
export default function ConditionSidebar() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <aside className="space-y-6 lg:sticky lg:top-28 lg:w-72 lg:shrink-0">
      <div className="rounded-card bg-ink p-6 text-white shadow-card">
        <span className="inline-flex items-center gap-1.5 font-mono text-xs font-medium uppercase tracking-[0.08em] text-white/60">
          <Icon name="phone-call" className="h-3.5 w-3.5" /> Get Started
        </span>
        <h3 className="mt-3 text-lg font-semibold text-white">Ready to feel better?</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/70">
          Book a free discovery call to see if our root-cause approach is right for you.
        </p>
        <Button href={DISCOVERY_CALL_HREF} variant="primary" size="sm" className="mt-4 w-full justify-center uppercase tracking-wide">
          Book your discovery call
        </Button>
      </div>

      <nav
        aria-label="Conditions we support"
        className="rounded-card border border-gray bg-white p-5 shadow-card"
      >
        <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.08em] text-ink-soft">
          Conditions We Support
        </p>
        <ul className="space-y-1">
          {CONDITION_LINKS.map((linkItem) => {
            const isActive = pathname === linkItem.href;
            return (
              <li key={linkItem.href} className="relative">
                <Link
                  href={linkItem.href}
                  onMouseEnter={() => setHovered(linkItem.href)}
                  onMouseLeave={() => setHovered(null)}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "group relative flex items-center gap-2 overflow-hidden rounded-md px-4 py-2.5 text-sm transition-colors",
                    isActive ? "font-semibold text-white" : "text-ink-soft hover:text-ink",
                  ].join(" ")}
                >
                  {isActive && (
                    <motion.span
                      layoutId="condition-sidebar-active"
                      aria-hidden="true"
                      className="absolute inset-0 rounded-md bg-primary"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  {!isActive && hovered === linkItem.href && (
                    <motion.span
                      layoutId="condition-sidebar-hover"
                      aria-hidden="true"
                      className="absolute inset-0 rounded-md bg-sage"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span
                    aria-hidden="true"
                    className={[
                      "relative h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-300",
                      isActive ? "scale-100 bg-white" : "scale-75 bg-primary/40 group-hover:scale-100 group-hover:bg-primary",
                    ].join(" ")}
                  />
                  <span className="relative flex-1 transition-transform duration-300 group-hover:translate-x-0.5">
                    {linkItem.label}
                  </span>
                  <Icon
                    name="arrow-right"
                    className={[
                      "relative h-3.5 w-3.5 shrink-0 transition-all duration-300",
                      isActive
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
                    ].join(" ")}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
