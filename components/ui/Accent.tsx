import type { ElementType, ReactNode } from "react";

interface AccentProps {
  children: ReactNode;
  /** Renders as a differently-colored span; defaults to the brand green. */
  tone?: "primary" | "ink" | "sage" | "white";
  as?: ElementType;
}

const TONE_CLASSES: Record<NonNullable<AccentProps["tone"]>, string> = {
  primary: "text-primary",
  ink: "text-ink",
  sage: "text-sage",
  white: "text-white",
};

/**
 * Elegant serif accent for emphasis words inside a headline. The accented
 * phrase renders italic + serif in the tone color. Use sparingly — wrap
 * only the one or two words that should carry the emotional weight.
 *
 * @example
 * <h2>Where medical expertise meets <Accent>personalized healing</Accent></h2>
 */
export default function Accent({ children, tone = "primary", as: Tag = "em" }: AccentProps) {
  return <Tag className={`accent-serif ${TONE_CLASSES[tone]}`}>{children}</Tag>;
}
