import Icon, { type IconName } from "@/components/ui/Icon";
import Container from "@/components/ui/Container";
import { APPROACH } from "@/content/home-content";
import Card from "./Card";
import SectionHeading from "./SectionHeading";
import { SECTION_PADDING, TEXT } from "./theme";

const PILLAR_ICONS: IconName[] = ["compass", "clipboard", "trending-up"];

/**
 * The three pillars ("Holistic Approach," "Customized Wellness Plans,"
 * "Empowering Independence") — same three cards the shared `Card`
 * component is reused for elsewhere on this page.
 */
export default function Pillars2() {
  return (
    <section className={SECTION_PADDING}>
      <Container>
        <SectionHeading
          eyebrow="Our Approach"
          heading={APPROACH.heading}
          intro={APPROACH.intro}
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {APPROACH.items.map((item, i) => (
            <Card key={item.title}>
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                <Icon name={PILLAR_ICONS[i]} className="h-5 w-5" />
              </span>
              <h3 className={`mt-2 ${TEXT.h3}`}>{item.title}</h3>
              <p className={TEXT.body}>{item.description}</p>
            </Card>
          ))}
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-4 border-t border-gray pt-10 sm:grid-cols-4">
          {APPROACH.pills.map((pill) => (
            <li
              key={pill.label}
              className="flex flex-col items-center gap-2 rounded-xl bg-sage/30 px-4 py-5 text-center transition-colors hover:bg-sage/50"
            >
              <Icon name={pill.icon as IconName} className="h-5 w-5 text-primary" />
              <span className="text-sm text-ink-soft">{pill.label}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
