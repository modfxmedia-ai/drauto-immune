import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import { HOURS, PRODUCTS } from "@/content/home-content";
import GlowOrb from "./GlowOrb";
import Reveal from "./Reveal";

export default function HoursAndProducts() {
  return (
    <section className="relative overflow-hidden bg-primary text-white">
      <GlowOrb className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" color="sage" size={600} />
      <div aria-hidden="true" className="absolute inset-0 bg-grid-pattern opacity-10" />

      <Container className="relative">
        <div className="grid grid-cols-1 gap-10 py-section-2xl md:grid-cols-2 md:py-section-3xl">
          <Reveal className="glass-dark rounded-card p-8">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white">
                <Icon name="clock" className="h-5 w-5" />
              </span>
              <h2 className="text-white">{HOURS.heading}</h2>
            </div>
            <dl className="flex flex-col gap-2">
              {HOURS.rows.map((row) => (
                <div
                  key={row.day}
                  className="flex items-center justify-between border-b border-white/15 py-2.5 text-sm last:border-none"
                >
                  <dt className="font-medium text-white">{row.day}</dt>
                  <dd className="text-white/80">{row.time}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.12} className="glass-dark flex flex-col gap-4 rounded-card p-8">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white">
              <Icon name="sparkles" className="h-5 w-5" />
            </span>
            <h2 className="text-white">{PRODUCTS.heading}</h2>
            <p className="max-w-md italic text-white/85">{PRODUCTS.intro}</p>
            <div className="mt-2">
              <Button
                href={PRODUCTS.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
                size="md"
                className="bg-white text-primary hover:bg-white/90"
              >
                {PRODUCTS.cta.label}
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
