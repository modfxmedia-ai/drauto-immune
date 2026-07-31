import Accent from "@/components/ui/Accent";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import { CONSULTATION, HOURS } from "@/content/home-content";
import { SITE_CONTACT } from "@/components/layout/nav-links";
import GlowOrb from "./GlowOrb";
import Reveal from "./Reveal";

/**
 * Final CTA / contact band \u2014 structural pattern referenced from
 * renoregen.com's "Start Your Journey to Wellness" closing section
 * (headline + phone + hours + CTA). Copy is the site's existing
 * "Start Your Health Consultation" block plus the "Hours By Appointment"
 * block, both reused verbatim rather than rewritten.
 */
export default function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-primary text-white">
      <GlowOrb className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" color="sage" size={600} />
      <div aria-hidden="true" className="absolute inset-0 bg-grid-pattern opacity-10" />

      <Container className="relative py-section-2xl md:py-section-3xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
          <Reveal className="flex flex-col gap-4">
            <h2 className="text-white">
              Start Your <Accent tone="white">Health Consultation</Accent>
            </h2>
            <p className="max-w-lg text-white/85">{CONSULTATION.intro}</p>
            <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                href={CONSULTATION.cta.href}
                variant="ghost"
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
              >
                {CONSULTATION.cta.label}
              </Button>
              <a
                href={SITE_CONTACT.phoneHref}
                className="inline-flex items-center gap-2 text-base font-medium text-white/90 transition-colors hover:text-white"
              >
                <Icon name="phone-call" className="h-4 w-4" />
                {SITE_CONTACT.phone}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="glass-dark rounded-card p-8 transition-transform duration-300 hover:-translate-y-1">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white">
                <Icon name="clock" className="h-5 w-5" />
              </span>
              <h3 className="text-white">{HOURS.heading}</h3>
            </div>
            <dl className="flex flex-col gap-2">
              {HOURS.rows.map((row) => (
                <div
                  key={row.day}
                  className="flex items-center justify-between border-b border-white/15 py-2.5 text-sm transition-colors duration-200 last:border-none hover:border-white/30"
                >
                  <dt className="font-medium text-white">{row.day}</dt>
                  <dd className="text-white/80">{row.time}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
