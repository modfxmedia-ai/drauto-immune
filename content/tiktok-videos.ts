export interface TikTokVideo {
  /** Numeric TikTok video ID, used to build the `tiktok.com/embed/v2/{id}` iframe src. */
  id: string;
  caption: string;
  /** The blog post this clip was originally embedded in — lets viewers read the full article. */
  href: string;
}

/**
 * TikTok clips already referenced inside existing blog posts (see
 * `content/data/*.json`), surfaced here as a standalone homepage carousel.
 * Video IDs were resolved from the live site's `@drautoimmune` posts,
 * including two `tiktok.com/t/...` short links that had to be resolved via
 * redirect to their canonical `@user/video/{id}` form.
 */
export const TIKTOK_VIDEOS: TikTokVideo[] = [
  {
    id: "7553776788875349278",
    caption: "6 blood tests that could reveal hidden inflammation",
    href: "/are-you-testing-your-inflammatory-markers-heres-why-you-should-be/",
  },
  {
    id: "7623105603191295263",
    caption: "Dr. Ian breaks down the truth about TSH",
    href: "/autoimmune-thyroid-symptoms-when-tsh-looks-normal/",
  },
  {
    id: "7600845609846705438",
    caption: "If my ANA is positive, do I have an autoimmune disease?",
    href: "/if-my-ana-is-positive-do-i-have-an-autoimmune-disease/",
  },
  {
    id: "7595269761894812959",
    caption: "How leaky gut drives autoimmune symptoms",
    href: "/the-hidden-link-between-gut-health-and-autoimmune-disease/",
  },
  {
    id: "7606098138939608350",
    caption: "Why conventional POTS care often falls short",
    href: "/why-your-pots-symptoms-still-dont-make-sense-and-what-your-body-may-be-trying-to-tell-you/",
  },
];
