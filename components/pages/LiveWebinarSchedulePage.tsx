import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import InnerPageHero from "@/components/ui/InnerPageHero";
import Section from "@/components/ui/Section";
import Reveal from "@/components/home/Reveal";
import SectionAmbient from "@/components/home/SectionAmbient";
import { DISCOVERY_CALL_HREF } from "@/components/layout/nav-links";
import { WEBINAR_SCHEDULE } from "@/content/webinar-schedule";

const CARD_CLASSES = "rounded-card border border-gray bg-white shadow-card";

/**
 * `/live-webinar-schedule/` — a real schedule page listing upcoming live
 * webinar sessions with individual registration links per date.
 *
 * The dates/topics/registration links in `content/webinar-schedule.ts` are
 * PLACEHOLDER content for September 2026 pending the real recurring
 * webinar calendar; swap that file's data once it's provided.
 */
export default function LiveWebinarSchedulePage() {
  return (
    <>
      <InnerPageHero
        eyebrow="Live Webinars"
        title="Join Our Live Webinar Schedule"
        accent="Live Webinar Schedule"
        subhead="Free, live educational sessions with Dr. Ian on root-cause approaches to autoimmune and thyroid health — reserve your seat below."
      />

      <Section bg="white" className="relative">
        <SectionAmbient tone="sage" variant="dots" />
        <Container className="relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Badge>September 2026</Badge>
            <h2 className="mt-4 text-2xl font-semibold text-ink sm:text-3xl">Upcoming Sessions</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              Each session is hosted live and includes time for live Q&A. All times listed below are Mountain Time.
            </p>
          </Reveal>

          <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-5">
            {WEBINAR_SCHEDULE.map((session, index) => (
              <Reveal key={session.date} delay={index * 0.08}>
                <div
                  className={`${CARD_CLASSES} flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:gap-6 sm:p-8`}
                >
                  <div className="flex shrink-0 flex-col items-center justify-center rounded-2xl bg-sage px-5 py-3 text-primary sm:w-24">
                    <span className="text-xs font-semibold tracking-wide uppercase">{session.month}</span>
                    <span className="text-3xl font-semibold leading-none">{session.day}</span>
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-medium text-primary">
                      {session.displayDate} &bull; {session.time}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-ink">{session.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{session.description}</p>
                  </div>

                  <Button href={session.registrationHref} variant="primary" size="md" className="sm:shrink-0">
                    Register
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section bg="sage" className="relative">
        <SectionAmbient tone="primary" variant="orbs" />
        <Container className="relative">
          <Reveal className={`mx-auto max-w-2xl ${CARD_CLASSES} p-8 text-center sm:p-12`}>
            <h2 className="text-2xl font-semibold text-ink sm:text-3xl">Prefer 1:1 Care?</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              If a live group session isn&apos;t the right fit, book a free discovery call to talk through your
              situation directly with our team.
            </p>
            <Button href={DISCOVERY_CALL_HREF} variant="primary" size="lg" className="mt-6">
              Book a Free Discovery Call
            </Button>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
