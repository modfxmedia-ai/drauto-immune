import Icon from "@/components/ui/Icon";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { TESTIMONIALS } from "@/content/home-content";
import Card from "./Card";
import Carousel from "./Carousel";
import SectionHeading from "./SectionHeading";
import { ACCENT_TEXT, SECTION_PADDING } from "./theme";

/**
 * Same testimonial content/functionality as the original homepage,
 * restyled as a plain light-background carousel with clear prev/next
 * controls and dot indicators (per the design brief) instead of an
 * auto-scrolling marquee. Cards are styled to read like familiar Google
 * review cards — initial-avatar + name + verified check, then a
 * star row with the relative time, then the quote — without
 * reproducing Google's own logo/branding (a plain check-mark icon stands
 * in for their verified badge; stars use the brand primary green rather
 * than a separate accent hue).
 */
export default function Testimonials2() {
  const slides = TESTIMONIALS.items.map((item) => (
    <Card key={item.author} className="h-full">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-base font-semibold text-primary">
          {item.author.charAt(0)}
        </span>
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-sm font-semibold text-ink">
            <span className="truncate">{item.author}</span>
            {item.verified && (
              <span title="Verified review" className="shrink-0">
                <Icon name="check-circle" className="h-4 w-4 text-primary" />
              </span>
            )}
          </p>
          <p className="truncate text-xs text-ink-soft">{item.condition}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <div className={`flex gap-0.5 ${ACCENT_TEXT}`} aria-label={`${item.rating} out of 5 stars`}>
          {Array.from({ length: item.rating }).map((_, i) => (
            <Icon key={i} name="star" className="h-3.5 w-3.5" />
          ))}
        </div>
        <span className="text-xs text-ink-soft">{item.timeAgo}</span>
      </div>

      <p className="mt-3 text-base leading-relaxed text-ink-soft">{item.quote}</p>
    </Card>
  ));

  return (
    <section className={`${SECTION_PADDING} bg-sage/30`}>
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Testimonials" heading={TESTIMONIALS.heading} intro={TESTIMONIALS.intro} />
          <Button href={TESTIMONIALS.cta.href} variant="secondary" className="shrink-0">
            {TESTIMONIALS.cta.label}
          </Button>
        </div>

        <div className="mt-14">
          <Carousel ariaLabel="Patient testimonials" slides={slides} itemClassName="w-[85vw] max-w-sm sm:w-96" />
        </div>
      </Container>
    </section>
  );
}
