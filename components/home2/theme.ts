/**
 * Home2 design-system tokens — an isolated, stricter visual language layered
 * on top of the site's existing brand colors (primary green / white / ink),
 * built specifically for the `/home-2` clean-redesign variant.
 *
 * Rules this file exists to enforce (see the design brief):
 * - ONE type family everywhere (the site's existing Epilogue sans, already
 *   the global `font-sans` — no accent-serif/italic face is imported here).
 * - A strict, small type scale (h1/h2/h3/body/caption) — every Home2
 *   component should reference these instead of ad hoc text-size utilities.
 * - Exactly one soft "accent" color, used sparingly (one highlighted word
 *   or icon per section) — everything else stays within primary green /
 *   white / neutral gray.
 * - One consistent section rhythm (`SECTION_PADDING`) and the existing
 *   `Container` max-width for every section.
 */

export const TEXT = {
  h1: "text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold leading-[1.05] tracking-tight text-ink",
  h2: "text-3xl sm:text-4xl font-semibold leading-tight tracking-tight text-ink",
  h3: "text-xl sm:text-2xl font-semibold leading-snug text-ink",
  body: "text-base leading-relaxed text-ink-soft",
  bodyLg: "text-lg leading-relaxed text-ink-soft",
  caption: "text-sm font-semibold uppercase tracking-[0.08em] text-ink-soft",
} as const;

/** Shared vertical rhythm for every Home2 section. */
export const SECTION_PADDING = "py-20 md:py-28";

/** Single soft accent color, used sparingly for one highlighted word or
 * icon per section — never as a background fill and never repeated more
 * than once per section. Reuses the site's existing brand primary green
 * (no separate accent hue) to keep the palette to primary green / white /
 * neutral gray. */
export const ACCENT_HEX = "#3f806a";
export const ACCENT_TEXT = "text-primary";
export const ACCENT_BG_SOFT = "bg-primary/10";
