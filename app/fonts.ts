import { Epilogue } from "next/font/google";

/**
 * Single site-wide face — headings, body, labels, everything. Matches the
 * live site's one-typeface consistency (no separate serif/mono accents).
 */
export const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-body",
});
