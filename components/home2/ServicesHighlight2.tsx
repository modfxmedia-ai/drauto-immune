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
 * `Card` component.
 */
export default function ServicesHighlight2() {
  const wellness = SERVICES.cards.find((c) => c.title === "Wellness Services")!;
  const conditions = SERVICES.cards.find((c) => c.title === "Conditions We Support")!;
  const highlights = [wellness, conditions];

  return (
    <section className={`${SECTION_PADDING} bg-white`}>
      <Container>
        <SectionHeading eyebrow="Services" heading={SERVICES.heading} intro={SERVICES.intro} />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {highlights.map((card) => (
            <Card key={card.title} href={card.href} image={{ src: card.image, alt: card.title }} imageAspect="aspect-[16/10]">
              <h3 className="text-xl font-semibold text-ink sm:text-2xl">{card.title}</h3>
              <p className="text-base leading-relaxed text-ink-soft">{card.description}</p>
              <span className="mt-auto flex items-center gap-2 pt-2 text-sm font-semibold text-primary">
                Learn more
                <Icon name="arrow-right" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
