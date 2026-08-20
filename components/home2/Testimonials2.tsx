import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { TESTIMONIALS } from "@/content/home-content";
import Card from "./Card";
import Carousel from "./Carousel";
import SectionHeading from "./SectionHeading";
import { SECTION_PADDING } from "./theme";

type Item = (typeof TESTIMONIALS.items)[number];

/**
 * Same testimonial content/carousel interaction as before (prev/next +
 * dot indicators, per the Home2 design brief), but the individual review
 * cards now match the real Google-review look used on the main homepage's
 * `Testimonials.tsx`: mono-initials avatar, name + verified checkmark,
 * condition + relative time, a genuine 4-color Google "G" mark, and
 * gold (#fbbc04) filled stars — rendered through the shared Home2 `Card`
 * component so it still belongs to the one reusable card family.
 */
export default function Testimonials2() {
  const slides = TESTIMONIALS.items.map((item) => <ReviewCard key={item.author} item={item} />);

  return (
    <section className={`${SECTION_PADDING} bg-sage/30`}>
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Patient Reviews" heading={TESTIMONIALS.heading} intro={TESTIMONIALS.intro} />
          <Button href={TESTIMONIALS.cta.href} variant="secondary" className="shrink-0 uppercase tracking-wide">
            Book your Discovery Call
          </Button>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-gray bg-white px-4 py-2 shadow-sm">
            <GoogleGlyph className="h-4 w-4" />
            <span className="text-sm font-semibold text-ink">4.9</span>
            <StarRow rating={5} />
            <span className="text-xs text-ink-soft">{TESTIMONIALS.items.length}+ reviews</span>
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gray bg-white px-3 py-1.5 text-xs font-medium text-ink-soft shadow-sm">
            <VerifiedGlyph className="h-3.5 w-3.5 text-primary" />
            Verified patients
          </span>
        </div>

        <div className="mt-10">
          <Carousel ariaLabel="Patient testimonials" slides={slides} itemClassName="w-[85vw] max-w-sm sm:w-96" />
        </div>

        <p className="mt-10 text-center text-base italic text-ink-soft">{TESTIMONIALS.cta.label}</p>
      </Container>
    </section>
  );
}

function ReviewCard({ item }: { item: Item }) {
  const initials = item.author
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card className="h-full">
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/12 font-mono text-sm font-semibold text-primary">
          {initials}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <p className="truncate text-sm font-semibold text-ink">{item.author}</p>
            {item.verified && (
              <span aria-label="Verified review" title="Verified review">
                <VerifiedGlyph className="h-3.5 w-3.5 text-primary" />
              </span>
            )}
          </div>
          <p className="text-xs text-ink-soft">
            <span className="font-medium text-ink-soft">{item.condition}</span> · {item.timeAgo}
          </p>
        </div>
        <GoogleGlyph className="h-4 w-4 shrink-0 opacity-60" />
      </div>

      <StarRow rating={item.rating} />

      <p className="text-base leading-relaxed text-ink-soft">{item.quote}</p>
    </Card>
  );
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <StarGlyph key={i} filled={i < rating} className={`h-4 w-4 ${i < rating ? "text-[#fbbc04]" : "text-gray"}`} />
      ))}
    </div>
  );
}

function StarGlyph({ filled, className = "" }: { filled: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        d="M12 3l2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6-4.4-4.2 6-.8L12 3Z"
        fill={filled ? "currentColor" : "none"}
        stroke={filled ? "none" : "currentColor"}
        strokeWidth="1.5"
      />
    </svg>
  );
}

/** Real 4-color Google "G" glyph — signals the review source, same as home1. */
function GoogleGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.4 2.7 30 0 24 0 14.9 0 7 5.4 3.1 13.3l7.9 6.1C13 13.6 18 9.5 24 9.5Z" />
      <path fill="#4285F4" d="M46.5 24.6c0-1.6-.1-3.1-.4-4.6H24v9h12.7c-.6 3-2.3 5.4-4.9 7.1l7.6 5.9c4.4-4.1 7.1-10.1 7.1-17.4Z" />
      <path fill="#FBBC05" d="M11 28.6c-.5-1.4-.8-2.9-.8-4.6s.3-3.2.8-4.6l-7.9-6.1C1.1 16.6 0 20.2 0 24s1.1 7.4 3.1 10.7L11 28.6Z" />
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.8 2.3-8.3 2.3-6 0-11.1-4.1-13-9.6l-7.9 6.1C7 42.6 14.9 48 24 48Z" />
    </svg>
  );
}

/** Small checkmark badge shown next to a verified reviewer's name. */
function VerifiedGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        d="M12 2 14.5 5l3.7-.4 1 3.6L21.8 10 20 13l1.8 3-2.6 2.7-3.7-.4L14.5 21 12 18l-2.5 3-2-2.7-3.7.4L1.6 16 3.5 13 1.6 10l2.6-2.8L4 3.6 7.7 4l1.8-3L12 3.6Z"
        fill="currentColor"
      />
      <path d="M8.5 12.5 11 15l5-6" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
