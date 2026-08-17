import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { PROCESS } from "@/content/home-content";
import SectionHeading from "./SectionHeading";
import { SECTION_PADDING } from "./theme";

/**
 * Numbered 1-2-3 process sequence redesigned as hover-lift image cards
 * (badge + gradient rail above, photo/title/description card below), still
 * pure server-rendered CSS transitions per the Home2 no-framer-motion
 * convention — no JS, so all "motion" here is CSS `:hover`/`prefers-reduced-motion`.
 */
export default function Process2() {
  return (
    <section className={`${SECTION_PADDING} relative overflow-hidden bg-white`}>
      <div aria-hidden className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-primary/[0.06] blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-sage/40 blur-3xl" />

      <Container className="relative">
        <SectionHeading eyebrow="Our Process" heading={PROCESS.heading} intro={PROCESS.intro} align="center" />

        <ol className="relative mt-16 grid grid-cols-1 gap-14 md:mt-20 md:grid-cols-3 md:gap-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 right-0 top-6 hidden md:block"
          >
            <div className="mx-[16.6%] h-px bg-gradient-to-r from-primary/10 via-primary/40 to-primary/10" />
          </div>

          {PROCESS.steps.map((step, i) => (
            <li key={step.title} className="group relative flex flex-col">
              <div className="relative z-10 flex justify-center md:justify-start">
                <span className="absolute h-12 w-12 rounded-full bg-primary/15 motion-safe:animate-pulse motion-reduce:animate-none" />
                <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-hover text-base font-bold text-white shadow-[0_8px_20px_-6px_rgba(63,128,106,0.55)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="mt-6 flex flex-1 flex-col overflow-hidden rounded-3xl border border-gray bg-white shadow-[0_1px_2px_rgba(26,26,26,0.04),0_16px_32px_-12px_rgba(26,26,26,0.10)] transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:border-primary/25 group-hover:shadow-[0_1px_2px_rgba(26,26,26,0.04),0_28px_48px_-16px_rgba(63,128,106,0.30)]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>

                <div className="relative flex flex-1 flex-col p-6 sm:p-7">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-5 top-4 select-none text-4xl font-bold text-primary/10"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="relative text-xl font-semibold text-ink">{step.title}</h3>
                  <p className="relative mt-3 text-base leading-relaxed text-ink-soft">{step.description}</p>
                </div>

                <span
                  aria-hidden="true"
                  className="h-1 origin-left scale-x-0 bg-gradient-to-r from-primary to-sage transition-transform duration-500 ease-out group-hover:scale-x-100"
                />
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-16 flex justify-center">
          <Button href={PROCESS.cta.href} variant="primary" size="lg">
            {PROCESS.cta.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
