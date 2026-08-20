import Icon from "@/components/ui/Icon";
import Container from "@/components/ui/Container";
import { SPECIALTIES } from "@/content/home-content";
import Card from "./Card";
import SectionHeading from "./SectionHeading";
import { SECTION_PADDING } from "./theme";

/** Curated conditions grid, rendered through the shared `Card` component. */
export default function Specialties2() {
  return (
    <section className={`${SECTION_PADDING} bg-sage/30`}>
      <Container>
        <SectionHeading
          eyebrow={SPECIALTIES.eyebrow}
          heading={SPECIALTIES.heading}
          accent={SPECIALTIES.accent}
          intro={SPECIALTIES.intro}
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SPECIALTIES.items.map((item) => (
            <Card key={item.title} href={item.href} image={{ src: item.image, alt: item.title }}>
              <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
              <p className="text-sm leading-relaxed text-ink-soft">{item.description}</p>
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
