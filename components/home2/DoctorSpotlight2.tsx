import Image from "next/image";
import Icon from "@/components/ui/Icon";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { DOCTOR } from "@/content/home-content";
import SectionHeading from "./SectionHeading";
import { TEXT, SECTION_PADDING } from "./theme";

/** Plain two-column doctor spotlight — no gradients, no glow effects. */
export default function DoctorSpotlight2() {
  return (
    <section className={`${SECTION_PADDING} bg-sage/30`}>
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl border border-gray justify-self-center lg:justify-self-start">
            <Image
              src="/images/team/ian-hollaman-portrait.png"
              alt="Dr. Ian Hollaman, DC, MSc, FMCP"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
            <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold text-primary shadow-sm">
              FMCP Certified
            </span>
          </div>

          <div>
            <SectionHeading eyebrow="Meet Your Doctor" heading={DOCTOR.heading} />
            <div className="mt-5 space-y-4">
              {DOCTOR.paragraphs.map((p, i) => (
                <p key={i} className={TEXT.body}>
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {DOCTOR.credentials.map((c) => (
                <div key={c} className="flex items-start gap-3 rounded-xl border border-gray bg-white p-4">
                  <Icon name="check-circle" className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm text-ink-soft">{c}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Button href={DOCTOR.cta.href} variant="secondary" size="lg">
                {DOCTOR.cta.label}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
