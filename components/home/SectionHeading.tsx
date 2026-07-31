import Accent from "@/components/ui/Accent";
import Badge from "@/components/ui/Badge";
import Reveal from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  heading: string;
  /** Word(s) within the heading to render in the serif accent face. */
  accent?: string;
  intro?: string;
  align?: "center" | "left";
  className?: string;
}

function renderHeading(heading: string, accent?: string) {
  if (!accent) return heading;
  const idx = heading.indexOf(accent);
  if (idx === -1) return heading;
  return (
    <>
      {heading.slice(0, idx)}
      <Accent>{accent}</Accent>
      {heading.slice(idx + accent.length)}
    </>
  );
}

export default function SectionHeading({
  eyebrow,
  heading,
  accent,
  intro,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  return (
    <Reveal
      className={[
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-xl text-left",
        className,
      ].join(" ")}
    >
      {eyebrow && (
        <Badge className="mb-4 inline-flex">
          <Icon />
          {eyebrow}
        </Badge>
      )}
      <h2>{renderHeading(heading, accent)}</h2>
      {intro && <p className="mt-4 text-lg text-ink-soft">{intro}</p>}
    </Reveal>
  );
}

function Icon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="mr-1.5 h-3 w-3">
      <path d="M12 3l1.2 3.6L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.4L12 3ZM5 15l.7 2.1L8 18l-2.3.8L5 21l-.7-2.2L2 18l2.3-.9L5 15Zm14-1 .8 2.4L22 17l-2.2.9L19 20l-.8-2.1L16 17l2.2-.6L19 14Z" />
    </svg>
  );
}
