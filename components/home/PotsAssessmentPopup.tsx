"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Modal from "@/components/ui/Modal";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Accent from "@/components/ui/Accent";

const POTS_OPT_IN_HREF = "https://pots.drautoimmune.com/opt-in";
const SESSION_KEY = "pots-assessment-popup-shown";
const SHOW_DELAY_MS = 1800;

/**
 * Homepage lead-magnet popup for the "POTS Root Cause Assessment" free
 * guide — a from-scratch redesign of the original flyer graphic (brand
 * header + headline + CTA + photo), rebuilt with the site's own
 * typography/color system rather than embedding the flat image. Shows
 * once per browser session, a beat after the homepage finishes loading,
 * so it doesn't fight the hero section for attention on first paint.
 */
export default function PotsAssessmentPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const timer = window.setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem(SESSION_KEY, "1");
    }, SHOW_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <Modal open={open} onClose={() => setOpen(false)} title="POTS Root Cause Assessment" className="max-w-3xl">
      <div className="grid sm:grid-cols-2">
        <div className="flex flex-col justify-center px-8 py-10 sm:px-9 sm:py-11">
          <Badge className="w-fit">Free Root Cause Guide</Badge>

          <h2 className="mt-4 text-2xl sm:text-3xl">
            POTS Root Cause <Accent>Assessment</Accent>
          </h2>
          <p className="mt-1 accent-serif text-lg text-primary-active">
            (Postural Orthostatic Tachycardia Syndrome)
          </p>

          <Button
            href={POTS_OPT_IN_HREF}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="md"
            className="mt-6 w-fit"
            onClick={() => setOpen(false)}
          >
            Get The Free Guide Now
          </Button>

          <h3 className="mt-7 text-lg font-semibold text-ink">
            Why Symptoms Persist and Why Conventional Care Often Stops at the Surface
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            A structured assessment for individuals diagnosed with POTS or struggling with dizziness, racing heart,
            fatigue, and nervous system instability.
          </p>
        </div>

        <div className="relative order-first hidden min-h-[280px] sm:order-last sm:block">
          <Image
            src="/images/marketing/pots-assessment-woman.png"
            alt="Woman experiencing POTS symptoms, resting her head on her hand"
            fill
            sizes="(min-width: 640px) 50vw, 0px"
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="bg-primary-active px-6 py-3 text-center text-xs font-medium tracking-[0.02em] text-white sm:text-sm">
        Root Cause Focused. Immune Centered. Systems Based.
      </div>
    </Modal>
  );
}
