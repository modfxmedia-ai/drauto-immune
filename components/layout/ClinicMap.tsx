"use client";

import { motion } from "motion/react";
import { CLINIC_LOCATION } from "./footer-links";

interface ClinicMapPanelProps {
  reduce?: boolean;
  className?: string;
}

/**
 * Reusable "find us" map panel — grayscale Google Maps embed of Boulder,
 * CO (the only location published on the live site), with a floating
 * pin-badge card that gently bobs on desktop (disabled when reduced
 * motion is preferred). Shared between the homepage `ContactBand` and the
 * dedicated Contact Us page so location is presented identically across
 * the site.
 */
export function ClinicMapPanel({ reduce = false, className = "" }: ClinicMapPanelProps) {
  return (
    <div
      className={`relative h-full min-h-[420px] w-full overflow-hidden rounded-card border border-gray bg-sage/30 shadow-card-hover ${className}`}
    >
      <iframe
        title="Dr. Autoimmune clinic location — Boulder, CO"
        // Centered on Boulder, CO by coordinates (not a `q=` place query) —
        // this keeps the embed a plain map with no native Google place
        // card / directions bubble, which used to collide with our own
        // floating "Find Us Here" pin card in the same top-left corner.
        src="https://maps.google.com/maps?ll=40.0150,-105.2705&z=12&output=embed"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        // Grayscale + slight brightness tuning so the map reads inside the
        // brand palette rather than competing with it — reset on hover.
        className="h-full min-h-[420px] w-full border-0 grayscale-[0.4] transition-[filter] duration-500 hover:grayscale-0"
      />

      {/* Floating pin card — bobs gently on desktop */}
      <motion.div
        className="pointer-events-auto absolute left-6 top-6 flex max-w-[240px] items-start gap-3 rounded-2xl bg-white p-4 shadow-card-hover"
        animate={reduce ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
          <MapPinIcon className="h-5 w-5" />
        </span>
        <div>
          <p className="font-mono text-[0.6rem] font-medium uppercase tracking-[0.14em] text-primary">
            Find Us Here
          </p>
          <p className="mt-1 text-sm font-medium leading-tight text-ink">Dr. Autoimmune</p>
          <p className="mt-0.5 text-xs leading-tight text-ink-soft">{CLINIC_LOCATION} · Nationwide remote care</p>
        </div>
      </motion.div>
    </div>
  );
}

export function MapPinIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="9.5" r="2.3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function MailIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
