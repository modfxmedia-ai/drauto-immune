import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import Section from "@/components/ui/Section";
import { getFeatureIcon } from "./icon-map";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

interface FeatureItem {
  title: string;
  description: string;
}

interface IconFeatureGridProps {
  heading: string;
  accent?: string;
  intro?: string;
  items: readonly FeatureItem[];
  cta?: { label: string; href: string };
  bg?: "white" | "sage" | "gray";
}

/**
 * Bento-style icon feature grid — the first item spans two columns on
 * larger screens so the grid reads as a deliberate composition rather than
 * a row of identical cards.
 */
export default function IconFeatureGrid({
  heading,
  accent,
  intro,
  items,
  cta,
  bg = "white",
}: IconFeatureGridProps) {
  return (
    <Section bg={bg}>
      <Container>
        <SectionHeading heading={heading} accent={accent} intro={intro} />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal
              key={item.title}
              delay={Math.min(i * 0.08, 0.32)}
              className={i === 0 ? "sm:col-span-2 lg:col-span-2" : ""}
            >
              <div
                className={[
                  "group relative flex h-full flex-col gap-4 overflow-hidden rounded-card border p-7 transition-all duration-300 hover:-translate-y-1",
                  i === 0
                    ? "glass-primary border-primary/15 hover:shadow-card-hover"
                    : "border-gray bg-white hover:shadow-card-hover",
                ].join(" ")}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-3 -top-3 accent-serif text-6xl text-primary/[0.07]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                  <Icon name={getFeatureIcon(item.title)} className="h-5 w-5" />
                </span>
                <h3 className={i === 0 ? "relative text-xl font-medium text-ink" : "relative text-lg font-medium text-ink"}>
                  {item.title}
                </h3>
                <p className="relative text-sm leading-relaxed text-ink-soft">{item.description}</p>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100"
                />
              </div>
            </Reveal>
          ))}
        </div>

        {cta && (
          <Reveal className="mt-12 flex justify-center">
            <Button href={cta.href} variant="primary" size="md">
              {cta.label}
            </Button>
          </Reveal>
        )}
      </Container>
    </Section>
  );
}
