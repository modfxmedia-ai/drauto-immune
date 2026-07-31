"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import Container from "@/components/ui/Container";
import SocialIcon from "./SocialIcon";
import {
  CLINIC_LOCATION,
  CONDITIONS_LINKS,
  MISSION_BLURB,
  QUICK_LINKS,
  SERVICES_LINKS,
  SOCIAL_LINKS,
} from "./footer-links";
import { DISCOVERY_CALL_HREF, SITE_CONTACT } from "./nav-links";

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-2.5">
      <span aria-hidden="true" className="h-px w-6 bg-cream/70" />
      <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-cream">
        {children}
      </p>
    </div>
  );
}

function LinkList({
  links,
}: {
  links: readonly { label: string; href: string; external?: boolean }[];
}) {
  return (
    <ul className="flex flex-col gap-3.5">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            className="group inline-flex items-center gap-2 text-[0.9rem] leading-snug text-white/85 transition-colors hover:text-white"
          >
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-full bg-white/30 transition-all duration-300 group-hover:h-1.5 group-hover:w-4 group-hover:bg-cream"
            />
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">
              {link.label}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "ok">("idle");
  return (
    <form
      className="mt-4 flex flex-col gap-2 sm:flex-row"
      onSubmit={(e) => {
        e.preventDefault();
        setStatus("ok");
      }}
    >
      <label htmlFor="footer-newsletter" className="sr-only">
        Email address
      </label>
      <input
        id="footer-newsletter"
        type="email"
        required
        placeholder="you@email.com"
        className="min-w-0 flex-1 rounded-pill border border-white/25 bg-white/10 px-5 py-3 text-sm text-white placeholder:text-white/50 focus-visible:border-cream focus-visible:bg-white/15 focus-visible:outline-none"
      />
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-1.5 rounded-pill bg-cream px-6 py-3 text-sm font-medium text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
      >
        {status === "ok" ? "Subscribed ✓" : "Subscribe"}
      </button>
    </form>
  );
}

/** Small inline icon glyphs used across the brand column. */
function PhoneGlyph({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 9 9 0 0 0 2.8.45 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 2 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 9 9 0 0 0 .45 2.8 1 1 0 0 1-.25 1z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function PinGlyph({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="9.5" r="2.3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
function MailGlyph({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Site footer — precise, modern, aligned dark-primary composition:
 *   1. Newsletter CTA banner at the very top (matches the utility bar's
 *      "Subscribe To Our Newsletter" pattern).
 *   2. Four-column info grid: brand + contact / Quick Links / Services /
 *      Conditions.
 *   3. Divider line.
 *   4. Bottom bar: copyright | Sitemap · Accessibility · Contact |
 *      Powered by MODFXMedia — one row at md+, three stacked at mobile.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-primary text-white">
      {/* Soft ambient glow blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-32 h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{ background: "rgba(255,255,255,0.06)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-32 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "rgba(234,217,176,0.07)" }}
      />

      <Container className="relative">
        {/* 1. Newsletter CTA banner */}
        <motion.section
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="-mt-10 mb-16 flex flex-col gap-4 rounded-card border border-white/20 bg-white/[0.08] p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:p-8 lg:-mt-16 lg:flex-row lg:items-center lg:gap-10 lg:p-10"
        >
          <div className="flex-1 min-w-0">
            <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-cream">
              Stay In The Loop
            </p>
            <h3 className="mt-3 text-2xl font-semibold leading-tight text-white sm:text-3xl">
              Insights, research & wellness tips — straight to your inbox.
            </h3>
            <p className="mt-2 text-sm text-white/85 sm:text-base">
              Join the Dr. Autoimmune newsletter. Zero spam, one-click unsubscribe.
            </p>
          </div>
          <div className="lg:w-[380px] lg:shrink-0">
            <NewsletterForm />
          </div>
        </motion.section>

        {/* 2. Info grid */}
        <div className="grid grid-cols-1 gap-12 pb-12 md:grid-cols-2 md:pb-16 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-10 lg:pb-20">
          {/* Brand column */}
          <div className="flex flex-col gap-6 lg:pr-6">
            <Link href="/" className="inline-flex" aria-label="Dr. Autoimmune home">
              <Image
                src="/images/brand/dr-autoimmune-logo.webp"
                alt="Dr. Autoimmune — Let Your Health Soar"
                width={320}
                height={80}
                className="h-11 w-auto brightness-0 invert"
              />
            </Link>
            <p className="max-w-sm text-[0.95rem] leading-relaxed text-white/90">
              {MISSION_BLURB}
            </p>

            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={SITE_CONTACT.phoneHref}
                  className="group inline-flex items-center gap-3 text-[0.95rem] font-medium text-white transition-colors hover:text-cream"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-cream transition-colors group-hover:bg-white/25">
                    <PhoneGlyph className="h-4 w-4" />
                  </span>
                  {SITE_CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONTACT.emailHref}
                  className="group inline-flex items-center gap-3 text-[0.95rem] font-medium text-white transition-colors hover:text-cream"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-cream transition-colors group-hover:bg-white/25">
                    <MailGlyph className="h-4 w-4" />
                  </span>
                  {SITE_CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-[0.95rem] font-medium text-white">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-cream">
                  <PinGlyph className="h-4 w-4" />
                </span>
                <span>
                  {CLINIC_LOCATION}
                  <span className="ml-1 text-white/70">· Nationwide remote care</span>
                </span>
              </li>
            </ul>

            {/* CTA button — primary action tucked into the brand column */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href={DISCOVERY_CALL_HREF}
                className="group inline-flex items-center gap-2 rounded-pill bg-cream px-5 py-2.5 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
              >
                Book Free Discovery Call
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
              </Link>
              <div className="flex items-center gap-2">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-cream hover:bg-white/10 hover:text-cream"
                  >
                    <SocialIcon name={social.icon} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div>
            <ColumnHeading>Quick Links</ColumnHeading>
            <LinkList links={QUICK_LINKS} />
          </div>

          <div>
            <ColumnHeading>Services</ColumnHeading>
            <LinkList links={SERVICES_LINKS} />
          </div>

          <div>
            <ColumnHeading>Conditions</ColumnHeading>
            <LinkList links={CONDITIONS_LINKS.slice(0, 8)} />
          </div>
        </div>
      </Container>

      {/* 3. Divider + 4. Bottom bar */}
      <div className="relative border-t border-white/15">
        <Container>
          <div className="grid grid-cols-1 items-center gap-3 py-6 text-xs text-white/85 sm:grid-cols-3">
            <p className="text-left">
              © {year} <span className="font-semibold text-white">Dr. Autoimmune</span>. All Rights Reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              <Link href="/site-map/" className="transition-colors hover:text-white">
                Sitemap
              </Link>
              <span aria-hidden="true" className="hidden h-1 w-1 rounded-full bg-white/30 sm:inline-block" />
              <Link href="/contact-us/" className="transition-colors hover:text-white">
                Contact
              </Link>
            </div>
            <p className="text-left text-white/75 sm:text-right">
              Powered by{" "}
              <a
                href="https://www.modfxmedia.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream underline decoration-cream/50 decoration-1 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
              >
                MODFXMedia
              </a>
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}

