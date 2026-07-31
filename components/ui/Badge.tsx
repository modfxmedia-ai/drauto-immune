import type { ReactNode } from "react";

type Tone = "primary" | "neutral";

interface BadgeProps {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}

const TONE_CLASSES: Record<Tone, string> = {
  primary: "bg-sage text-primary-active",
  neutral: "bg-gray text-ink-soft",
};

/**
 * Small uppercase tag pill — used for category labels, condition tags, or
 * eyebrow text above a headline. Set in the mono label face for a precise,
 * clinical-notation feel.
 */
export default function Badge({ children, tone = "primary", className = "" }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-pill px-3 py-1",
        "font-mono text-xs font-medium uppercase tracking-[0.08em]",
        TONE_CLASSES[tone],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  );
}
