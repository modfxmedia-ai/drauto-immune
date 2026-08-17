import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { PROCESS } from "@/content/home-content";
import SectionHeading from "./SectionHeading";
import { SECTION_PADDING } from "./theme";

/**
 * Clear numbered 1-2-3 process sequence — large number + heading +
 * description, laid out horizontally on desktop and stacked on mobile,
 * per the design brief.
 */
export default function Process2() {
  return (
    <section className={`${SECTION_PADDING} bg-white`}>
      <Container>
        <SectionHeading eyebrow="Our Process" heading={PROCESS.heading} intro={PROCESS.intro} align="center" />

        <ol className="relative mt-16 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          <span
            aria-hidden="true"
            className="absolute left-0 right-0 top-7 hidden border-t-2 border-dashed border-primary/25 md:block"
          />
          {PROCESS.steps.map((step, i) => (
            <li key={step.title} className="relative flex flex-col">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary bg-white text-lg font-semibold text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="relative mt-6 aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gray">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>

              <h3 className="mt-6 text-xl font-semibold text-ink">{step.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-ink-soft">{step.description}</p>
            </li>
          ))}
        </ol>

        <div className="mt-14 flex justify-center">
          <Button href={PROCESS.cta.href} variant="primary" size="lg">
            {PROCESS.cta.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
