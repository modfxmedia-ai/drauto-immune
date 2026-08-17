"use client";

import { motion, useReducedMotion } from "motion/react";
import Accent from "@/components/ui/Accent";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import Section from "@/components/ui/Section";
import { SITE_CONTACT, DISCOVERY_CALL_HREF } from "@/components/layout/nav-links";
import { CLINIC_LOCATION, SOCIAL_LINKS } from "@/components/layout/footer-links";
import { ClinicMapPanel, MapPinIcon, MailIcon } from "@/components/layout/ClinicMap";
import { HOURS } from "@/content/home-content";
import SocialIcon from "@/components/layout/SocialIcon";
import Reveal from "./Reveal";

/**
 * Contact / map band placed just before the site Footer. Two-column
 * asymmetric layout: LEFT = live Google Maps iframe embed of the clinic
 * location with a floating "You'll find us here" pin card overlay,
 * RIGHT = editorial contact card with phone / email / location / hours
 * / social + a "Book Free Discovery Call" primary CTA. All contact
 * facts are the exact values published on the live drautoimmune.com
 * site (phone, email, location, socials) — extracted from the local
 * scraped cache since the live site itself is CAPTCHA-protected.
 */
export default function ContactBand() {
  const reduce = useReducedMotion();
  return (
    <Section className="relative overflow-hidden">
      {/* Soft brand-tint wash on the map side for depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 -z-10 hidden w-1/2 bg-gradient-to-br from-sage/50 to-transparent lg:block"
      />

      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Badge className="mb-4 inline-flex">Get In Touch</Badge>
          <h2>
            Real people, <Accent>real care</Accent>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-ink-soft">
            Book a discovery call, drop us a note, or just say hi — our
            care team responds within one business day.
          </p>
          {/* Quick-facts pill row */}
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {[
              { icon: "clock", label: "Response in < 1 business day" },
              { icon: "globe", label: "100% Remote · Nationwide" },
              { icon: "check-circle", label: "No obligation" },
            ].map((p) => (
              <li key={p.label}>
                <span className="inline-flex items-center gap-1.5 rounded-pill border border-gray bg-white px-3 py-1.5 text-xs font-medium text-ink-soft shadow-card">
                  <Icon name={p.icon as "clock" | "globe" | "check-circle"} className="h-3.5 w-3.5 text-primary" />
                  {p.label}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-10">
          <Reveal>
            <ClinicMapPanel reduce={!!reduce} />
          </Reveal>

          <Reveal delay={0.12}>
            <InfoPanel reduce={!!reduce} />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/** Contact info card — sits to the right of the map. */
function InfoPanel({ reduce }: { reduce: boolean }) {
  const rows = [
    {
      icon: <Icon name="phone-call" className="h-4 w-4 text-primary" />,
      label: "Phone",
      value: SITE_CONTACT.phone,
      href: SITE_CONTACT.phoneHref,
    },
    {
      icon: <MailIcon className="h-4 w-4 text-primary" />,
      label: "Email",
      value: SITE_CONTACT.email,
      href: SITE_CONTACT.emailHref,
    },
    {
      icon: <MapPinIcon className="h-4 w-4 text-primary" />,
      label: "Location",
      value: CLINIC_LOCATION,
      href: undefined,
    },
  ];

  return (
    <div className="flex h-full flex-col gap-6 rounded-card bg-white p-8 shadow-card sm:p-9">
      <div>
        <p className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.14em] text-primary">
          Contact Details
        </p>
        <h3 className="mt-3 text-2xl font-medium leading-tight text-ink sm:text-3xl">
          Ready to take the next step?
        </h3>
      </div>

      <ul className="flex flex-col gap-4">
        {rows.map((row, i) => (
          <motion.li
            key={row.label}
            initial={reduce ? undefined : { y: 10 }}
            whileInView={reduce ? undefined : { y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.05 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-start gap-3"
          >
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sage">
              {row.icon}
            </span>
            <div className="min-w-0">
              <p className="font-mono text-[0.6rem] font-medium uppercase tracking-[0.14em] text-ink-soft">
                {row.label}
              </p>
              {row.href ? (
                <a
                  href={row.href}
                  className="mt-0.5 block truncate text-base font-medium text-ink transition-colors hover:text-primary"
                >
                  {row.value}
                </a>
              ) : (
                <p className="mt-0.5 text-base font-medium text-ink">{row.value}</p>
              )}
            </div>
          </motion.li>
        ))}
      </ul>

      {/* Hours grid */}
      <div className="rounded-card border border-gray bg-sage/25 p-5">
        <p className="flex items-center gap-2 font-mono text-[0.6rem] font-medium uppercase tracking-[0.14em] text-ink-soft">
          <Icon name="clock" className="h-3.5 w-3.5 text-primary" />
          Hours — by appointment
        </p>
        <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          {HOURS.rows.map((r) => (
            <div key={r.day} className="flex items-center justify-between border-b border-gray/60 pb-1.5 last:border-none">
              <dt className="font-medium text-ink">{r.day}</dt>
              <dd className="text-ink-soft">{r.time}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Social row */}
      <div className="flex items-center gap-3">
        <p className="font-mono text-[0.6rem] font-medium uppercase tracking-[0.14em] text-ink-soft">
          Follow
        </p>
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

      <div className="mt-auto flex flex-wrap items-center gap-4 pt-2">
        <Button href={DISCOVERY_CALL_HREF} variant="primary" size="md" className="uppercase tracking-wide">
          Book your discovery call
        </Button>
        <a
          href={SITE_CONTACT.phoneHref}
          className="text-sm font-medium text-ink transition-colors hover:text-primary"
        >
          Or call {SITE_CONTACT.phone}
        </a>
      </div>
    </div>
  );
}
