import Image from "next/image";
import Icon from "@/components/ui/Icon";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { DOCTOR } from "@/content/home-content";
import SectionHeading from "./SectionHeading";
import { TEXT, SECTION_PADDING } from "./theme";

const DOCTOR_STATS = [
  { value: "15+", label: "Years in functional medicine" },
  { value: "100%", label: "Remote care, nationwide" },
  { value: "IFM", label: "Institute of Functional Medicine" },
] as const;

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
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold text-primary shadow-sm">
              FMCP Certified
            </span>
            <div className="absolute inset-x-4 bottom-14">
              <p className="font-mono text-[0.6rem] font-medium uppercase tracking-[0.14em] text-white/80">
                Founder · Lead Practitioner
              </p>
              <div className="mt-1 flex items-center justify-between gap-2">
                <p className="text-lg font-medium leading-tight text-white">Dr. Ian Hollaman</p>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-ink shadow-sm">
                  <Icon name="globe" className="h-3.5 w-3.5 text-primary" />
                  Boulder, CO
                </span>
              </div>
            </div>
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

            <div className="mt-8 grid grid-cols-3 gap-3 rounded-xl border border-gray bg-white p-4 sm:gap-6 sm:p-5">
              {DOCTOR_STATS.map((s, i) => (
                <div key={s.label} className={`flex flex-col gap-1 ${i > 0 ? "border-l border-gray pl-3 sm:pl-6" : ""}`}>
                  <span className="text-xl font-semibold leading-none text-primary sm:text-2xl">{s.value}</span>
                  <span className="text-xs leading-tight text-ink-soft">{s.label}</span>
                </div>
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
