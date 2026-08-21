import { Open_Sans } from "next/font/google";

/**
 * Single site-wide face — headings, body, labels, everything. Matches the
 * live site (drautoimmune.com), which uses Open Sans everywhere via its
 * Elementor global kit (no separate serif/mono accents).
 */
export const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-body",
});
