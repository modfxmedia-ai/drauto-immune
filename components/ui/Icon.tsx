export type IconName =
  | "leaf"
  | "heart-pulse"
  | "compass"
  | "shield"
  | "sparkles"
  | "clipboard"
  | "phone-call"
  | "stethoscope"
  | "users"
  | "trending-up"
  | "globe"
  | "target"
  | "quote"
  | "star"
  | "arrow-right"
  | "check-circle"
  | "clock"
  | "plus"
  | "chevron-down";

const PATHS: Record<IconName, React.ReactNode> = {
  leaf: (
    <path d="M20 4c-8 0-14 6-14 14 0 1 .1 1.7.2 2C15 19 20 14 20 4Zm-14 14C6 10 12 4 20 4c0 10-6 16-14 16Z" />
  ),
  "heart-pulse": (
    <path d="M12 20.5S3 14.8 3 8.9A4.4 4.4 0 0 1 12 7a4.4 4.4 0 0 1 9 1.9c0 5.9-9 11.6-9 11.6ZM7 12h2l1.5-2.5L12 14l1.5-3H16" />
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M14.8 9.2 13 13l-3.8 1.8L11 11l3.8-1.8Z" />
    </>
  ),
  shield: <path d="M12 3 4 6v6c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V6l-8-3Z" />,
  sparkles: (
    <path d="M12 3l1.2 3.6L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.4L12 3ZM5 15l.7 2.1L8 18l-2.3.8L5 21l-.7-2.2L2 18l2.3-.9L5 15Zm14-1 .8 2.4L22 17l-2.2.9L19 20l-.8-2.1L16 17l2.2-.6L19 14Z" />
  ),
  clipboard: (
    <>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1M8 11h8M8 15h8M8 19h5" />
    </>
  ),
  "phone-call": (
    <path d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 9 9 0 0 0 2.8.45 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 2 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 9 9 0 0 0 .45 2.8 1 1 0 0 1-.25 1z" />
  ),
  stethoscope: (
    <path d="M6 3v6a4 4 0 0 0 8 0V3M10 13v2a6 6 0 0 0 12 0v-1.5M18 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
  ),
  users: (
    <path d="M16 21v-1.5a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4V21M9.5 11.5a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5ZM19 21v-1.5a3.5 3.5 0 0 0-2.5-3.35M15 5.4a3.25 3.25 0 0 1 0 6.2" />
  ),
  "trending-up": <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.7 3.8 6 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-6-3.8-9s1.3-6.3 3.8-9Z" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.8" fill="currentColor" stroke="none" />
    </>
  ),
  quote: (
    <path d="M9.5 7C6.5 8.2 5 10.4 5 13c0 2 1.3 3.3 3 3.3S11 15 11 13.3c0-1.5-1-2.5-2.3-2.7C9 9.4 9.9 8.3 11.5 7.6L9.5 7Zm9 0c-3 1.2-4.5 3.4-4.5 6 0 2 1.3 3.3 3 3.3S20 15 20 13.3c0-1.5-1-2.5-2.3-2.7c.3-1.2 1.2-2.3 2.8-3L18.5 7Z" />
  ),
  star: <path d="M12 3l2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6-4.4-4.2 6-.8L12 3Z" />,
  "arrow-right": <path d="M4 12h16M14 6l6 6-6 6" />,
  "check-circle": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.5 11 15l5-6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  "chevron-down": <path d="M5 8.5 12 15.5 19 8.5" />,
};

// These icons are authored as filled silhouettes (multiple overlapping
// closed contours in one path) rather than open stroke paths — rendering
// them with stroke-only would draw each contour's outline separately and
// look like broken scribbles, so they must always render filled.
const FILLED: Partial<Record<IconName, boolean>> = {
  star: true,
  leaf: true,
  sparkles: true,
  quote: true,
  shield: true,
};

export default function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  const filled = FILLED[name];
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {PATHS[name]}
    </svg>
  );
}
