"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Icon from "./Icon";
import Button from "./Button";
import { DISCOVERY_CALL_HREF } from "@/components/layout/nav-links";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Small sticky CTA bar that fades in once the visitor scrolls past the
 * hero band, consistent across every condition page. Reinforces the
 * booking action without competing with the in-page CTA blocks.
 */
export default function StickyDiscoveryCTA() {
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-primary/20 bg-white/95 px-4 py-3 shadow-card backdrop-blur-sm sm:bottom-5 sm:left-1/2 sm:right-auto sm:w-[min(92vw,26rem)] sm:-translate-x-1/2 sm:rounded-pill sm:border sm:px-5 sm:py-2.5"
        >
          <div className="flex items-center justify-between gap-3 sm:justify-center">
            <p className="flex items-center gap-2 text-sm font-medium text-ink">
              <Icon name="phone-call" className="h-4 w-4 shrink-0 text-primary" />
              <span className="hidden sm:inline">Ready to talk?</span>
              <span className="sm:hidden">Discovery call</span>
            </p>
            <Button href={DISCOVERY_CALL_HREF} variant="primary" size="sm" className="uppercase tracking-wide">
              Book your Discovery Call
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
