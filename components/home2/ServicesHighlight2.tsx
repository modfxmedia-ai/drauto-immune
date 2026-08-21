import Link from "next/link";
import Icon from "@/components/ui/Icon";
import Container from "@/components/ui/Container";
import { SERVICES } from "@/content/home-content";
import Card from "./Card";
import SectionHeading from "./SectionHeading";
import { SECTION_PADDING } from "./theme";

/**
 * The two service highlight blocks called out in the design brief —
 * "Wellness Services" and "Conditions We Support" — pulled by title from
 * the same `SERVICES.cards` data source used on the original homepage
 * carousel, rendered here as two large feature cards through the shared
 * `Card` component. The remaining catalog (all 14 supported conditions)
 * is listed below as a compact grid so the full `SERVICES.cards` copy is
 * present here too, just laid out differently than the home1 carousel.
 */
export default function ServicesHighlight2() {
  const wellness = SERVICES.cards.find((c) => c.title === "Wellness Services")!;
  const conditions = SERVICES.cards.find((c) => c.title === "Conditions We Support")!;
  const highlights = [wellness, conditions];
  const rest = SERVICES.cards.filter((c) => c !== wellness && c !== conditions);

  return (
    <section className={`${SECTION_PADDING} bg-white`}>
      <Container>
        <SectionHeading eyebrow="What We Offer" heading={SERVICES.heading} accent="Wellness Services" intro={SERVICES.intro} maxWidth="max-w-3xl" />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {highlights.map((card) => (
            <Card key={card.title} href={card.href} image={{ src: card.image, alt: card.title }} imageAspect="aspect-[16/10]">
              <h3 className="text-xl font-extrabold text-ink sm:text-2xl">{card.title}</h3>
              <p className="text-base leading-relaxed text-ink-soft">{card.description}</p>
              <span className="mt-auto flex items-center gap-2 pt-2 text-sm font-semibold text-primary">
                Learn more
                <Icon name="arrow-right" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Card>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 border-t border-gray pt-10 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((card) => (
            <Card key={card.title} href={card.href}>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon name={card.category === "Service" ? "clipboard" : "heart-pulse"} className="h-5 w-5" />
              </span>
              <h4 className="text-base font-extrabold text-ink">{card.title}</h4>
              <p className="text-sm leading-relaxed text-ink-soft">{card.description}</p>
              <span className="mt-auto flex items-center gap-1.5 pt-1 text-sm font-semibold text-primary">
                Learn more
                <Icon name="arrow-right" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Card>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/services/"
            className="group inline-flex shrink-0 items-center gap-1.5 rounded-pill border border-primary/30 bg-white px-5 py-2.5 text-sm font-medium text-primary shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-white"
          >
            View All Services
            <Icon name="arrow-right" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
