import Icon from "@/components/ui/Icon";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { CONSULTATION } from "@/content/home-content";
import SectionHeading from "./SectionHeading";
import { SECTION_PADDING } from "./theme";

/**
 * Closing consultation band — same content as the original homepage's
 * consultation section (`CONSULTATION`), restyled with no dark gradient
 * background. Office hours/phone/location now live solely in `FindUs2`
 * (the dedicated map section) instead of being repeated here.
 */
export default function ContactBand2() {
  return (
    <section className={`${SECTION_PADDING} bg-sage/30`}>
      <Container>
        <SectionHeading eyebrow="Get Started" heading={CONSULTATION.heading} intro={CONSULTATION.intro} align="center" />

        <ul className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
          {CONSULTATION.items.map((item) => (
            <li key={item.title} className="flex gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                <Icon name="check-circle" className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-ink">{item.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex justify-center">
          <Button href={CONSULTATION.cta.href} variant="primary" size="lg">
            {CONSULTATION.cta.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}

