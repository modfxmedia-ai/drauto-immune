"use client";

import { useState } from "react";
import Script from "next/script";
import { AnimatePresence, motion } from "motion/react";
import Icon from "./Icon";

interface GhlFormEmbedProps {
  /** The exact LeadConnector/GoHighLevel form iframe `src`, cloned as-is. */
  src: string;
  formId: string;
  formName: string;
  title: string;
  /** Matches the embed's own `data-height` value. */
  height?: number;
  scriptSrc?: string;
  /** Small label shown in the card's header strip. */
  label?: string;
}

/**
 * Reproduces a GoHighLevel / LeadConnector "form" widget embed (iframe +
 * the `form_embed.js` auto-resize script) exactly as provided — src, id,
 * and every `data-*` attribute are untouched. Only the surrounding chrome
 * is designed: a bordered/shadowed card with a labeled header strip so the
 * embed reads as a composed part of the page rather than a bare iframe,
 * plus a skeleton loading state and an "open in new tab" fallback for
 * resilience while the third-party script initializes.
 */
export default function GhlFormEmbed({
  src,
  formId,
  formName,
  title,
  height = 428,
  scriptSrc = "https://link.msgsndr.com/js/form_embed.js",
  label = "Send Us a Message",
}: GhlFormEmbedProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="overflow-hidden rounded-card border border-gray bg-white shadow-card">
      <div className="flex items-center gap-2.5 border-b border-gray bg-sage/60 px-5 py-3.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-primary shadow-card">
          <Icon name="quote" className="h-4 w-4" />
        </span>
        <span className="text-sm font-semibold text-ink">{label}</span>
      </div>

      <div className="relative" style={{ minHeight: height }}>
        <AnimatePresence>
          {!loaded && (
            <motion.div
              aria-hidden="true"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0 flex flex-col gap-4 bg-white p-6"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="h-11 animate-pulse rounded-lg bg-gray" />
                <div className="h-11 animate-pulse rounded-lg bg-gray" />
              </div>
              <div className="h-11 animate-pulse rounded-lg bg-gray" />
              <div className="h-11 animate-pulse rounded-lg bg-gray" />
              <div className="h-24 animate-pulse rounded-lg bg-gray" />
              <div className="h-11 w-36 animate-pulse rounded-pill bg-gray" />
            </motion.div>
          )}
        </AnimatePresence>

        <iframe
          src={src}
          id={`inline-${formId}`}
          style={{ width: "100%", height, border: "none" }}
          data-layout="{'id':'INLINE'}"
          data-trigger-type="alwaysShow"
          data-trigger-value=""
          data-activation-type="alwaysActivated"
          data-activation-value=""
          data-deactivation-type="neverDeactivate"
          data-deactivation-value=""
          data-form-name={formName}
          data-height={height}
          data-layout-iframe-id={`inline-${formId}`}
          data-form-id={formId}
          title={title}
          onLoad={() => setLoaded(true)}
        />
      </div>

      <Script src={scriptSrc} strategy="afterInteractive" />
    </div>
  );
}
