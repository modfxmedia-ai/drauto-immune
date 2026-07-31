import type { ReactNode } from "react";

type Bg = "white" | "sage" | "gray" | "cream-wash" | "sage-mesh" | "ink" | "primary";

const BG_CLASSES: Record<Bg, string> = {
  white: "bg-white",
  sage: "bg-sage",
  gray: "bg-gray",
  // Soft warm ivory wash — very light cream tint. Gives sections a
  // "warm document" feel distinct from the cooler sage.
  "cream-wash": "bg-[color-mix(in_srgb,var(--cream)_18%,var(--white))]",
  // Sage with a subtle mesh — layered radial gradients on top of the sage
  // fill. Adds visual depth without competing with content.
  "sage-mesh":
    "bg-sage [background-image:radial-gradient(circle_at_20%_20%,rgba(63,128,106,0.10)_0%,transparent_50%),radial-gradient(circle_at_80%_60%,rgba(63,128,106,0.06)_0%,transparent_55%)]",
  // Deep near-black for high-contrast dark sections.
  ink: "bg-ink text-white",
  // Brand primary green — for dark hero-style bands (products, CTAs).
  primary: "bg-primary text-white",
};

/**
 * Generous vertical rhythm wrapper for page sections — the whitespace that
 * carries most of the "elegant, uncluttered" feel of the layout.
 */
export default function Section({
  children,
  bg = "white",
  className = "",
  id,
}: {
  children: ReactNode;
  bg?: Bg;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={["py-section-2xl md:py-section-3xl", BG_CLASSES[bg], className].filter(Boolean).join(" ")}
    >
      {children}
    </section>
  );
}
