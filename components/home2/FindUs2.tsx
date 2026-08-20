import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import { ClinicMapPanel } from "@/components/layout/ClinicMap";
import { SITE_CONTACT } from "@/components/layout/nav-links";
import { CLINIC_LOCATION, SOCIAL_LINKS } from "@/components/layout/footer-links";
import { HOURS } from "@/content/home-content";
import SocialIcon from "@/components/layout/SocialIcon";
import SectionHeading from "./SectionHeading";
import { SECTION_PADDING, TEXT } from "./theme";

/**
 * Map + office-hours/phone section placed just before the footer — the
 * one place on Home2 this info lives (moved out of `ContactBand2`, which
 * no longer repeats it).
 */
export default function FindUs2() {
  return (
    <section className={`${SECTION_PADDING} bg-white`}>
      <Container>
        <SectionHeading eyebrow="Find Us" heading="Visit or call us" align="center" className="mx-auto" />

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_1fr]">
          <ClinicMapPanel className="min-h-[360px] lg:min-h-[440px]" />

          <div className="flex flex-col justify-center rounded-2xl border border-gray bg-sage/30 p-6 sm:p-8">
            <p className={TEXT.caption}>Contact Details</p>
            <h3 className="mt-2 text-xl font-medium leading-tight text-ink">Ready to take the next step?</h3>

            <p className={`mt-6 ${TEXT.caption}`}>{HOURS.heading}</p>
            <dl className="mt-4 space-y-2">
              {HOURS.rows.map((row) => (
                <div key={row.day} className="flex items-center justify-between text-sm">
                  <dt className="text-ink-soft">{row.day}</dt>
                  <dd className="font-medium text-ink">{row.time}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 space-y-2 border-t border-gray pt-6 text-sm">
              <a href={SITE_CONTACT.phoneHref} className="flex items-center gap-2 text-ink transition-colors hover:text-primary">
                <Icon name="phone-call" className="h-4 w-4 text-primary" />
                {SITE_CONTACT.phone}
              </a>
              <a href={SITE_CONTACT.emailHref} className="flex items-center gap-2 text-ink transition-colors hover:text-primary">
                <Icon name="globe" className="h-4 w-4 text-primary" />
                {SITE_CONTACT.email}
              </a>
              <p className="flex items-center gap-2 text-ink-soft">
                <Icon name="target" className="h-4 w-4 text-primary" />
                {CLINIC_LOCATION}
              </p>
              <a href={SITE_CONTACT.phoneHref} className="text-ink-soft transition-colors hover:text-primary">
                Or call {SITE_CONTACT.phone}
              </a>
            </div>

            <div className="mt-6 flex items-center gap-3 border-t border-gray pt-6">
              <p className={TEXT.caption}>Follow</p>
              <div className="flex items-center gap-2">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-gray bg-white text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-white"
                  >
                    <SocialIcon name={s.icon} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
