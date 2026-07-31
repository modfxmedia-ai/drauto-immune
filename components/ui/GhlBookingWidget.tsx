"use client";

import Script from "next/script";

interface GhlBookingWidgetProps {
  /** The exact LeadConnector/GoHighLevel widget iframe `src`, cloned as-is from the live embed. */
  src: string;
  title: string;
  /** Reserved height (px) before the widget's own resizer script measures its content. */
  minHeight?: number;
}

/**
 * Reproduces the exact GoHighLevel / LeadConnector booking widget embed
 * used live on drautoimmune.com (`<iframe src="...">` + the
 * `form_embed.js` auto-resize script) without altering the embed URL or
 * behavior in any way. Only the surrounding container is restyled to the
 * brand palette — the widget's own internal UI is entirely controlled by
 * GoHighLevel and isn't touched.
 */
export default function GhlBookingWidget({ src, title, minHeight = 720 }: GhlBookingWidgetProps) {
  return (
    <div className="relative">
      <iframe
        src={src}
        title={title}
        scrolling="no"
        style={{ width: "100%", border: "none", overflow: "hidden", minHeight }}
        className="rounded-2xl"
      />
      <Script src="https://link.drautoimmune.com/js/form_embed.js" strategy="afterInteractive" />
      <p className="mt-4 text-center text-xs text-ink-soft">
        Trouble loading?{" "}
        <a href={src} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline">
          Open the scheduler in a new tab →
        </a>
      </p>
    </div>
  );
}
