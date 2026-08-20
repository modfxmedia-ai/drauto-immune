import Icon from "@/components/ui/Icon";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { PRODUCTS, PRODUCTS_CATALOG } from "@/content/home-content";
import Card from "./Card";
import Carousel from "./Carousel";
import SectionHeading from "./SectionHeading";
import { SECTION_PADDING } from "./theme";

const TRUST_PILLS = [
  { icon: "shield" as const, label: "Clinically formulated" },
  { icon: "check-circle" as const, label: "Third-party tested" },
  { icon: "sparkles" as const, label: "Practitioner grade" },
];

/**
 * Same wellness-products content as the original homepage, restyled as a
 * plain light-background carousel with clear prev/next controls and dot
 * indicators, through the shared `Card` component.
 */
export default function Products2() {
  const slides = PRODUCTS_CATALOG.map((product) => (
    <Card
      key={product.slug}
      href={product.href}
      image={{ src: product.image, alt: product.name }}
      imageAspect="aspect-square"
      imageBadge={product.tagline}
      className="h-full"
    >
      <p className="text-xs font-medium uppercase tracking-[0.1em] text-ink-soft">Dr. Autoimmune</p>
      <h3 className="text-lg font-semibold text-ink">{product.name}</h3>
      <p className="text-sm leading-relaxed text-ink-soft">{product.description}</p>
      <span className="mt-auto flex items-center gap-2 pt-2 text-sm font-semibold text-primary">
        View Product
        <Icon name="arrow-right" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Card>
  ));

  return (
    <section className={`${SECTION_PADDING} bg-sage/30`}>
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Store" heading={PRODUCTS.heading} intro={PRODUCTS.intro} />
          <Button href={PRODUCTS.cta.href} variant="primary" className="shrink-0">
            {PRODUCTS.cta.label}
          </Button>
        </div>

        <ul className="mt-6 flex flex-wrap items-center gap-2">
          {TRUST_PILLS.map((p) => (
            <li key={p.label}>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gray bg-white px-3 py-1.5 text-xs font-medium text-ink-soft shadow-sm">
                <Icon name={p.icon} className="h-3.5 w-3.5 text-primary" />
                {p.label}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-14">
          <Carousel ariaLabel="Wellness products" slides={slides} itemClassName="w-64 sm:w-72" />
        </div>
      </Container>
    </section>
  );
}
