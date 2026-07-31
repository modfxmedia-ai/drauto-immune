import type { ElementType, ReactNode } from "react";

interface AccentProps {
  children: ReactNode;
  /** Renders as a differently-colored span; defaults to the brand green. */
  tone?: "primary" | "ink" | "cream" | "white";
  /**
   * Draw a hand-drawn-style underline stroke beneath the accent (matches
   * the Hero reference). Defaults to `true`. Pass `false` for headings
   * where the emphasis word wraps mid-heading and a stroke would look off.
   */
  stroke?: boolean;
  as?: ElementType;
}

const TONE_CLASSES: Record<NonNullable<AccentProps["tone"]>, string> = {
  primary: "text-primary",
  ink: "text-ink",
  cream: "text-cream",
  white: "text-white",
};

/**
 * Elegant serif accent for emphasis words inside a headline. The accented
 * phrase renders italic + serif in the tone color, with a subtle
 * hand-drawn SVG underline stroke inheriting that color for a warm,
 * editorial feel matching the Hero reference. Use sparingly — wrap only
 * the one or two words that should carry the emotional weight.
 *
 * @example
 * <h2>Where medical expertise meets <Accent>personalized healing</Accent></h2>
 */
export default function Accent({
  children,
  tone = "primary",
  stroke = true,
  as: Tag = "em",
}: AccentProps) {
  return (
    <Tag className={`relative accent-serif ${TONE_CLASSES[tone]}`}>
      {children}
      {stroke && (
        <svg
          aria-hidden="true"
          viewBox="0 0 300 12"
          preserveAspectRatio="none"
          className="pointer-events-none absolute -bottom-1 left-0 h-[0.35em] w-full opacity-70 sm:-bottom-2"
        >
          <path
            d="M2 8 C 60 2, 140 10, 220 4 S 296 8, 298 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )}
    </Tag>
  );
}
