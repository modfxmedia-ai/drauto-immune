import Container from "@/components/ui/Container";
import { WHY_CHOOSE_US } from "@/content/home-content";
import SectionHeading from "./SectionHeading";
import { SECTION_PADDING, TEXT } from "./theme";

/**
 * A numbered divider list rather than another icon-card grid — Pillars2,
 * ServicesHighlight2, and Products2 already share that pattern, so this
 * section reads visually distinct while still reusing the same tokens.
 */
export default function WhyChooseUs2() {
  return (
    <section className={`${SECTION_PADDING} bg-white`}>
      <Container>
        <SectionHeading eyebrow="Why Dr. Autoimmune" heading={WHY_CHOOSE_US.heading} align="center" />

        <ol className="mx-auto mt-14 max-w-3xl divide-y divide-gray border-y border-gray">
          {WHY_CHOOSE_US.items.map((item, i) => (
            <li key={item.title} className="flex flex-col gap-4 py-8 sm:flex-row sm:items-start sm:gap-8">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/20 font-mono text-lg font-semibold text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className={TEXT.h3}>{item.title}</h3>
                <p className={`mt-2 ${TEXT.body}`}>{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
