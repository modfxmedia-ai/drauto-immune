import { DM_Serif_Display, DM_Mono, Epilogue } from "next/font/google";

/**
 * Body / UI face. Quiet, geometric, does the heavy lifting so the serif
 * accent face can carry emotional emphasis without competing for attention.
 */
export const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-body",
});

/**
 * Headline accent face. Used ONLY for emphasis words/phrases inside
 * headlines (see components/ui/Accent.tsx) — never for body copy or UI.
 */
export const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display-serif",
});

/**
 * Label / badge / meta face. Small-scale only — tag pills, eyebrow labels,
 * step counters.
 */
export const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-label-mono",
});
