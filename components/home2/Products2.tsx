import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { PRODUCTS, PRODUCTS_CATALOG } from "@/content/home-content";
import Card from "./Card";
import Carousel from "./Carousel";
import SectionHeading from "./SectionHeading";
import { SECTION_PADDING } from "./theme";

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
      <h3 className="text-lg font-semibold text-ink">{product.name}</h3>
      <p className="text-sm leading-relaxed text-ink-soft">{product.description}</p>
    </Card>
  ));

  return (
    <section className={`${SECTION_PADDING} bg-sage/30`}>
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Wellness Products" heading={PRODUCTS.heading} intro={PRODUCTS.intro} />
          <Button href={PRODUCTS.cta.href} variant="primary" className="shrink-0">
            {PRODUCTS.cta.label}
          </Button>
        </div>

        <div className="mt-14">
          <Carousel ariaLabel="Wellness products" slides={slides} itemClassName="w-64 sm:w-72" />
        </div>
      </Container>
    </section>
  );
}
