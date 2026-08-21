import type { ReactNode } from "react";
import { ACCENT_TEXT, TEXT } from "./theme";

interface SectionHeadingProps {
  eyebrow: string;
  heading: ReactNode;
  /** A contiguous substring of the plain-text heading to render in the
   * single sparing accent color (bold weight, no italic/script font). */
  accent?: string;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
  /** Override the block's width cap (default `max-w-2xl`) for sections
   * whose intro copy should fill more of a wide container. */
  maxWidth?: string;
}

/**
 * The one heading pattern reused by every Home2 section: eyebrow caption →
 * H2 (with at most one accent-colored word/phrase) → optional intro
 * paragraph. Keeps the type scale and accent-color usage consistent and
 * "sparing" (never more than one accent word per section) across the page.
 */
export default function SectionHeading({
  eyebrow,
  heading,
  accent,
  intro,
  align = "left",
  className = "",
  maxWidth = "max-w-2xl",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  let headingNode: ReactNode = heading;
  if (accent && typeof heading === "string" && heading.includes(accent)) {
    const [before, after] = heading.split(accent);
    headingNode = (
      <>
        {before}
        <span className={`${ACCENT_TEXT} font-semibold`}>{accent}</span>
        {after}
      </>
    );
  }

  return (
    <div className={`${maxWidth} ${alignClass} ${className}`}>
      <span
        aria-hidden="true"
        className={`mb-3 block h-1 w-10 rounded-full bg-primary ${align === "center" ? "mx-auto" : ""}`}
      />
      <p className={TEXT.caption}>{eyebrow}</p>
      <h2 className={`mt-3 ${TEXT.h2}`}>{headingNode}</h2>
      {intro && <p className={`mt-5 ${TEXT.body}`}>{intro}</p>}
    </div>
  );
}
